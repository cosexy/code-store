export interface StudioNavigation {
  name: string
  to: string
  icon: string
  current: boolean
}

export interface StudioTeam extends Omit<StudioNavigation, 'icon'> {
  initial: string
}
