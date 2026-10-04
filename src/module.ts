import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'

export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@emanuele-em/nuxt-swipe',
    configKey: 'nuxt-swipe',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    addPlugin: true
  },
  setup (options, nuxt) {
    if (options.addPlugin) {
      const resolver = createResolver(import.meta.url)

      addComponent({
        name: 'Swipe',
        filePath: resolver.resolve('./runtime/components/Swipe.vue')
      })
      
      addPlugin(
        resolver.resolve('./runtime/plugin')
      )
    }
  }
})
