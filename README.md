# Kinia Shared Nav Bar

The one top bar every Kinia web app uses: language toggle, notifications bell,
account menu and the app launcher (waffle). Its look and behaviour are the HR
Portal's, which is the standard.

## Add it to an app

1. Install a fixed version:

   ```bash
   npm install github:Kinia-Ireland/Shared-Nav-Bar#v1.1.0
   ```

2. Import it once, in your app layout:

   ```jsx
   import { KiniaTopbar } from 'kinia-shared-nav-bar'
   import 'kinia-shared-nav-bar/style.css'
   ```

3. Render it at the top of the page:

   ```jsx
   <KiniaTopbar
     lang={i18n.language}                       // 'en' or 'ga'
     onLanguageChange={(next) => i18n.changeLanguage(next)}
     brand={{ name: 'kinia', sub: 'My App', href: '/' }}
     user={{ name: 'Jane Doe', email: 'jane@kinia.ie' }}
     onSignOut={signOut}
     apps={KINIA_APPS}
   />
   ```

The page also needs the Kinia fonts in `index.html` (most apps already have them):

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

## Props

Every prop is optional. Leave one out and that part of the bar is not shown.

| Prop | What it does |
|---|---|
| `lang` | `'en'` or `'ga'`. The bar's own labels follow it. |
| `onLanguageChange(next)` | Shows the Gaeilge / English button. Called with `'en'` or `'ga'`. |
| `brand` | `{ name, sub, href }`: the kinia logo on the left. For apps with no sidebar. |
| `title` | Page name on the left. |
| `onMenuToggle` | Shows the ☰ button on mobile. For apps with a sidebar. |
| `user` + `onSignOut` | Shows the avatar and account menu with Sign out. For apps with no sidebar. |
| `accountNote` | A short line shown in the account menu (for example, demo mode). |
| `apps` | App launcher tiles: `[{ id, name, icon, grad, status, url }]`. `grad` is `bg-purple` / `bg-blue` / `bg-teal` / `bg-amber` / `bg-green` / `bg-red`; `status` is `live` or `soon`. |
| `notifications` | Shows the bell. See below. |

### Notifications

```js
notifications={{
  loading: false,
  onOpen: refetch,             // called each time the panel opens
  onClearAll: clearAll,        // shows "Clear all"
  clearing: false,
  sections: [{
    id: 'leave',
    label: 'Awaiting approval',
    total: 7,                  // optional; shows "+2 more" when greater than items.length
    items: [{ id, title, subtitle, colour: 'amber', onClick }],   // colour: red | amber | purple | green
  }],
}}
```

The badge count is the sum of every section's `total` (or its item count).
Pass `count` alongside `sections` to set the badge yourself, for a section that
sums up several records in one line.

## Changing the bar

1. Edit `src/`, then run `npm run build`. Commit `dist/` as well, because apps
   install the built files.
2. Bump `version` in `package.json`, commit, and tag it (`git tag v1.1.0`), then push the tag.
3. In each app, change `#v1.1.0` to the new tag and run `npm install`. Apps
   only change when you upgrade them.

To try a change in an app before releasing it, run `npm run pack:local` here
and `npm install <path to>/kinia-shared-nav-bar-<version>.tgz` in the app.

Every class is prefixed `kst-`, and the colours are `--kst-*` variables on
`.kst-topbar`, so the bar never picks up or changes an app's own styles.
