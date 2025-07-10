import { create } from 'zustand'
import { Config } from '../../../types/config'

interface SystemUiState {
  config?: Config
  setConfig: (config: Config) => void
  languages: { key: string; label: string; countryCode: string }[] | null
  setLanguages: (languages: { key: string; label: string; countryCode: string }[] | null) => void
}

export const useSystemStore = create<SystemUiState>((set) => ({
  config: undefined,
  setConfig: (config) => set({ config }),
  languages: null,
  setLanguages: (languages) => set({ languages })
}))

export default useSystemStore
