import anime from 'animejs'

export const useAnime = (): typeof anime => {
  const { $anime } = useNuxtApp()
  if (!$anime) {
    throw new Error('Anime is not provided')
  }
  return $anime as typeof anime
}
