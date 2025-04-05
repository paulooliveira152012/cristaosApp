// module.exports = {
//   presets: ['babel-preset-expo'],
//   plugins: [
//     [
//       'module-resolver',
//       {
//         root: ['./'],
//         alias: {
//           "@": "./app",
//           "components": "./app/components"
//         },
//       },
//     ],
//   ],
// };

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          "@": "./app",
          "components": "./app/components"
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
