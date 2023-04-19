import type dayjs from 'dayjs'

export const useDayjs = (): typeof dayjs => {
  const { $dayjs } = useNuxtApp()
  return $dayjs
}
