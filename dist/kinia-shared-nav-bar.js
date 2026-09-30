import { jsxs as l, jsx as a, Fragment as $ } from "react/jsx-runtime";
import { useState as I, useRef as f, useEffect as G } from "react";
const A = {
  en: {
    openNav: "Open navigation",
    notifications: "Notifications",
    loading: "Loading…",
    clearAll: "Clear all",
    clearing: "Clearing…",
    allCaughtUp: "You're all caught up — no actions needed.",
    close: "Close",
    more: "+{{n}} more",
    switchApp: "Switch app",
    appsHeading: "Kinia apps",
    openApp: "Open {{name}}",
    comingSoon: "{{name}} — coming soon",
    account: "Account",
    signOut: "Sign out",
    switchLanguage: "Switch language",
    // The button names the language you would switch TO.
    otherLanguage: "Gaeilge"
  },
  ga: {
    openNav: "Oscail nascleanúint",
    notifications: "Fógraí",
    loading: "Ag lódáil…",
    clearAll: "Glan gach ceann",
    clearing: "Ag glanadh…",
    allCaughtUp: "Tá tú suas chun dáta — níl aon ghníomhartha ag teastáil.",
    close: "Dún",
    more: "+{{n}} eile",
    switchApp: "Athraigh aip",
    appsHeading: "Aipeanna Kinia",
    openApp: "Oscail {{name}}",
    comingSoon: "{{name}} — ag teacht go luath",
    account: "Cuntas",
    signOut: "Sínigh amach",
    switchLanguage: "Athraigh teanga",
    otherLanguage: "English"
  }
}, T = (c, r, p = {}) => ((A[c] ?? A.en)[r] ?? A.en[r] ?? r).replace(/\{\{(\w+)\}\}/g, (s, d) => p[d] ?? ""), U = ["bg-purple", "bg-blue", "bg-teal", "bg-amber", "bg-green", "bg-red"], K = ["red", "amber", "purple", "green"], D = (c) => window.open(c.url, "_blank", "noopener,noreferrer"), W = (c) => {
  const r = ((c == null ? void 0 : c.name) || (c == null ? void 0 : c.email) || "").trim();
  if (!r) return "?";
  const p = r.split(/[\s@.]+/).filter(Boolean);
  return p.length > 1 && (c != null && c.name) ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : r[0].toUpperCase();
}, F = ({
  lang: c = "en",
  onLanguageChange: r,
  title: p,
  brand: m,
  onMenuToggle: k,
  notifications: s,
  user: d,
  onSignOut: w,
  accountNote: C,
  apps: y = []
}) => {
  const t = (e, n) => T(c, e, n), [i, L] = I(null), S = f(null), O = f(null), E = f(null), N = (e) => L((n) => n === e ? null : e), h = () => L(null);
  G(() => {
    const e = (o) => {
      const g = { notifications: S, account: O, waffle: E }[i];
      g != null && g.current && !g.current.contains(o.target) && h();
    }, n = (o) => {
      o.key === "Escape" && h();
    };
    return document.addEventListener("mousedown", e), document.addEventListener("keydown", n), () => {
      document.removeEventListener("mousedown", e), document.removeEventListener("keydown", n);
    };
  }, [i]);
  const x = s == null ? void 0 : s.onOpen;
  G(() => {
    i === "notifications" && x && x();
  }, [i]);
  const B = ((s == null ? void 0 : s.sections) ?? []).filter((e) => {
    var n;
    return ((n = e.items) == null ? void 0 : n.length) > 0;
  }), u = B.reduce((e, n) => e + (n.total ?? n.items.length), 0), b = !!(s != null && s.loading), H = (s == null ? void 0 : s.loaded) ?? !0, R = c === "ga" ? "en" : "ga";
  return /* @__PURE__ */ l("header", { className: "kst-topbar", children: [
    /* @__PURE__ */ l("div", { className: "kst-left", children: [
      k && /* @__PURE__ */ a("button", { type: "button", className: "kst-menuBtn", onClick: k, "aria-label": t("openNav"), children: "☰" }),
      m && /* @__PURE__ */ l("a", { href: m.href ?? "/", className: "kst-brand", children: [
        /* @__PURE__ */ a("span", { className: "kst-brandName", children: m.name ?? "kinia" }),
        m.sub && /* @__PURE__ */ a("span", { className: "kst-brandSub", children: m.sub })
      ] }),
      p && /* @__PURE__ */ a("span", { className: "kst-title", children: p })
    ] }),
    /* @__PURE__ */ l("div", { className: "kst-right", children: [
      r && /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: "kst-langBtn",
          onClick: () => r(R),
          "aria-label": t("switchLanguage"),
          title: t("otherLanguage"),
          children: t("otherLanguage")
        }
      ),
      s && /* @__PURE__ */ l("div", { className: "kst-menuWrap", ref: S, children: [
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `kst-notifBtn ${i === "notifications" ? "kst-notifBtnActive" : ""}`,
            onClick: () => N("notifications"),
            "aria-label": t("notifications"),
            "aria-expanded": i === "notifications",
            children: [
              /* @__PURE__ */ a("span", { className: "kst-notifIcon", "aria-hidden": "true", children: "🔔" }),
              /* @__PURE__ */ a("span", { className: "kst-notifLabel", children: t("notifications") }),
              u > 0 && /* @__PURE__ */ a("span", { className: "kst-badge", children: u })
            ]
          }
        ),
        i === "notifications" && /* @__PURE__ */ l("div", { className: "kst-panel", children: [
          /* @__PURE__ */ l("div", { className: "kst-panelHeader", children: [
            /* @__PURE__ */ a("span", { className: "kst-panelTitle", children: t("notifications") }),
            /* @__PURE__ */ l("div", { className: "kst-panelHeaderActions", children: [
              u > 0 && s.onClearAll && /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  className: "kst-clearAllBtn",
                  onClick: s.onClearAll,
                  disabled: s.clearing,
                  children: s.clearing ? t("clearing") : t("clearAll")
                }
              ),
              /* @__PURE__ */ a("button", { type: "button", className: "kst-panelClose", onClick: h, "aria-label": t("close"), children: "✕" })
            ] })
          ] }),
          b && /* @__PURE__ */ l("div", { className: "kst-panelLoading", children: [
            /* @__PURE__ */ a("div", { className: "kst-spinner" }),
            " ",
            t("loading")
          ] }),
          !b && H && u === 0 && /* @__PURE__ */ l("div", { className: "kst-panelEmpty", children: [
            "✅ ",
            t("allCaughtUp")
          ] }),
          !b && B.map((e) => {
            const n = (e.total ?? e.items.length) - e.items.length;
            return /* @__PURE__ */ l("div", { className: "kst-section", children: [
              e.label && /* @__PURE__ */ a("div", { className: "kst-sectionLabel", children: e.label }),
              e.items.map((o) => /* @__PURE__ */ l(
                "button",
                {
                  type: "button",
                  className: "kst-item",
                  onClick: () => {
                    var v;
                    (v = o.onClick) == null || v.call(o), h();
                  },
                  children: [
                    /* @__PURE__ */ a("span", { className: `kst-dot kst-dot-${K.includes(o.colour) ? o.colour : "purple"}` }),
                    /* @__PURE__ */ l("div", { className: "kst-itemBody", children: [
                      /* @__PURE__ */ a("div", { className: "kst-itemTitle", children: o.title }),
                      o.subtitle && /* @__PURE__ */ a("div", { className: "kst-itemSub", children: o.subtitle })
                    ] })
                  ]
                },
                o.id
              )),
              n > 0 && /* @__PURE__ */ a("div", { className: "kst-more", children: t("more", { n }) })
            ] }, e.id);
          })
        ] })
      ] }),
      d && /* @__PURE__ */ l("div", { className: "kst-menuWrap", ref: O, children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: `kst-avatar ${i === "account" ? "kst-avatarActive" : ""}`,
            onClick: () => N("account"),
            "aria-label": t("account"),
            "aria-expanded": i === "account",
            title: d.name || d.email,
            children: W(d)
          }
        ),
        i === "account" && /* @__PURE__ */ l("div", { className: "kst-panel kst-accountPanel", children: [
          /* @__PURE__ */ l("div", { className: "kst-acctId", children: [
            d.name && /* @__PURE__ */ a("b", { children: d.name }),
            d.email && /* @__PURE__ */ a("span", { children: d.email })
          ] }),
          C && /* @__PURE__ */ a("div", { className: "kst-acctNote", children: C }),
          w && /* @__PURE__ */ l($, { children: [
            /* @__PURE__ */ a("div", { className: "kst-sep" }),
            /* @__PURE__ */ a("button", { type: "button", className: "kst-menuItem", onClick: () => {
              h(), w();
            }, children: t("signOut") })
          ] })
        ] })
      ] }),
      y.length > 0 && /* @__PURE__ */ l("div", { className: "kst-menuWrap", ref: E, children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: `kst-waffle ${i === "waffle" ? "kst-waffleActive" : ""}`,
            onClick: () => N("waffle"),
            "aria-label": t("switchApp"),
            "aria-expanded": i === "waffle",
            title: t("switchApp"),
            children: /* @__PURE__ */ a("span", { className: "kst-waffleGrid", children: Array.from({ length: 9 }).map((e, n) => /* @__PURE__ */ a("i", {}, n)) })
          }
        ),
        i === "waffle" && /* @__PURE__ */ l("div", { className: "kst-panel kst-launcher", children: [
          /* @__PURE__ */ a("div", { className: "kst-launcherHead", children: t("appsHeading") }),
          /* @__PURE__ */ a("div", { className: "kst-launcherGrid", children: y.map((e) => {
            const n = e.status === "soon";
            return /* @__PURE__ */ l(
              "button",
              {
                type: "button",
                className: `kst-launchApp ${n ? "kst-soon" : ""}`,
                onClick: () => {
                  n || (D(e), h());
                },
                disabled: n,
                title: n ? t("comingSoon", { name: e.name }) : t("openApp", { name: e.name }),
                children: [
                  /* @__PURE__ */ a("span", { className: `kst-launchIc kst-${U.includes(e.grad) ? e.grad : "bg-purple"}`, children: e.icon }),
                  /* @__PURE__ */ a("span", { className: "kst-launchNm", children: e.name })
                ]
              },
              e.id ?? e.url ?? e.name
            );
          }) })
        ] })
      ] })
    ] })
  ] });
};
export {
  F as KiniaTopbar,
  A as STRINGS
};
