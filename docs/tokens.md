# Parser Tokens

## Tailwind Config Theme Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#f4f4f4',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#bababa',
          400: '#a3a3a3',
          500: '#8c8c8c',
          600: '#767676',
          700: '#454545',
          800: '#2b2b2b',
          900: '#1a1a1a',
          white: '#ffffff',
        },
        brand: {
          50: '#f1f6fe',
          100: '#d0e0fe',
          200: '#a1bffe',
          300: '#729cfd',
          400: '#4e7efb',
          500: '#154ef9',
          600: '#0f3bd6',
          700: '#0a2cb3',
          800: '#061e90',
          900: '#041477',
        },
        blue: {
          50: '#f1f6fe',
          100: '#d0e0fe',
          200: '#a1bffe',
          300: '#729cfd',
          400: '#4e7efb',
          500: '#154ef9',
          600: '#0f3bd6',
          700: '#0a2cb3',
          800: '#061e90',
          900: '#041477',
        },
        blueGrey: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e1e7ef',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#65758b',
          600: '#48566a',
          700: '#334156',
          800: '#1d2839',
          900: '#131d35',
        },
        lightBlue: {
          50: '#f0f9ff',
          100: '#ddf2ff',
          200: '#bbe3ff',
          300: '#99d0ff',
          400: '#80bfff',
          500: '#56a2ff',
          600: '#3e7edb',
          700: '#2b5db7',
          800: '#1b4193',
          900: '#102c7a',
        },
        green: {
          50: '#f7fdf2',
          100: '#e7fcd5',
          200: '#cbfaad',
          300: '#a4f282',
          400: '#7fe661',
          500: '#4ad631',
          600: '#2eb823',
          700: '#189a19',
          800: '#0f7c18',
          900: '#096618',
        },
        red: {
          50: '#fef6f1',
          100: '#fee5d4',
          200: '#fec5a9',
          300: '#fe9e7f',
          400: '#fd795e',
          500: '#fc3c2a',
          600: '#d81f1e',
          700: '#b51521',
          800: '#920d22',
          900: '#780823',
        },
        orange: {
          50: '#fffaeb',
          100: '#fff5d7',
          200: '#ffe9af',
          300: '#ffda87',
          400: '#ffcb69',
          500: '#ffb238',
          600: '#db8f28',
          700: '#b76f1c',
          800: '#935211',
          900: '#7a3d0a',
        },
        purple: {
          50: '#faf5ff',
          100: '#f2e5ff',
          200: '#e9d6ff',
          300: '#d8b4fe',
          400: '#bf82fb',
          500: '#a855f7',
          600: '#9133e9',
          700: '#7e22ce',
          800: '#6a20a6',
          900: '#591c87',
        },
        yellow: {
          50: '#fefce7',
          100: '#fef9c3',
          200: '#fef08b',
          300: '#fef08b',
          400: '#facc14',
          500: '#e7b008',
          600: '#c88a04',
          700: '#a26107',
          800: '#864e0e',
          900: '#733f12',
        },
        brown: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29f',
          500: '#78726d',
          600: '#56524e',
          700: '#44403c',
          800: '#292524',
          900: '#211e1b',
        },
        cyan: {
          50: '#ebfeff',
          100: '#cdfafe',
          200: '#a6f3fc',
          300: '#67e8f9',
          400: '#20d3ee',
          500: '#07b6d5',
          600: '#088eaf',
          700: '#0e7490',
          800: '#155f75',
          900: '#164f64',
        },
        indigo: {
          50: '#f0f3ff',
          100: '#e0e8ff',
          200: '#c8d3fe',
          300: '#a6b5fc',
          400: '#828df8',
          500: '#6366f2',
          600: '#5048e5',
          700: '#463acb',
          800: '#372fa2',
          900: '#312e7f',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce8f4',
          200: '#fbd0e8',
          300: '#f9a9d5',
          400: '#f471b5',
          500: '#ec4699',
          600: '#db2979',
          700: '#bf185d',
          800: '#9b174c',
          900: '#811842',
        },
        teal: {
          50: '#f2fdfa',
          100: '#cbfbf0',
          200: '#98f6e3',
          300: '#5dead5',
          400: '#2bd4bd',
          500: '#14b8a5',
          600: '#0d968b',
          700: '#0f756d',
          800: '#115f5a',
          900: '#134e4a',
        },
        lime: {
          50: '#f7fee7',
          100: '#ebfcca',
          200: '#d9f99f',
          300: '#bef263',
          400: '#a1e633',
          500: '#82cb15',
          600: '#66a50d',
          700: '#4c7b0f',
          800: '#406312',
          900: '#355214',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        xsm: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.15px' }],
        sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.15px' }],
        md: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.15px' }],
        lg: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        h1: ['2.25rem', { lineHeight: '2.625rem' }],
      },
      spacing: {
        '0.25': '0.125rem',
        '0.5': '0.25rem',
        '0.75': '0.375rem',
        '1': '0.5rem',
        '1.5': '0.75rem',
        '2': '1rem',
        '2.5': '1.25rem',
        '3': '1.5rem',
        '4': '2rem',
        '4.5': '2.25rem',
        '5': '2.5rem',
        '6': '3rem',
        '7': '3.5rem',
        '8': '4rem',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        button: '0.5rem',
        input: '0.5rem',
        card: '0.75rem',
        modal: '0.75rem',
        badge: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px 0 rgb(19 29 53 / 10%)',
        md: '0 2px 4px -1px rgb(19 29 53 / 16%)',
        lg: '0 4px 6px -2px rgb(19 29 53 / 8%), 0 4px 16px -3px rgb(0 0 0 / 12%)',
        xl: '0 10px 10px -5px rgb(0 0 0 / 8%), 0 25px 20px -5px rgb(0 0 0 / 16%)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 26%)',
      },
      borderWidth: {
        DEFAULT: '1px',
        strong: '2px',
      },
      opacity: {
        disabled: '0.5',
        secondary: '0.6',
        backdrop: '0.4',
        focus: '0.12',
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        overlay: '1040',
        modal: '1050',
        popover: '1060',
        toast: '1080',
        tooltip: '1090',
      },
    },
  },
} satisfies Config
```

## Structured Token System

### Core Colors

```ts
export const colorTokens = {
  neutral: {
    50: '#f4f4f4',
    100: '#e8e8e8',
    200: '#d1d1d1',
    300: '#bababa',
    400: '#a3a3a3',
    500: '#8c8c8c',
    600: '#767676',
    700: '#454545',
    800: '#2b2b2b',
    900: '#1a1a1a',
    white: '#ffffff',
  },
  brand: {
    50: '#f1f6fe',
    100: '#d0e0fe',
    200: '#a1bffe',
    300: '#729cfd',
    400: '#4e7efb',
    500: '#154ef9',
    600: '#0f3bd6',
    700: '#0a2cb3',
    800: '#061e90',
    900: '#041477',
  },
  semantic: {
    success: { base: '#4ad631', hover: '#2eb823', text: '#189a19' },
    error: { base: '#fc3c2a', hover: '#d81f1e', text: '#d81f1e' },
    warning: { base: '#ffb238', hover: '#db8f28', text: '#b76f1c' },
    info: { base: '#56a2ff', hover: '#3e7edb', text: '#3e7edb' },
  },
  charts: {
    1: '#6366f2',
    2: '#ec4699',
    3: '#82cb15',
    4: '#ffb238',
    5: '#56a2ff',
    6: '#a855f7',
    7: '#65758b',
    8: '#fc3c2a',
    9: '#07b6d5',
    10: '#4ad631',
  },
} as const
```

### Semantic Colors

```ts
export const semanticColorTokens = {
  light: {
    text: {
      primary: '#1a1a1ade',
      primaryContrast: '#ffffff',
      primaryStatic: '#1a1a1ade',
      secondary: '#1a1a1a99',
      secondaryContrast: '#ffffff99',
      disabled: '#1a1a1a61',
      contrastDisabled: '#ffffff9e',
      focus: '#1a1a1a1f',
      brand: '{brand.600}',
      success: '{green.700}',
      error: '{red.600}',
      warning: '{orange.700}',
      info: '{lightBlue.600}',
      link: '{brand.500}',
      linkHovered: '{brand.600}',
    },
    surface: {
      bg: '{neutral.white}',
      underIslands: '{neutral.50}',
      underIslandsAlt: '{blueGrey.100}',
      neutralUltraDark: '{neutral.900}',
      backdrop: '#00000066',
    },
    fill: {
      neutral: '{neutral.50}',
      neutralHover: '#2b2b2b0a',
      neutralSelected: '{neutral.100}',
      neutralDark: '{neutral.700}',
      neutralDarkHover: '{neutral.600}',
      neutralDarkUltra: '{neutral.900}',
      contrast: '{neutral.white}',
      contrastHover: '{neutral.100}',
      contrastStatic: '{neutral.white}',
      contrastLight: '#ffffff14',
      contrastLightHover: '#ffffff0a',
      brand: '{brand.500}',
      brandHover: '{brand.600}',
      brandLight: '{brand.100}',
      brandLightHover: '{brand.50}',
      brandSelected: '{brand.50}',
      brandSelectedHover: '{brand.100}',
      brandHighlighted: '{brand.50}',
      disabled: '#131d3542',
      contrastDisabled: '#ffffff1f',
      inputNeutral: '{fill.neutral}',
      skeleton: '{neutral.100}',
      toggle: '{neutral.200}',
    },
    border: {
      light: '{neutral.100}',
      hover: '{neutral.300}',
      neutral: '{neutral.200}',
      neutralDark: '{neutral.700}',
      contrast: '{neutral.white}',
      focus: '{blue.500}',
      hoverInverse: '{neutral.white}',
      brand: '{brand.500}',
      brandLight: '{brand.300}',
      error: '{red.500}',
      errorLight: '{red.300}',
      info: '{lightBlue.500}',
      infoLight: '{lightBlue.300}',
      success: '{green.500}',
      successLight: '{green.300}',
      warning: '{orange.500}',
      warningLight: '{orange.300}',
      disabled: '#131d351f',
      disabledInverse: '#ffffff1f',
    },
    icon: {
      primary: '{text.primary}',
      secondary: '{text.secondary}',
      brand: '{text.brand}',
      success: '{text.success}',
      error: '{text.error}',
      warning: '{text.warning}',
      info: '{text.info}',
      disabled: '{text.disabled}',
    },
  },
  dark: {
    text: {
      primary: '{neutral.white}',
      primaryContrast: '{neutral.white}',
      primaryStatic: '#1a1a1ade',
      secondary: '#ffffff99',
      secondaryContrast: '#ffffff99',
      disabled: '#ffffff61',
      contrastDisabled: '#ffffff9e',
      focus: '#1a1a1a1f',
      brand: '{brand.400}',
      success: '{green.700}',
      error: '{red.600}',
      warning: '{orange.700}',
      info: '{lightBlue.600}',
      link: '{brand.400}',
      linkHovered: '{brand.500}',
    },
    surface: {
      bg: '{neutral.900}',
      underIslands: '{neutral.800}',
      underIslandsAlt: '{blueGrey.800}',
      neutralUltraDark: '{neutral.900}',
      backdrop: '#00000066',
    },
    fill: {
      neutral: '{neutral.700}',
      neutralHover: '#f4f4f40a',
      neutralSelected: '{neutral.700}',
      neutralDark: '{neutral.700}',
      neutralDarkHover: '{neutral.600}',
      neutralDarkUltra: '{neutral.800}',
      contrast: '{neutral.800}',
      contrastHover: '{neutral.100}',
      contrastStatic: '{neutral.white}',
      brand: '{brand.500}',
      brandHover: '{brand.600}',
      brandLight: '{brand.100}',
      brandLightHover: '#154ef952',
      brandSelected: '#154ef952',
      brandSelectedHover: '#154ef952',
      brandHighlighted: '#154ef952',
      disabled: '#131d3542',
      contrastDisabled: '#ffffff1f',
      inputNeutral: '#ff000014',
      skeleton: '{neutral.800}',
      toggle: '{neutral.700}',
    },
    border: {
      light: '{neutral.700}',
      hover: '{neutral.600}',
      neutral: '{neutral.700}',
      neutralDark: '{neutral.700}',
      contrast: '#ffffff66',
      focus: '{blue.500}',
      hoverInverse: '{neutral.white}',
      brand: '{brand.500}',
      brandLight: '{brand.300}',
      error: '{red.500}',
      errorLight: '{red.300}',
      info: '{lightBlue.500}',
      infoLight: '{lightBlue.300}',
      success: '{green.500}',
      successLight: '{green.300}',
      warning: '{orange.500}',
      warningLight: '{orange.300}',
      disabled: '#ffffff1f',
      disabledInverse: '#ffffff1f',
    },
  },
} as const
```

### Typography

```ts
export const typographyTokens = {
  body1: {
    family: 'Roboto',
    weight: 400,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  body1Medium: {
    family: 'Roboto',
    weight: 500,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  body2: {
    family: 'Roboto',
    weight: 400,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.17,
  },
  body2Medium: {
    family: 'Roboto',
    weight: 500,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.17,
  },
  body1Mono: {
    family: 'Roboto Mono',
    weight: 400,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  body1MonoMedium: {
    family: 'Roboto Mono',
    weight: 500,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  body2Mono: {
    family: 'Roboto Mono',
    weight: 400,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.17,
  },
  body2MonoMedium: {
    family: 'Roboto Mono',
    weight: 500,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.17,
  },
  headline1: { family: 'Merriweather', weight: 900, size: 36, lineHeight: 42 },
  headline2: { family: 'Roboto', weight: 300, size: 60, lineHeight: 72 },
  headline3: { family: 'Roboto', weight: 400, size: 48, lineHeight: 56 },
  headline3Medium: { family: 'Roboto', weight: 500, size: 48, lineHeight: 56 },
  headline4: { family: 'Roboto', weight: 500, size: 34, lineHeight: 42 },
  headline5: { family: 'Roboto', weight: 600, size: 24, lineHeight: 32 },
  headline5Regular: { family: 'Roboto', weight: 400, size: 24, lineHeight: 32 },
  headline6: { family: 'Roboto', weight: 500, size: 20, lineHeight: 26 },
  headline6Regular: { family: 'Roboto', weight: 400, size: 20, lineHeight: 26 },
  buttonLg: {
    family: 'Roboto',
    weight: 500,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  buttonMd: {
    family: 'Roboto',
    weight: 500,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  buttonSm: {
    family: 'Roboto',
    weight: 500,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  buttonXsm: {
    family: 'Roboto',
    weight: 500,
    size: 12,
    lineHeight: 16,
    letterSpacing: 0.15,
  },
  inputLg: {
    family: 'Roboto',
    weight: 400,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  inputMd: {
    family: 'Roboto',
    weight: 400,
    size: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  inputSm: {
    family: 'Roboto',
    weight: 400,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  caption: {
    family: 'Roboto',
    weight: 400,
    size: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  overline: {
    family: 'Roboto',
    weight: 400,
    size: 12,
    lineHeight: 32,
    letterSpacing: 0.83,
    textTransform: 'uppercase',
  },
  helperText: { family: 'Roboto', weight: 400, size: 12, lineHeight: 20 },
} as const
```

### Spacing And Sizing

```ts
export const spacingTokens = {
  module: {
    0: 0,
    0.25: 2,
    0.5: 4,
    0.75: 6,
    1: 8,
    1.5: 12,
    2: 16,
    2.5: 20,
    3: 24,
    4: 32,
    4.5: 36,
    5: 40,
    6: 48,
    7: 56,
    8: 64,
  },
  responsive: {
    desktopLarge: {
      minWidth: 1367,
      maxWidth: 1920,
      minHeight: 668,
      maxHeight: 980,
    },
    desktop: { minWidth: 1281, maxWidth: 1366, minHeight: 668, maxHeight: 924 },
    tablet: { minWidth: 1025, maxWidth: 1280, minHeight: 668, maxHeight: 924 },
    mobileTablet: {
      minWidth: 375,
      maxWidth: 1024,
      minHeight: 892,
      maxHeight: 1194,
    },
  },
  roles: {
    section: '{island.py}',
    container: '{layout.root-container}',
    stack: '{base.module.3}',
    inline: '{base.module.1}',
  },
  layout: {
    root: { desktop: 24, mobileTablet: 0 },
    rootContainer: { desktop: 0, mobileTablet: 12 },
    columnContainerMd: 800,
    columnContainerLg: 1000,
    islandTitleLimit: 350,
    islandPx: { desktop: 0, mobileTablet: 16 },
    islandPy: 24,
    islandPyMega: 40,
    islandMargin: { desktop: 0, mobileTablet: 8 },
    islandGap: { desktop: 24, mobileTablet: 8 },
    islandRadius: 12,
  },
} as const
```

### Radius

```ts
export const radiusTokens = {
  sm: 4,
  md: 8,
  lg: 12,
  xlg: 16,
  button: 8,
  input: 8,
  card: 12,
  modal: 12,
  modalFlatBottom: { top: 12, bottomDesktop: 12, bottomMobile: 0 },
  badge: 100,
  tooltip: 4,
  floatingBar: 16,
} as const
```

### Shadows

```ts
export const shadowTokens = {
  sm: [{ x: 0, y: 1, blur: 3, spread: 0, color: 'rgb(19 29 53 / 10%)' }],
  md: [{ x: 0, y: 2, blur: 4, spread: -1, color: 'rgb(19 29 53 / 16%)' }],
  lg: [
    { x: 0, y: 4, blur: 6, spread: -2, color: 'rgb(19 29 53 / 8%)' },
    { x: 0, y: 4, blur: 16, spread: -3, color: 'rgb(0 0 0 / 12%)' },
  ],
  xl: [
    { x: 0, y: 10, blur: 10, spread: -5, color: 'rgb(0 0 0 / 8%)' },
    { x: 0, y: 25, blur: 20, spread: -5, color: 'rgb(0 0 0 / 16%)' },
  ],
  '2xl': [{ x: 0, y: 25, blur: 50, spread: -12, color: 'rgb(0 0 0 / 26%)' }],
} as const
```

### Borders, Opacity, Z-Index

```ts
export const borderTokens = {
  width: {
    default: 1,
    badgeStrong: 2,
  },
  color: semanticColorTokens.light.border,
} as const

export const opacityTokens = {
  disabledText: 0.5,
  secondaryText: 0.6,
  backdrop: 0.4,
  focus: 0.12,
  subtleHover: 0.04,
  selectedTint: 0.32,
} as const

export const zIndexTokens = {
  dropdown: 1000,
  sticky: 1020,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  toast: 1080,
  tooltip: 1090,
} as const
```

## Component-Level Tokens

### Button

```ts
export const buttonTokens = {
  radius: '{radius.md}',
  borderWidth: 1,
  gap: 8,
  sizes: {
    lg: {
      height: 56,
      px: 16,
      py: 16,
      iconOnlyWidth: 56,
      textStyle: 'buttonLg',
    },
    md: { height: 40, px: 12, py: 8, iconOnlyWidth: 44, textStyle: 'buttonMd' },
    sm: { height: 30, px: 12, py: 5, iconOnlyWidth: 30, textStyle: 'buttonSm' },
    xsm: {
      height: 24,
      px: 8,
      py: 4,
      iconOnlyWidth: 24,
      textStyle: 'buttonXsm',
    },
  },
  textVariantPadding: {
    lg: { px: 8, py: 16 },
    md: { px: 8, py: 8 },
    sm: { px: 8, py: 5 },
    xsm: { px: 8, py: 4 },
  },
  colors: {
    brand: {
      default: 'fill.brand',
      hover: 'fill.brandHover',
      text: 'text.primaryContrast',
      outlinedBorder: 'border.brandLight',
    },
    error: {
      default: 'fill.error',
      hover: 'fill.errorHover',
      text: 'text.primaryContrast',
      outlinedBorder: 'border.errorLight',
    },
    info: {
      default: 'fill.info',
      hover: 'fill.infoHover',
      text: 'text.primaryContrast',
      outlinedBorder: 'border.infoLight',
    },
    neutral: {
      default: 'fill.neutral',
      hover: 'fill.neutralHover',
      text: 'text.primary',
      outlinedBorder: 'border.neutral',
    },
    contrast: {
      default: 'fill.contrast',
      hover: 'fill.contrastHover',
      text: 'text.primaryStatic',
      outlinedBorder: 'border.contrast',
    },
    dark: {
      default: 'fill.neutralDark',
      hover: 'fill.neutralDarkHover',
      text: 'text.primaryContrast',
      outlinedBorder: 'border.neutralDark',
    },
    disabled: {
      fill: 'fill.disabled',
      text: 'text.disabled',
      border: 'border.disabled',
    },
  },
  counter: {
    lg: { minWidth: 24, px: 6 },
    md: { minWidth: 24, px: 6 },
    sm: { minWidth: 20, px: 4 },
  },
} as const
```

### Input

```ts
export const inputTokens = {
  radius: '{radius.md}',
  borderWidth: 1,
  icon: {
    lg: 24,
    md: 24,
    sm: 20,
    xsm: 16,
    closeX: 16,
    closeY: 24,
  },
  sizes: {
    lg: { px: 16, py: 16, gap: 8, textStyle: 'inputLg' },
    md: { px: 12, py: 8, gap: 8, textStyle: 'inputMd' },
    sm: { px: 12, py: 8, gap: 8, textStyle: 'inputSm' },
    xsm: {
      px: 8,
      py: 4,
      gap: { desktop: 4, mobileTablet: 8 },
      textStyle: 'inputSm',
    },
  },
  chipPadding: {
    lg: { py: 12 },
    md: { py: 4 },
    sm: { py: 5 },
  },
  colors: {
    fill: 'fill.inputNeutral',
    text: 'text.primary',
    placeholder: 'text.secondary',
    helper: 'text.secondary',
    error: 'text.error',
    border: 'border.neutral',
    borderHover: 'border.hover',
    borderFocus: 'border.focus',
    borderError: 'border.error',
    disabledFill: 'fill.disabled',
    disabledText: 'text.disabled',
    disabledBorder: 'border.disabled',
  },
} as const
```

### Card / Island

```ts
export const cardTokens = {
  radius: '{radius.lg}',
  fill: 'surface.underIslands',
  border: 'border.light',
  shadow: 'shadow.sm',
  padding: {
    default: '{spacing.module.3}',
    compact: '{spacing.module.2}',
    mobile: '{spacing.module.1.5}',
  },
  searchResult: {
    pxy: { desktop: 0, mobileTablet: 12 },
    minWidth: { desktop: 260, mobileTablet: 0 },
    maxWidth: { desktop: 270, mobileTablet: 800 },
  },
} as const
```

### Tag / Chip / Badge

```ts
export const tagTokens = {
  radius: '{radius.md}',
  colors: {
    default: {
      fill: 'fill.neutral',
      text: 'text.primary',
      border: 'border.neutral',
    },
    brand: {
      fill: 'fill.brandLight',
      text: 'text.brand',
      border: 'border.brandLight',
    },
    error: {
      fill: 'fill.errorLight',
      text: 'text.error',
      border: 'border.errorLight',
    },
    warning: {
      fill: 'fill.warningLight',
      text: 'text.warning',
      border: 'border.warningLight',
    },
    info: {
      fill: 'fill.infoLight',
      text: 'text.info',
      border: 'border.infoLight',
    },
    success: {
      fill: 'fill.successLight',
      text: 'text.success',
      border: 'border.successLight',
    },
  },
} as const

export const chipTokens = {
  sizes: {
    lg: { px: 8, py: 8, labelPx: 8 },
    md: { px: 4, py: 4, labelPx: 8 },
    sm: { px: 3, py: 3, labelPx: 4 },
  },
  toggle: {
    pxy: 4,
    gap: 2,
    fill: 'fill.toggle',
  },
} as const

export const badgeTokens = {
  minWidth: 20,
  height: 20,
  px: 4,
  radius: 100,
  borderWidth: {
    default: 1,
    bordered: 2,
  },
  colors: {
    default: { fill: 'fill.neutral', text: 'text.primary' },
    white: { fill: 'fill.contrast', text: 'text.primaryStatic' },
    transparent: { fill: 'transparent', text: 'text.primary' },
    primary: { fill: 'fill.brand', text: 'text.primaryContrast' },
    error: { fill: 'fill.error', text: 'text.primaryContrast' },
    warning: { fill: 'fill.warning', text: 'text.primaryContrast' },
    info: { fill: 'fill.info', text: 'text.primaryContrast' },
    success: { fill: 'fill.success', text: 'text.primaryContrast' },
  },
} as const
```
