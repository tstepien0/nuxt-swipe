
# Nuxt-Swipe

This Nuxt module allows you to easily add swipe gestures to your Vue 3 / Nuxt 3 and Nuxt 4 applications. With just a few lines of code, you can enable swiping on your website or web application.

## Installation

To add this module to your Nuxt project, run the following command:

```bash
npm i @emanuele-em/nuxt-swipe
```

Then, add `nuxt-swipe` to the modules section of your `nuxt.config.ts` (or `nuxt.config.js`) file:

```typescript
export default defineNuxtConfig({
  modules: [
    '@emanuele-em/nuxt-swipe'
  ]
})
```    

## Usage

To use the module, simply add `<Swipe>` component, it will be the component that will intercept the _swipe_ gesture.

For example:
```html
<template>
  <Swipe>
    <slot />
  </Swipe>
</template>
```

The module registers a plugin that will emit the `swipe` event only after checks ensure that the gesture is a valid swipe gesture.

You can handle that event in the script section of your component (remember to clean up listeners with `$off` on unmount):

```html
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()

const handleSwipe = (direction) => {
  switch (direction) {
    case 'left':
      // swiped left, do things
      break
    case 'right':
      // swiped right, do things
      break
    case 'up':
      // swiped up, do things
      break
    case 'down':
      // swiped down, do things
      break
    default:
      break
  }
}

onMounted(() => {
  nuxtApp.$bus.$on('swipe', handleSwipe)
})

onUnmounted(() => {
  nuxtApp.$bus.$off('swipe', handleSwipe)
})
</script>
```

## Examples

Swipe navigation with `Swipe` component in Default Layout:

_layouts/default.vue_
```html
<template>
  <Swipe>
    <slot />
  </Swipe>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useNuxtApp, useRoute, navigateTo } from '#app'

const nuxtApp = useNuxtApp()
const routes = ['/', '/about']

const onSwipe = (direction) => {
  let indexCurrentRoute = routes.indexOf(useRoute().path)
  if (direction === 'left' && routes[indexCurrentRoute + 1]) {
    indexCurrentRoute += 1
  }
  if (direction === 'right' && routes[indexCurrentRoute - 1]) {
    indexCurrentRoute -= 1
  }
  return navigateTo(routes[indexCurrentRoute])
}

onMounted(() => {
  nuxtApp.$bus.$on('swipe', onSwipe)
})

onUnmounted(() => {
  nuxtApp.$bus.$off('swipe', onSwipe)
})
</script>
```


## Demo

[demo-nuxt-swipe.pages.dev](https://demo-nuxt-swipe.pages.dev/)


## Roadmap

- Typescript correct syntax

- Swipe handling during the `touchEvent` and not just at `touchend` 


## License

[MIT](https://choosealicense.com/licenses/mit/)

