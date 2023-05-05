/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(var(--primary) / <alpha-value>)',
        'primary-container': 'rgb(var(--primary-container) / <alpha-value>)',
        'secondary': 'rgb(var(--secondary) / <alpha-value>)',
        'secondary-container': 'rgb(var(--secondary-container) / <alpha-value>)',
        'tertiary': 'rgb(var(--tertiary) / <alpha-value>)',
        'tertiary-container': 'rgb(var(--tertiary-container) / <alpha-value>)',
        'surface': 'rgb(var(--surface) / <alpha-value>)',
        'surface-variant': 'rgb(var(--surface-variant) / <alpha-value>)',
        'main': 'rgb(var(--main) / <alpha-value>)'
      },
      minHeight: {
        'content': 'calc(100svh - 468px)'
      }
    },
    fontFamily: {
      'nunito': [`'Ubuntu'`, `'Noto Sans TC'`, 'sans-serif', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas']
    }
  },
  plugins: [],
}
