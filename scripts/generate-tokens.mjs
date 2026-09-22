import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sources = [
  { collection: "palette", file: "src/tmp/palette.json" },
  { collection: "theme", file: "src/tmp/theme.json" },
  { collection: "sizing", file: "src/tmp/sizing.json" },
]
const cssOutput = "src/styles/design-tokens.css"
const dataOutput = "src/data/generated/tokens.generated.json"
const styleIgnoreFile = "src/tmp/style-ignore.json"

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

function rawValueToCss(value, type, collection) {
  if (type === "color") return colorToCss(value)
  if (type === "number" && collection === "sizing") return `${formatNumber(value)}px`
  return String(value)
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
  const parts = tokenPath.map(toKebabCase)

  if (parts[0] === "border-radius" && parts[1]?.startsWith("border-radius-")) {
    parts[1] = parts[1].slice("border-radius-".length)
  }

  return `--rh-${toKebabCase(collection)}-${parts.join("-")}`
}

async function readSource({ collection, file }) {
  try {
    const absolutePath = path.join(projectRoot, file)
    const json = JSON.parse(await readFile(absolutePath, "utf8"))
    return { collection, tokens: flattenTokens(json, collection) }
  } catch (error) {
    if (error.code === "ENOENT") return { collection, tokens: null }
    throw error
  }
}

async function readStyleIgnore() {
  try {
    const json = JSON.parse(await readFile(path.join(projectRoot, styleIgnoreFile), "utf8"))
    const rules = json.tokens ?? []

    if (!Array.isArray(rules)) throw new Error('"tokens" must be an array')

    return new Set(rules.map((rule, index) => {
      if (
        !rule ||
        typeof rule.collection !== "string" ||
        typeof rule.name !== "string" ||
        !rule.collection ||
        !rule.name
      ) {
        throw new Error(`Invalid ignore rule at index ${index}`)
      }

      return `${rule.collection}/${rule.name}`
    }))
  } catch (error) {
    if (error.code === "ENOENT") return new Set()
    throw new Error(`Could not read ${styleIgnoreFile}: ${error.message}`)
  }
}

async function readPreviousTokens() {
  try {
    const json = JSON.parse(await readFile(path.join(projectRoot, dataOutput), "utf8"))
    return Array.isArray(json.tokens) ? json.tokens : []
  } catch (error) {
    if (error.code === "ENOENT") return []
    throw error
  }
}

const ignoredTokenNames = await readStyleIgnore()
const isIgnored = (collection, name) => ignoredTokenNames.has(`${collection}/${name}`)
const sourceResults = await Promise.all(sources.map(readSource))
const previousTokens = await readPreviousTokens()
const presentCollections = new Set(sourceResults.filter((source) => source.tokens !== null).map((source) => source.collection))
const missingCollections = sources.filter((source) => !presentCollections.has(source.collection)).map((source) => source.collection)
const preservedTokens = previousTokens
  .filter((token) => missingCollections.includes(token.collection) && !isIgnored(token.collection, token.name))
  .map(({ scopes: _scopes, ...token }) => token)
const sourceTokens = sourceResults
  .flatMap((source) => source.tokens ?? [])
  .filter(({ collection, path: tokenPath }) => !isIgnored(collection, tokenPath.join("/")))
const warnings = []

for (const collection of missingCollections) {
  if (!preservedTokens.some((token) => token.collection === collection)) {
    warnings.push(`Missing source and no previously generated tokens: ${collection}`)
  }
}

if (sourceTokens.length === 0) warnings.push("No token source files were found")

const knownTokenNames = new Set([
  ...sourceTokens.map(({ collection, path: tokenPath }) => `${collection}/${tokenPath.join("/")}`),
  ...preservedTokens.map((token) => `${token.collection}/${token.name}`),
])
const sourceTokensByName = new Map(sourceTokens.map((entry) => [`${entry.collection}/${entry.path.join("/")}`, entry]))

function tailwindSpacingExpression({ alias, collection }) {
  if (collection !== "sizing" || alias?.collection !== "sizing" || !alias.name.startsWith("base module/")) return null

  const target = sourceTokensByName.get(`${alias.collection}/${alias.name}`)
  if (target?.token.$type !== "number" || typeof target.token.$value !== "number") return null

  return `calc(var(--spacing) * ${formatNumber(target.token.$value / 4)})`
}

const newTokens = sourceTokens.map(({ collection, path: tokenPath, token }) => {
  const alias = aliasFromToken(token, collection, knownTokenNames)
  const cssVariable = cssVariableName(collection, tokenPath)
  const value = token.$value
  const alpha = token.$type === "color" && typeof value === "object" ? value.alpha ?? 1 : null
  let cssValue

  const spacingExpression = tailwindSpacingExpression({ alias, collection })

  if (spacingExpression) {
    cssValue = spacingExpression
  } else if (alias?.collection && alias?.name) {
    const aliasKey = `${alias.collection}/${alias.name}`
    if (!knownTokenNames.has(aliasKey)) warnings.push(`Unresolved alias: ${collection}/${tokenPath.join("/")} → ${aliasKey}`)

    const target = `var(${cssVariableName(alias.collection, alias.name.split("/"))})`
    cssValue = alpha !== null && alpha !== 1
      ? `color-mix(in srgb, ${target} ${formatNumber(alpha * 100)}%, transparent)`
      : target
  } else {
    cssValue = rawValueToCss(value, token.$type, collection)
  }

  return {
    collection,
    name: tokenPath.join("/"),
    cssVariable,
    type: token.$type,
    cssValue,
    resolvedValue: alias ? null : rawValueToCss(value, token.$type, collection),
    alias,
    figmaVariableId: token.$extensions?.["com.figma.variableId"] ?? null,
  }
})

const generatedTokens = [...preservedTokens, ...newTokens]

const tokensByName = new Map(generatedTokens.map((token) => [`${token.collection}/${token.name}`, token]))

function resolveValue(token, trail = new Set()) {
  if (token.resolvedValue !== null) return token.resolvedValue

  const tokenKey = `${token.collection}/${token.name}`
  if (trail.has(tokenKey)) {
    warnings.push(`Circular alias: ${[...trail, tokenKey].join(" → ")}`)
    return null
  }

  const target = token.alias && tokensByName.get(`${token.alias.collection}/${token.alias.name}`)
  if (!target) return null

  return resolveValue(target, new Set([...trail, tokenKey]))
}

for (const token of generatedTokens) token.resolvedValue = resolveValue(token)

const sourceDescription = sources
  .filter((source) => presentCollections.has(source.collection))
  .map((source) => source.file)
  .join(", ")

const css = [
  "/* This file is generated by scripts/generate-tokens.mjs. Do not edit it manually. */",
  `/* Updated from: ${sourceDescription || "previous generated data"} */`,
  ":root {",
  ...generatedTokens.map((token) => `  ${token.cssVariable}: ${token.cssValue};`),
  "}",
  "",
].join("\n")

const collections = [...new Set(generatedTokens.map((token) => token.collection))]
const tokenData = {
  summary: {
    total: generatedTokens.length,
    byCollection: Object.fromEntries(collections.map((collection) => [collection, generatedTokens.filter((token) => token.collection === collection).length])),
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
