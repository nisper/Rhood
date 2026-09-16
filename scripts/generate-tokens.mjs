import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sources = [
  { collection: "palette", file: "src/tmp/palette.json" },
  { collection: "theme", file: "src/tmp/theme.json" },
]
const cssOutput = "src/styles/design-tokens.css"
const dataOutput = "src/data/generated/tokens.generated.json"

function toKebabCase(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function formatNumber(value) {
  return Number(value.toFixed(6)).toString()
}

function colorToCss(value) {
  const alpha = value.alpha ?? 1
  if (alpha === 1 && value.hex) return value.hex.toLowerCase()

  const [red, green, blue] = value.components.map((component) => Math.round(component * 255))
  return `rgb(${red} ${green} ${blue} / ${formatNumber(alpha)})`
}

function aliasFromToken(token, collection, knownNames) {
  const figmaAlias = token.$extensions?.["com.figma.aliasData"]
  if (figmaAlias?.targetVariableSetName && figmaAlias?.targetVariableName) {
    return {
      collection: figmaAlias.targetVariableSetName,
      name: figmaAlias.targetVariableName,
      source: "figma",
    }
  }

  const reference = typeof token.$value === "string" && token.$value.match(/^\{(.+)\}$/)?.[1]
  if (!reference) return null

  const name = reference.replaceAll(".", "/")
  const candidates = [collection, ...sources.map((source) => source.collection).filter((candidate) => candidate !== collection)]
  const targetCollection = candidates.find((candidate) => knownNames.has(`${candidate}/${name}`))

  return targetCollection ? { collection: targetCollection, name, source: "dtcg" } : { collection, name, source: "dtcg" }
}

function flattenTokens(node, collection, pathParts = []) {
  if (node && typeof node === "object" && "$value" in node) {
    return [{ collection, path: pathParts, token: node }]
  }

  return Object.entries(node ?? {}).flatMap(([key, value]) => key.startsWith("$")
    ? []
    : flattenTokens(value, collection, [...pathParts, key]))
}

function cssVariableName(collection, tokenPath) {
  return `--rhood-${toKebabCase(collection)}-${tokenPath.map(toKebabCase).join("-")}`
}

async function readSource({ collection, file }) {
  const absolutePath = path.join(projectRoot, file)
  const json = JSON.parse(await readFile(absolutePath, "utf8"))
  return flattenTokens(json, collection)
}

const sourceTokens = (await Promise.all(sources.map(readSource))).flat()
const knownTokenNames = new Set(sourceTokens.map(({ collection, path: tokenPath }) => `${collection}/${tokenPath.join("/")}`))
const warnings = []

const generatedTokens = sourceTokens.map(({ collection, path: tokenPath, token }) => {
  const alias = aliasFromToken(token, collection, knownTokenNames)
  const cssVariable = cssVariableName(collection, tokenPath)
  const value = token.$value
  const alpha = token.$type === "color" && typeof value === "object" ? value.alpha ?? 1 : null
  let cssValue

  if (alias?.collection && alias?.name) {
    const aliasKey = `${alias.collection}/${alias.name}`
    if (!knownTokenNames.has(aliasKey)) warnings.push(`Unresolved alias: ${collection}/${tokenPath.join("/")} → ${aliasKey}`)

    const target = `var(${cssVariableName(alias.collection, alias.name.split("/"))})`
    cssValue = alpha !== null && alpha !== 1
      ? `color-mix(in srgb, ${target} ${formatNumber(alpha * 100)}%, transparent)`
      : target
  } else if (token.$type === "color") {
    cssValue = colorToCss(value)
  } else {
    cssValue = String(value)
  }

  return {
    collection,
    name: tokenPath.join("/"),
    cssVariable,
    type: token.$type,
    cssValue,
    resolvedValue: token.$type === "color" && typeof value === "object" ? colorToCss(value) : null,
    alias,
    figmaVariableId: token.$extensions?.["com.figma.variableId"] ?? null,
    scopes: token.$extensions?.["com.figma.scopes"] ?? [],
  }
})

const tokensByName = new Map(generatedTokens.map((token) => [`${token.collection}/${token.name}`, token]))

function resolveColorValue(token, trail = new Set()) {
  if (token.type !== "color") return token.resolvedValue
  if (token.resolvedValue) return token.resolvedValue

  const tokenKey = `${token.collection}/${token.name}`
  if (trail.has(tokenKey)) {
    warnings.push(`Circular alias: ${[...trail, tokenKey].join(" → ")}`)
    return null
  }

  const target = token.alias && tokensByName.get(`${token.alias.collection}/${token.alias.name}`)
  if (!target) return null

  return resolveColorValue(target, new Set([...trail, tokenKey]))
}

for (const token of generatedTokens) {
  if (token.type === "color") token.resolvedValue = resolveColorValue(token)
  if (token.type !== "color") token.resolvedValue = sourceTokens.find(({ collection, path: tokenPath }) => collection === token.collection && tokenPath.join("/") === token.name)?.token.$value ?? null
}

const css = [
  "/* This file is generated by scripts/generate-tokens.mjs. Do not edit it manually. */",
  "/* Source: src/tmp/palette.json and src/tmp/theme.json */",
  ":root {",
  ...generatedTokens.map((token) => `  ${token.cssVariable}: ${token.cssValue};`),
  "}",
  "",
].join("\n")

const tokenData = {
  summary: {
    total: generatedTokens.length,
    byCollection: Object.fromEntries(sources.map(({ collection }) => [collection, generatedTokens.filter((token) => token.collection === collection).length])),
    aliases: generatedTokens.filter((token) => token.alias).length,
    warnings,
  },
  tokens: generatedTokens,
}

await mkdir(path.dirname(path.join(projectRoot, cssOutput)), { recursive: true })
await mkdir(path.dirname(path.join(projectRoot, dataOutput)), { recursive: true })
await writeFile(path.join(projectRoot, cssOutput), css)
await writeFile(path.join(projectRoot, dataOutput), `${JSON.stringify(tokenData, null, 2)}\n`)

console.log(`Generated ${generatedTokens.length} tokens (${tokenData.summary.aliases} aliases).`)
console.log(`CSS: ${cssOutput}`)
console.log(`Table data: ${dataOutput}`)
if (warnings.length) {
  console.warn(`Warnings:\n${warnings.map((warning) => `- ${warning}`).join("\n")}`)
  process.exitCode = 1
}
