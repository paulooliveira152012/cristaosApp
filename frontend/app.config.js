import "dotenv/config";

export default {
  expo: {
    name: "Cristãos",
    slug: "cristaos",
    version: "1.0.0",
    extra: {
      // 🔍 Define se está em dev ou produção
      dev: process.env.ENV !== "production",

      // 🔗 API que será usada no app (com fallback automático)
      apiUrl:
        process.env.ENV !== "production"
          ? process.env.API_URL_DEV
          : process.env.API_URL_PROD,

      // 🔧 EAS project
      eas: {
        projectId: "473cdca9-4551-4280-9478-9e4965265ff0",
      },
    },
  },
};
