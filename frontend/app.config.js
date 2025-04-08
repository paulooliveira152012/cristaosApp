import "dotenv/config";

const isDev = process.env.ENV !== "production";

export default {
  expo: {
    name: "Cristãos",
    slug: "cristaos",
    version: "1.0.0",
    runtimeVersion: {
      policy: "appVersion", // ✅ Adicionado aqui
    },
    updates: {
      url: "https://u.expo.dev/473cdca9-4551-4280-9478-9e4965265ff0", // ✅ Adicionado aqui
    },
    extra: {
      apiUrl: isDev
        ? process.env.API_URL_DEV
        : process.env.EXPO_PUBLIC_API_URL || process.env.API_URL_PROD,
      dev: isDev,
      eas: {
        projectId: "473cdca9-4551-4280-9478-9e4965265ff0", // ✅ ADICIONA AQUI
      },
    },
  },
};
