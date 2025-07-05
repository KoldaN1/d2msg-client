import { app } from 'electron'
import { Conf } from 'electron-conf/main'
import { Config } from '../../types/config'

const DEFAULT_LANGUAGE = 'en'
const DEFAULT_THEME = 'dark'

const schema = {
  type: 'object',
  properties: {
    language: { type: 'string' },
    userSelectLanguage: { type: 'boolean' },
    accessToken: { type: 'string' },
    refreshToken: { type: 'string' }
  },
  additionalProperties: false
} as const

// @ts-ignore skip "required" field
const store = new Conf<Config>({ schema })

const initConfig = (): void => {
  if (!store.get('language')) {
    store.set('language', app.getLocale() || DEFAULT_LANGUAGE)
  }

  if (!store.get('userSelectLanguage')) {
    store.set('userSelectLanguage', false)
  }
}

export const loadConfig = (): Config => {
  initConfig()
  return store.store
}

export const saveConfigValue = (key: keyof Config, value: Config[keyof Config]): void => {
  store.set(key, value)
}
