// The bar's own labels. Taken verbatim from KiniaHRPortal's common.json so the
// bar reads the same in every app. Kept inside the package (not i18next) so an
// app doesn't need any translation setup to use it — it passes `lang` only.
//
// No string here takes a plural count: Irish has five plural forms, and a
// count-bearing string with only one/other forms renders English in Irish.
export const STRINGS = {
  en: {
    openNav: 'Open navigation',
    notifications: 'Notifications',
    loading: 'Loading…',
    clearAll: 'Clear all',
    clearing: 'Clearing…',
    allCaughtUp: "You're all caught up — no actions needed.",
    close: 'Close',
    more: '+{{n}} more',
    switchApp: 'Switch app',
    appsHeading: 'Kinia apps',
    openApp: 'Open {{name}}',
    comingSoon: '{{name}} — coming soon',
    account: 'Account',
    signOut: 'Sign out',
    switchLanguage: 'Switch language',
    // The button names the language you would switch TO.
    otherLanguage: 'Gaeilge',
  },
  ga: {
    openNav: 'Oscail nascleanúint',
    notifications: 'Fógraí',
    loading: 'Ag lódáil…',
    clearAll: 'Glan gach ceann',
    clearing: 'Ag glanadh…',
    allCaughtUp: 'Tá tú suas chun dáta — níl aon ghníomhartha ag teastáil.',
    close: 'Dún',
    more: '+{{n}} eile',
    switchApp: 'Athraigh aip',
    appsHeading: 'Aipeanna Kinia',
    openApp: 'Oscail {{name}}',
    comingSoon: '{{name}} — ag teacht go luath',
    account: 'Cuntas',
    signOut: 'Sínigh amach',
    switchLanguage: 'Athraigh teanga',
    otherLanguage: 'English',
  },
}

export const translate = (lang, key, vars = {}) => {
  const table = STRINGS[lang] ?? STRINGS.en
  const s = table[key] ?? STRINGS.en[key] ?? key
  return s.replace(/\{\{(\w+)\}\}/g, (_, v) => (vars[v] ?? ''))
}
