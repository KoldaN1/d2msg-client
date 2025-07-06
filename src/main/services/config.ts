import { app } from 'electron'
import { Conf } from 'electron-conf/main'
import { Config } from '../../types/config'

const DEFAULT_LANGUAGE = 'en'
const DEFAULT_THEME = 'dark'
const DEFAULT_USER_SELECT_LANGUAGE = false

const schema = {
  type: 'object',
  properties: {
    language: { type: 'string' },
    theme: { type: 'string' },
    userSelectLanguage: { type: 'boolean' },
    accessToken: { type: 'string' },
    refreshToken: { type: 'string' }
  },
  additionalProperties: false
} as const

// @ts-ignore skip "required" field
const store = new Conf<Config>({ schema })

const tryInitConfig = (): void => {
  if (!store.get('language')) {
    store.set('language', app.getLocale() || DEFAULT_LANGUAGE)
  }

  if (!store.get('theme')) {
    store.set('theme', DEFAULT_THEME)
  }

  if (!store.get('userSelectLanguage')) {
    store.set('userSelectLanguage', DEFAULT_USER_SELECT_LANGUAGE)
  }
}

export const loadConfig = (): Config => {
  tryInitConfig()
  return store.store
}

export const saveConfigValue = (key: keyof Config, value: Config[keyof Config]): void => {
  store.set(key, value)
}
