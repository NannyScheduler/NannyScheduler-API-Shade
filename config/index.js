const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";
const port = process.env.PORT || 5500;

module.exports = {
  env,
  port,
  pgdburl: process.env.DATABASE_URL,
  origin: [
    // "https://cookies-git-master.ladrillo.now.sh",
    // "https://cookies-liart-five.now.sh",
    // "https://cookies.ladrillo.now.sh",
    // "http://localhost:3000"
  ],
  secure: isProduction
};
