import { create } from 'zustand'
import { Config } from '../../../types/config'

interface SystemUiState {
  config?: Config

  setConfig: (config: Config) => void
}

export const useSystemStore = create<SystemUiState>((set) => ({
  config: undefined,
  setConfig: (config) => set({ config })
}))

export default useSystemStore
