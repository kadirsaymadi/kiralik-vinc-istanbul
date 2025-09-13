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
      canonical: seoHelper.generateCanonicalUrl("/"),
      ogUrl: seoHelper.generateCanonicalUrl("/"),
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("WebSite", {
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
      siteConfig: appConfig,
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
      canonical: seoHelper.generateCanonicalUrl("/kiralik-vincler"),
      ogUrl: seoHelper.generateCanonicalUrl("/kiralik-vincler"),
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
      siteConfig: appConfig,
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
      canonical: seoHelper.generateCanonicalUrl("/iletisim"),
      ogUrl: seoHelper.generateCanonicalUrl("/iletisim"),
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
      siteConfig: appConfig,
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
      canonical: seoHelper.generateCanonicalUrl("/hizmet-bolgeleri"),
      ogUrl: seoHelper.generateCanonicalUrl("/hizmet-bolgeleri"),
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
      siteConfig: appConfig,
    });
  },

  sitemap: (req, res) => {
    const baseUrl = "https://kiralikvincistanbul.com";
    const currentDate = new Date().toISOString().split("T")[0];

    // Ana sayfalar
    const mainPages = [
      { url: "/", priority: "1.0", changefreq: "daily" },
      { url: "/hizmet-bolgeleri", priority: "0.9", changefreq: "weekly" },
      { url: "/kiralik-vincler", priority: "0.9", changefreq: "weekly" },
      {
        url: "/kiralik-sepetli-platformlar",
        priority: "0.9",
        changefreq: "weekly",
      },
      { url: "/kiralik-forkliftler", priority: "0.9", changefreq: "weekly" },
      { url: "/iletisim", priority: "0.8", changefreq: "monthly" },
    ];

    // Vinç detay sayfaları
    const cranePages = equipmentData.equipment
      .filter((eq) => eq.category === "vinç")
      .map((crane) => ({
        url: `/vinc/${crane.slug}`,
        priority: "0.7",
        changefreq: "monthly",
      }));

    // Platform detay sayfaları
    const platformPages = equipmentData.equipment
      .filter((eq) => eq.category === "sepetli-platform")
      .map((platform) => ({
        url: `/kiralik-sepetli-platformlar/${platform.id}-kiralama`,
        priority: "0.7",
        changefreq: "monthly",
      }));

    // Forklift detay sayfaları
    const forkliftPages = equipmentData.equipment
      .filter((eq) => eq.category === "forklift")
      .map((forklift) => ({
        url: `/kiralik-forkliftler/${forklift.id}-kiralama`,
        priority: "0.7",
        changefreq: "monthly",
      }));

    // İlçe sayfaları
    const districtPages = districtsData.districts.map((district) => ({
      url: `/kiralik-vinc-${district.slug}`,
      priority: "0.6",
      changefreq: "monthly",
    }));

    // İlçe platform sayfaları
    const districtPlatformPages = districtsData.districts.map((district) => ({
      url: `/kiralik-sepetli-platform-${district.slug}`,
      priority: "0.6",
      changefreq: "monthly",
    }));

    // İlçe forklift sayfaları
    const districtForkliftPages = districtsData.districts.map((district) => ({
      url: `/kiralik-forklift-${district.slug}`,
      priority: "0.6",
      changefreq: "monthly",
    }));

    // Mahalle sayfaları
    const neighborhoodPages = [];
    districtsData.districts.forEach((district) => {
      district.neighborhoods.forEach((neighborhood) => {
        const turkishChars = {
          ç: "c",
          Ç: "C",
          ğ: "g",
          Ğ: "G",
          ı: "i",
          I: "I",
          ö: "o",
          Ö: "O",
          ş: "s",
          Ş: "S",
          ü: "u",
          Ü: "U",
        };
        const convertedName = neighborhood.replace(
          /[çÇğĞıIöÖşŞüÜ]/g,
          (char) => turkishChars[char] || char
        );
        const neighborhoodSlug = convertedName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .replace("-mahallesi", "");

        neighborhoodPages.push({
          url: `/kiralik-vinc-${district.slug}/${neighborhoodSlug}`,
          priority: "0.5",
          changefreq: "monthly",
        });
      });
    });

    // Tüm sayfaları birleştir
    const allPages = [
      ...mainPages,
      ...cranePages,
      ...platformPages,
      ...forkliftPages,
      ...districtPages,
      ...districtPlatformPages,
      ...districtForkliftPages,
      ...neighborhoodPages,
    ];

    // XML sitemap oluştur
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allPages.forEach((page) => {
      sitemap += "  <url>\n";
      sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += "  </url>\n";
    });

    sitemap += "</urlset>";

    res.set("Content-Type", "text/xml");
    res.send(sitemap);
  },
};

module.exports = homeController;
