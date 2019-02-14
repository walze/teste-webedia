import { EventEmitter } from "events"
import { isMobile } from "../helpers"


class MobileStore extends EventEmitter {

  constructor() {
    super()

    this.isMobile = isMobile()

    window.addEventListener('resize', () => {
      this.isMobile = isMobile()

      this.emit('resize', this.isMobile)
    })
  }

  /**
   * @type { (isMobile: boolean) => void }
   */
  onResize = (cb) => this.on('resize', cb)
}


export const mobileStore = new MobileStore()