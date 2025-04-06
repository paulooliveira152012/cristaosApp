// app.config.js
import "dotenv/config";

export default {
  expo: {
    name: "Cristãos",
    slug: "cristaos",
    extra: {
      dev: process.env.ENV !== "production",
      API_URL_DEV: process.env.API_URL_DEV,
      API_URL_PROD: process.env.API_URL_PROD
    }
  }
};
