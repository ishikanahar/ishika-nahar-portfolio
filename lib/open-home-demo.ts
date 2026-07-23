/** Open a homepage demo tab and scroll to it. Next.js hash Links are unreliable on same-page. */
export type HomeDemoId =
  | 'sternson'
  | 'luveo'
  | 'owkin'
  | 'momentum'
  | 'style'
  | 'skillsoft'

export const OPEN_HOME_DEMO_EVENT = 'open-home-demo'

export function openHomeDemo(hash: HomeDemoId) {
  const full = `#demos-${hash}`
  if (typeof window === 'undefined') return

  if (window.location.pathname !== '/') {
    window.location.assign(`/${full}`)
    return
  }

  if (window.location.hash !== full) {
    window.history.pushState(null, '', full)
  }

  window.dispatchEvent(
    new CustomEvent(OPEN_HOME_DEMO_EVENT, { detail: { demo: hash } }),
  )
  // Keep hashchange listeners in sync (bookmark / back-forward)
  window.dispatchEvent(new Event('hashchange'))

  requestAnimationFrame(() => {
    document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
