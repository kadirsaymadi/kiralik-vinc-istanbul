const appConfig = require("../config/appConfig");

const seoMiddleware = (req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.baseUrl = req.protocol + "://" + req.get("host");
  res.locals.fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.locals.siteConfig = appConfig;

  // SEO meta tags
  res.locals.seo = {
    title: appConfig.seo.defaultTitle,
    description: appConfig.seo.defaultDescription,
    keywords: appConfig.seo.defaultKeywords,
    canonical: req.protocol + "://" + req.get("host") + req.path,
    ogTitle: appConfig.site.name,
    ogDescription: appConfig.seo.defaultDescription,
    ogImage: "/images/og-image.jpg",
    ogUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
    ogType: "website",
    ogSiteName: appConfig.site.name,
    ogLocale: "tr_TR",
    twitterCard: "summary_large_image",
    twitterSite: "@kiralikvincistanbul",
    twitterCreator: "@kiralikvincistanbul",
  };

  // JSON-LD structured data için global data
  res.locals.structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: appConfig.site.name,
    url: appConfig.site.url,
    logo: `${req.protocol}://${req.get("host")}/images/logo.png`,
    description: appConfig.site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: appConfig.contact.phone,
      contactType: "customer service",
      availableLanguage: "Turkish",
      areaServed: {
        "@type": "Country",
        name: "TR",
      },
      hoursAvailable: "24/7",
    },
    sameAs: [
      appConfig.social.facebook,
      appConfig.social.instagram,
      appConfig.social.linkedin,
    ],
  };

  next();
};

module.exports = seoMiddleware;
