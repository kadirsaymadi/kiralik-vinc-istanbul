const fs = require("fs");
const path = require("path");
const seoHelper = require("../utils/seoHelper");
const appConfig = require("../config/appConfig");

const equipmentData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/cranes.json"), "utf8")
);
const districtsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/districts.json"), "utf8")
);

const homeController = {
  index: (req, res) => {
    const featuredCranes = equipmentData.equipment
      .filter((eq) => eq.category === "vinç")
      .slice(0, 6);
    const popularDistricts = districtsData.districts.slice(0, 8);

    const seoData = {
      seo: {
        title: appConfig.seo.defaultTitle,
        description: appConfig.seo.defaultDescription,
        keywords: appConfig.seo.defaultKeywords,
      },
      canonical: "/",
      ogUrl: "/",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: appConfig.site.name,
      description: appConfig.site.description,
    });

    res.render("pages/home", {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      canonical: metaTags.canonical,
      ogTitle: metaTags.ogTitle,
      ogDescription: metaTags.ogDescription,
      ogImage: metaTags.ogImage,
      ogUrl: metaTags.ogUrl,
      structuredData: JSON.stringify(structuredData),
      featuredCranes,
      popularDistricts,
      districts: districtsData.districts,
      currentPath: "/",
    });
  },

  craneList: (req, res) => {
    const cranes = equipmentData.equipment.filter(
      (eq) => eq.category === "vinç"
    );

    const seoData = {
      seo: {
        title: "Kiralık Vinçler - İstanbul Vinç Kiralama | Tüm Modeller",
        description:
          "İstanbul'da kiralık vinç modelleri. 25 ton'dan 350 ton'a kadar mobil ve sabit vinç kiralama hizmeti. Ücretsiz teklif alın.",
        keywords: [
          "kiralık vinçler",
          "istanbul vinç kiralama",
          "mobil vinç kiralama",
          "sabit vinç kiralama",
          "vinç modelleri",
        ],
      },
      canonical: "/kiralik-vincler",
      ogUrl: "/kiralik-vincler",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: "İstanbul Vinç Kiralama - Tüm Modeller",
      description: "İstanbul'da profesyonel vinç kiralama hizmeti",
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Kiralık Vinçler", url: "/kiralik-vincler" },
    ];

    res.render("pages/crane-list", {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      canonical: metaTags.canonical,
      ogTitle: metaTags.ogTitle,
      ogDescription: metaTags.ogDescription,
      ogImage: metaTags.ogImage,
      ogUrl: metaTags.ogUrl,
      structuredData: JSON.stringify(structuredData),
      breadcrumbSchema: JSON.stringify(
        seoHelper.generateBreadcrumbSchema(breadcrumbs)
      ),
      cranes,
      districts: districtsData.districts,
      currentPath: "/kiralik-vincler",
    });
  },

  contact: (req, res) => {
    const seoData = {
      seo: {
        title: "İletişim - İstanbul Vinç Kiralama | Teklif Al",
        description:
          "İstanbul vinç kiralama hizmeti için iletişime geçin. Ücretsiz teklif alın, profesyonel danışmanlık hizmeti.",
        keywords: [
          "vinç kiralama iletişim",
          "istanbul vinç teklif",
          "vinç kiralama telefon",
          "vinç kiralama adres",
        ],
      },
      canonical: "/iletisim",
      ogUrl: "/iletisim",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("ContactPage", {
      name: "İstanbul Vinç Kiralama İletişim",
      description: "Vinç kiralama hizmeti için iletişim bilgileri",
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "İletişim", url: "/iletisim" },
    ];

    res.render("pages/contact", {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      canonical: metaTags.canonical,
      ogTitle: metaTags.ogTitle,
      ogDescription: metaTags.ogDescription,
      ogImage: metaTags.ogImage,
      ogUrl: metaTags.ogUrl,
      structuredData: JSON.stringify(structuredData),
      breadcrumbSchema: JSON.stringify(
        seoHelper.generateBreadcrumbSchema(breadcrumbs)
      ),
      districts: districtsData.districts,
      currentPath: "/iletisim",
    });
  },

  districts: (req, res) => {
    const seoData = {
      seo: {
        title: "İstanbul Hizmet Bölgeleri - Vinç Kiralama Hizmetleri",
        description:
          "İstanbul'un tüm ilçelerinde profesyonel vinç kiralama hizmeti. Beyoğlu, Kadıköy, Şişli ve diğer ilçelerde hızlı teslimat.",
        keywords: [
          "istanbul ilçeleri vinç kiralama",
          "beyoğlu vinç kiralama",
          "kadıköy vinç kiralama",
          "şişli vinç kiralama",
          "beşiktaş vinç kiralama",
        ],
      },
      canonical: "/hizmet-bolgeleri",
      ogUrl: "/hizmet-bolgeleri",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: "İstanbul İlçeleri Vinç Kiralama",
      description:
        "İstanbul'un tüm ilçelerinde profesyonel vinç kiralama hizmeti",
      url: `${appConfig.site.url}/hizmet-bolgeleri`,
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Hizmet Bölgeleri", url: "/hizmet-bolgeleri" },
    ];

    res.render("pages/districts", {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      canonical: metaTags.canonical,
      ogTitle: metaTags.ogTitle,
      ogDescription: metaTags.ogDescription,
      ogImage: metaTags.ogImage,
      ogUrl: metaTags.ogUrl,
      structuredData: JSON.stringify(structuredData),
      breadcrumbSchema: JSON.stringify(
        seoHelper.generateBreadcrumbSchema(breadcrumbs)
      ),
      districts: districtsData.districts,
      currentPath: "/hizmet-bolgeleri",
    });
  },
};

module.exports = homeController;
