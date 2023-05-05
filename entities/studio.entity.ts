export interface StudioNavigation {
  name: string
  to: string
  icon: string
  current: boolean
  children?: Omit<StudioNavigation, 'children' | 'icon'>[]
}

export interface StudioTeam extends Omit<StudioNavigation, 'icon'> {
  initial: string
}
