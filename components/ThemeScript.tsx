/**
 * Synchronous theme bootstrap.
 *
 * Rendered before the app hydrates so the saved theme is applied to <html>
 * before first paint — no flash of light mode, no hydration mismatch thanks to
 * `suppressHydrationWarning` on the root <html>.
 */
const SCRIPT = `
(function () {
  try {
    var KEY = 'budayakita-theme';
    var LEGACY_THEME = 'budayakita:theme';
    var LEGACY_CONTRAST = 'budayakita:high-contrast';
    var stored = localStorage.getItem(KEY);
    var theme;

    if (stored === 'light' || stored === 'dark' || stored === 'high-contrast') {
      theme = stored;
    } else if (localStorage.getItem(LEGACY_CONTRAST) === 'true') {
      theme = 'high-contrast';
    } else {
      var legacy = localStorage.getItem(LEGACY_THEME);
      if (legacy === 'dark' || legacy === 'light') {
        theme = legacy;
      } else {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
    }

    var html = document.documentElement;
    html.classList.remove('light', 'dark', 'high-contrast', 'hc');
    if (theme === 'dark') {
      html.classList.add('dark');
    } else if (theme === 'high-contrast') {
      html.classList.add('high-contrast', 'hc');
    } else {
      html.classList.add('light');
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
