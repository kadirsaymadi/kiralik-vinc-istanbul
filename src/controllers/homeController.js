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

  contactForOffer: (req, res) => {
    const seoData = {
      seo: {
        title: "Teklif Al - İstanbul Vinç Kiralama | Ücretsiz Fiyat Teklifi",
        description:
          "İstanbul vinç kiralama hizmeti için ücretsiz teklif alın. Profesyonel danışmanlık ve hızlı fiyat hesaplama.",
        keywords: [
          "vinç kiralama teklif",
          "istanbul vinç fiyat",
          "ücretsiz vinç teklifi",
          "vinç kiralama danışmanlık",
        ],
      },
      canonical: seoHelper.generateCanonicalUrl("/teklif-al"),
      ogUrl: seoHelper.generateCanonicalUrl("/teklif-al"),
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("ContactPage", {
      name: "İstanbul Vinç Kiralama Teklif",
      description: "Vinç kiralama hizmeti için ücretsiz teklif alma",
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Teklif Al", url: "/teklif-al" },
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
      currentPath: "/teklif-al",
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

    // Ana sayfalar - En yüksek öncelik
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
      { url: "/teklif-al", priority: "0.8", changefreq: "monthly" },
    ];

    // Vinç detay sayfaları - /vinc/:crane route'u
    const cranePages = equipmentData.equipment
      .filter((eq) => eq.category === "vinç")
      .map((crane) => ({
        url: `/vinc/${crane.slug || crane.id}`,
        priority: "0.7",
        changefreq: "monthly",
      }));

    // Platform detay sayfaları - /kiralik-sepetli-platformlar/:platform route'u
    const platformPages = equipmentData.equipment
      .filter((eq) => eq.category === "sepetli-platform")
      .map((platform) => ({
        url: `/kiralik-sepetli-platformlar/${platform.slug || platform.id}`,
        priority: "0.7",
        changefreq: "monthly",
      }));

    // Forklift detay sayfaları - /kiralik-forkliftler/:forklift route'u
    const forkliftPages = equipmentData.equipment
      .filter((eq) => eq.category === "forklift")
      .map((forklift) => ({
        url: `/kiralik-forkliftler/${forklift.slug || forklift.id}`,
        priority: "0.7",
        changefreq: "monthly",
      }));

    // İlçe sayfaları - Vinç (/kiralik-vinc-:district route'u)
    const districtCranePages = districtsData.districts.map((district) => ({
      url: `/kiralik-vinc-${district.slug}`,
      priority: "0.8",
      changefreq: "weekly",
    }));

    // İlçe sayfaları - Platform (/kiralik-sepetli-platform-:district route'u)
    const districtPlatformPages = districtsData.districts.map((district) => ({
      url: `/kiralik-sepetli-platform-${district.slug}`,
      priority: "0.7",
      changefreq: "weekly",
    }));

    // İlçe sayfaları - Forklift (/kiralik-forklift-:district route'u)
    const districtForkliftPages = districtsData.districts.map((district) => ({
      url: `/kiralik-forklift-${district.slug}`,
      priority: "0.7",
      changefreq: "weekly",
    }));

    // Mahalle sayfaları için slug oluşturma fonksiyonu
    const createSlug = (text) => {
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
      const convertedName = text.replace(
        /[çÇğĞıIöÖşŞüÜ]/g,
        (char) => turkishChars[char] || char
      );
      return convertedName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace("-mahallesi", "");
    };

    // Mahalle sayfaları - Vinç (/kiralik-vinc-:district/:neighborhood route'u)
    const neighborhoodCranePages = [];
    districtsData.districts.forEach((district) => {
      district.neighborhoods.forEach((neighborhood) => {
        const neighborhoodSlug = createSlug(neighborhood);
        neighborhoodCranePages.push({
          url: `/kiralik-vinc-${district.slug}/${neighborhoodSlug}`,
          priority: "0.6",
          changefreq: "monthly",
        });
      });
    });

    // Mahalle sayfaları - Platform (/kiralik-sepetli-platform-:district/:neighborhood route'u)
    const neighborhoodPlatformPages = [];
    districtsData.districts.forEach((district) => {
      district.neighborhoods.forEach((neighborhood) => {
        const neighborhoodSlug = createSlug(neighborhood);
        neighborhoodPlatformPages.push({
          url: `/kiralik-sepetli-platform-${district.slug}/${neighborhoodSlug}`,
          priority: "0.5",
          changefreq: "monthly",
        });
      });
    });

    // Mahalle sayfaları - Forklift (/kiralik-forklift-:district/:neighborhood route'u)
    const neighborhoodForkliftPages = [];
    districtsData.districts.forEach((district) => {
      district.neighborhoods.forEach((neighborhood) => {
        const neighborhoodSlug = createSlug(neighborhood);
        neighborhoodForkliftPages.push({
          url: `/kiralik-forklift-${district.slug}/${neighborhoodSlug}`,
          priority: "0.5",
          changefreq: "monthly",
        });
      });
    });

    // Tüm sayfaları birleştir ve sırala
    const allPages = [
      ...mainPages,
      ...cranePages,
      ...platformPages,
      ...forkliftPages,
      ...districtCranePages,
      ...districtPlatformPages,
      ...districtForkliftPages,
      ...neighborhoodCranePages,
      ...neighborhoodPlatformPages,
      ...neighborhoodForkliftPages,
    ];

    // XML sitemap oluştur
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    sitemap += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
    sitemap += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

    allPages.forEach((page) => {
      sitemap += "  <url>\n";
      sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += "  </url>\n";
    });

    sitemap += "</urlset>";

    res.set("Content-Type", "text/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=86400"); // 24 saat cache
    res.send(sitemap);
  },
};

module.exports = homeController;
