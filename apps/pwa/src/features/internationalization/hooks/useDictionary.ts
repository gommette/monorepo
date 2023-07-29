import { createChainedI18n } from '@solid-primitives/i18n'

interface LanguageDictionary {
  [key: string]: string | ((params: { [key: string]: any }) => string)
}

export interface Dictionary {
  [key: string]: LanguageDictionary
}

export const SUPPORTED_LOCALES = ['en']
const currentLocale = new Intl.NumberFormat().resolvedOptions().locale

export function useDictionary(dictionary: Dictionary) {
  return createChainedI18n({
    dictionaries: dictionary,
    locale: !SUPPORTED_LOCALES.includes(currentLocale) ? SUPPORTED_LOCALES[0] : currentLocale,
  })
}
