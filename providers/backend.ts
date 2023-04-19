import type { ProviderGetImage } from '@nuxt/image-edge'
import { joinURL } from 'ufo'

// @ts-ignore
export const getImage: ProviderGetImage = (src: string, { baseURL } = {}) => {
  return {
    url: joinURL(baseURL, src)
  }
}
