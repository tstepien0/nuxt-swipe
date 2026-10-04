import { defineNuxtPlugin } from '#app'
import mitt from 'mitt'

export default defineNuxtPlugin(() => {
  let swipe: Swipe | null = null
  const emitter = mitt()

  const bus = {
    $on: emitter.on,
    $off: emitter.off,
    $emit: emitter.emit
  }

  const startSwipe = (e: any) => {
    swipe = new Swipe(e)
  }

  const handleSwipe = (e: any) => {
    if (!swipe) {
      return
    }

    swipe.setEndEvent(e)
    if (swipe.hasMultipleTouches()) {
      swipe = null
      return
    }

    let direction: string | null = null
    if (swipe.isSwipeRight()) {
      direction = 'right'
    } else if (swipe.isSwipeLeft()) {
      direction = 'left'
    } else if (swipe.isSwipeDown()) {
      direction = 'down'
    } else if (swipe.isSwipeUp()) {
      direction = 'up'
    }

    swipe = null

    if (direction) {
      bus.$emit('swipe', direction)
    }
  }

  return {
    provide: {
      bus,
      startSwipe,
      handleSwipe
    }
  }
})

class Swipe {
  static SWIPE_THRESHOLD = 50 // Minimum difference in pixels at which a swipe gesture is detected

  static SWIPE_LEFT = 1
  static SWIPE_RIGHT = 2
  static SWIPE_UP = 3
  static SWIPE_DOWN = 4

  startEvent: any
  endEvent: any

  constructor (startEvent: any, endEvent: any = null) {
    this.startEvent = startEvent
    this.endEvent = endEvent
  }

  isSwipeLeft (): boolean {
    return this.getSwipeDirection() === Swipe.SWIPE_LEFT
  }

  isSwipeRight (): boolean {
    return this.getSwipeDirection() === Swipe.SWIPE_RIGHT
  }

  isSwipeUp (): boolean {
    return this.getSwipeDirection() === Swipe.SWIPE_UP
  }

  isSwipeDown (): boolean {
    return this.getSwipeDirection() === Swipe.SWIPE_DOWN
  }

  hasMultipleTouches (): boolean {
    return (
      (this.startEvent?.touches?.length || 0) > 1 ||
      (this.endEvent?.touches?.length || 0) > 1
    )
  }

  getSwipeDirection (): number | null {
    const start = this.startEvent?.changedTouches?.[0]
    const end = this.endEvent?.changedTouches?.[0]

    if (!start || !end) {
      return null
    }

    const horizontalDifference = start.screenX - end.screenX
    const verticalDifference = start.screenY - end.screenY

    // Horizontal difference dominates
    if (Math.abs(horizontalDifference) > Math.abs(verticalDifference)) {
      if (horizontalDifference >= Swipe.SWIPE_THRESHOLD) {
        return Swipe.SWIPE_LEFT
      } else if (horizontalDifference <= -Swipe.SWIPE_THRESHOLD) {
        return Swipe.SWIPE_RIGHT
      }
    } else {
      if (verticalDifference >= Swipe.SWIPE_THRESHOLD) {
        return Swipe.SWIPE_UP
      } else if (verticalDifference <= -Swipe.SWIPE_THRESHOLD) {
        return Swipe.SWIPE_DOWN
      }
    }

    return null
  }

  setEndEvent (endEvent: any) {
    this.endEvent = endEvent
  }
}

