import "dotenv/config";

const isDev = process.env.ENV !== "production";

export default {
  expo: {
    name: "Cristãos",
    slug: "cristaos",
    version: "1.0.0",
    extra: {
      apiUrl: isDev
        ? process.env.API_URL_DEV
        : process.env.EXPO_PUBLIC_API_URL || process.env.API_URL_PROD,
      dev: isDev,
    },
  },
};
