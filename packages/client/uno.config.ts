// uno.config.ts
import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno,
  presetWind, transformerDirectives, transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWind(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
