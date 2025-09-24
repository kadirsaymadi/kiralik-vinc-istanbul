const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

const homeRoutes = require("./src/routes/index");
const categoryRoutes = require("./src/routes/categories");
const craneRoutes = require("./src/routes/cranes");
const seoMiddleware = require("./src/middleware/seoMiddleware");

const app = express();
const PORT = process.env.PORT || 2021;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
          "https://fonts.googleapis.com",
        ],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        scriptSrcAttr: ["'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        connectSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://fonts.googleapis.com",
          "https://images.unsplash.com",
        ],
      },
    },
  })
);

app.use(compression());
app.use(cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1d",
    etag: true,
    lastModified: true,
  })
);

app.use(seoMiddleware);

app.use("/", homeRoutes);
app.use("/", categoryRoutes);
app.use("/", craneRoutes);

app.use((req, res, next) => {
  res.status(404).render("pages/404", {
    title: "Sayfa Bulunamadı - İstanbul Vinç Kiralama",
    description: "Aradığınız sayfa bulunamadı. Ana sayfaya dönün.",
    currentPath: req.path,
    districts: [],
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("pages/500", {
    title: "Sunucu Hatası - İstanbul Vinç Kiralama",
    description: "Bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.",
    districts: [],
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
  console.log(`📱 Vinç kiralama sitesi hazır!`);
  console.log(`🐳 Docker container'da çalışıyor`);
});
