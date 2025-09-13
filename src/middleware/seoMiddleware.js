const appConfig = require("../config/appConfig");

const seoMiddleware = (req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.baseUrl = req.protocol + "://" + req.get("host");
  res.locals.fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.locals.siteConfig = appConfig;

  res.locals.seo = {
    title: appConfig.seo.defaultTitle,
    description: appConfig.seo.defaultDescription,
    keywords: appConfig.seo.defaultKeywords,
    canonical: req.protocol + "://" + req.get("host") + req.path,
    ogTitle: appConfig.site.name,
    ogDescription: appConfig.seo.defaultDescription,
    ogImage: "/images/og-image.jpg",
    ogUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
  };

  next();
};

module.exports = seoMiddleware;
