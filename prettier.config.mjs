/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120,
  tabWidth: 4,
  useTabs: true,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
  bracketSameLine: true,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  importOrder: ['^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
};

export default config;
