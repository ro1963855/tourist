import type { I18nOptions } from 'vue-i18n'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

// https://levelup.gitconnected.com/9e7301c52f19
// https://vue-i18n.intlify.dev/guide/advanced/lazy.html#lazy-loading

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type SetupI18nType = ReturnType<typeof setupI18n>

export const SUPPORT_LOCALES = Object.freeze(['zh-TW'])

type AvailableLocales = ArrayElement<typeof SUPPORT_LOCALES>

export function setupI18n (options: I18nOptions = { locale: 'zh-TW' }) {
  const i18n = createI18n(options)

  if (options.locale) {
    setI18nLanguage(i18n, options.locale)
  }

  return i18n
}

export async function setI18nLanguage (i18n: SetupI18nType, locale: AvailableLocales) {
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(i18n, locale)
  }

  i18n.global.locale = locale

  const htmlEl = document.querySelector('html')
  if (htmlEl) {
    htmlEl.setAttribute('lang', locale)
  }
}

const fetchLocaleFile = async (locale: AvailableLocales) => {
  const messages = await import(`../locales/${locale}.json`)
  return messages
}

export async function loadLocaleMessages (i18n: SetupI18nType, locale: AvailableLocales) {
  // load locale messages with dynamic import
  const messages = await fetchLocaleFile(locale)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

export const defaultI18n = setupI18n({
  // https://vue-i18n.intlify.dev/guide/advanced/composition.html#basic-usage
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  globalInjection: true,
  messages: {},
})

export default defaultI18n
