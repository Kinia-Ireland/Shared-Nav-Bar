import { useEffect, useRef, useState } from 'react'
import { translate } from './strings'

// The shared Kinia top bar. Look and behaviour are KiniaHRPortal's
// (src/components/layout/Topbar.jsx), which is the standard for every Kinia app.
//
// Everything app-specific comes in through props, so the bar itself never
// queries a database. Anything left out is simply not rendered:
//   brand          → logo on the left            (apps without a sidebar)
//   title          → page name on the left
//   onMenuToggle   → ☰ button, mobile only       (apps with a sidebar)
//   notifications  → the bell and its panel
//   user/onSignOut → the account menu            (apps without a sidebar)
//   apps           → the waffle launcher
//
// Order on the right is fixed: language → bell → account → waffle (far right).

const GRADS = ['bg-purple', 'bg-blue', 'bg-teal', 'bg-amber', 'bg-green', 'bg-red']
const DOTS  = ['red', 'amber', 'purple', 'green']

const openApp = (app) => window.open(app.url, '_blank', 'noopener,noreferrer')

const initialsOf = (user) => {
  const src = (user?.name || user?.email || '').trim()
  if (!src) return '?'
  const parts = src.split(/[\s@.]+/).filter(Boolean)
  return parts.length > 1 && user?.name
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : src[0].toUpperCase()
}

const KiniaTopbar = ({
  lang = 'en',
  onLanguageChange,
  title,
  brand,
  onMenuToggle,
  notifications,
  user,
  onSignOut,
  accountNote,
  apps = [],
}) => {
  const t = (key, vars) => translate(lang, key, vars)

  // One open menu at a time, like the HR bar.
  const [openMenu, setOpenMenu] = useState(null)
  const notifRef   = useRef(null)
  const accountRef = useRef(null)
  const waffleRef  = useRef(null)

  const toggle = (name) => setOpenMenu((cur) => (cur === name ? null : name))
  const close  = () => setOpenMenu(null)

  useEffect(() => {
    const handler = (e) => {
      const refs = { notifications: notifRef, account: accountRef, waffle: waffleRef }
      const ref = refs[openMenu]
      if (ref?.current && !ref.current.contains(e.target)) close()
    }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  // The HR bar refetches every time the panel opens; let the app do the same.
  const onNotifOpen = notifications?.onOpen
  useEffect(() => {
    if (openMenu === 'notifications' && onNotifOpen) onNotifOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMenu])

  const sections = (notifications?.sections ?? []).filter((s) => s.items?.length > 0)
  const totalCount = sections.reduce((n, s) => n + (s.total ?? s.items.length), 0)
  const loading = !!notifications?.loading
  const loaded  = notifications?.loaded ?? true

  const nextLang = lang === 'ga' ? 'en' : 'ga'

  return (
    <header className="kst-topbar">
      <div className="kst-left">
        {onMenuToggle && (
          <button type="button" className="kst-menuBtn" onClick={onMenuToggle} aria-label={t('openNav')}>
            ☰
          </button>
        )}
        {brand && (
          <a href={brand.href ?? '/'} className="kst-brand">
            <span className="kst-brandName">{brand.name ?? 'kinia'}</span>
            {brand.sub && <span className="kst-brandSub">{brand.sub}</span>}
          </a>
        )}
        {title && <span className="kst-title">{title}</span>}
      </div>

      <div className="kst-right">
        {onLanguageChange && (
          <button
            type="button"
            className="kst-langBtn"
            onClick={() => onLanguageChange(nextLang)}
            aria-label={t('switchLanguage')}
            title={t('otherLanguage')}
          >
            {t('otherLanguage')}
          </button>
        )}

        {notifications && (
          <div className="kst-menuWrap" ref={notifRef}>
            <button
              type="button"
              className={`kst-notifBtn ${openMenu === 'notifications' ? 'kst-notifBtnActive' : ''}`}
              onClick={() => toggle('notifications')}
              aria-label={t('notifications')}
              aria-expanded={openMenu === 'notifications'}
            >
              <span className="kst-notifIcon" aria-hidden="true">🔔</span>
              <span className="kst-notifLabel">{t('notifications')}</span>
              {totalCount > 0 && <span className="kst-badge">{totalCount}</span>}
            </button>

            {openMenu === 'notifications' && (
              <div className="kst-panel">
                <div className="kst-panelHeader">
                  <span className="kst-panelTitle">{t('notifications')}</span>
                  <div className="kst-panelHeaderActions">
                    {totalCount > 0 && notifications.onClearAll && (
                      <button
                        type="button"
                        className="kst-clearAllBtn"
                        onClick={notifications.onClearAll}
                        disabled={notifications.clearing}
                      >
                        {notifications.clearing ? t('clearing') : t('clearAll')}
                      </button>
                    )}
                    <button type="button" className="kst-panelClose" onClick={close} aria-label={t('close')}>✕</button>
                  </div>
                </div>

                {loading && (
                  <div className="kst-panelLoading">
                    <div className="kst-spinner" /> {t('loading')}
                  </div>
                )}

                {!loading && loaded && totalCount === 0 && (
                  <div className="kst-panelEmpty">✅ {t('allCaughtUp')}</div>
                )}

                {!loading && sections.map((s) => {
                  const more = (s.total ?? s.items.length) - s.items.length
                  return (
                    <div key={s.id} className="kst-section">
                      {s.label && <div className="kst-sectionLabel">{s.label}</div>}
                      {s.items.map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          className="kst-item"
                          onClick={() => { item.onClick?.(); close() }}
                        >
                          <span className={`kst-dot kst-dot-${DOTS.includes(item.colour) ? item.colour : 'purple'}`} />
                          <div className="kst-itemBody">
                            <div className="kst-itemTitle">{item.title}</div>
                            {item.subtitle && <div className="kst-itemSub">{item.subtitle}</div>}
                          </div>
                        </button>
                      ))}
                      {more > 0 && <div className="kst-more">{t('more', { n: more })}</div>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {user && (
          <div className="kst-menuWrap" ref={accountRef}>
            <button
              type="button"
              className={`kst-avatar ${openMenu === 'account' ? 'kst-avatarActive' : ''}`}
              onClick={() => toggle('account')}
              aria-label={t('account')}
              aria-expanded={openMenu === 'account'}
              title={user.name || user.email}
            >
              {initialsOf(user)}
            </button>

            {openMenu === 'account' && (
              <div className="kst-panel kst-accountPanel">
                <div className="kst-acctId">
                  {user.name && <b>{user.name}</b>}
                  {user.email && <span>{user.email}</span>}
                </div>
                {accountNote && <div className="kst-acctNote">{accountNote}</div>}
                {onSignOut && (
                  <>
                    <div className="kst-sep" />
                    <button type="button" className="kst-menuItem" onClick={() => { close(); onSignOut() }}>
                      {t('signOut')}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {apps.length > 0 && (
          <div className="kst-menuWrap" ref={waffleRef}>
            <button
              type="button"
              className={`kst-waffle ${openMenu === 'waffle' ? 'kst-waffleActive' : ''}`}
              onClick={() => toggle('waffle')}
              aria-label={t('switchApp')}
              aria-expanded={openMenu === 'waffle'}
              title={t('switchApp')}
            >
              <span className="kst-waffleGrid">
                {Array.from({ length: 9 }).map((_, i) => <i key={i} />)}
              </span>
            </button>

            {openMenu === 'waffle' && (
              <div className="kst-panel kst-launcher">
                <div className="kst-launcherHead">{t('appsHeading')}</div>
                <div className="kst-launcherGrid">
                  {apps.map((a) => {
                    const soon = a.status === 'soon'
                    return (
                      <button
                        type="button"
                        key={a.id ?? a.url ?? a.name}
                        className={`kst-launchApp ${soon ? 'kst-soon' : ''}`}
                        onClick={() => { if (!soon) { openApp(a); close() } }}
                        disabled={soon}
                        title={soon ? t('comingSoon', { name: a.name }) : t('openApp', { name: a.name })}
                      >
                        <span className={`kst-launchIc kst-${GRADS.includes(a.grad) ? a.grad : 'bg-purple'}`}>{a.icon}</span>
                        <span className="kst-launchNm">{a.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default KiniaTopbar
