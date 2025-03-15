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
      'expo-router/babel'
    ],
  };
  