module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '~': './src',
          specs: './specs',
          'api-client': './api-client',
        },
      },
    ],
    'react-native-unistyles/plugin',
    'react-native-reanimated/plugin',
  ],
};
