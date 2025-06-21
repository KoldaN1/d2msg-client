import { app } from 'electron'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { Config } from '../../types/config'

const configPath: string = join(app.getPath('userData'), 'config.json')

export const getSystemLocale = (): string => app.getLocale()

export const loadConfig = (): Config => {
  if (!existsSync(configPath)) {
    const defaultConfig = {
      language: getSystemLocale()
    }
    writeFileSync(configPath, JSON.stringify(defaultConfig))

    return defaultConfig
  } else {
    const json = readFileSync(configPath, 'utf-8')

    return JSON.parse(json)
  }
}

export const saveConfig = (config: Config): void => {
  writeFileSync(configPath, JSON.stringify(config))
}
