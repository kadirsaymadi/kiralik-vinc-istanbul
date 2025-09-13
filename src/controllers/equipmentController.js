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

const equipmentController = {
  platforms: (req, res) => {
    const availablePlatforms = equipmentData.equipment.filter(
      (equipment) =>
        equipment.availability && equipment.category === "sepetli-platform"
    );

    const seoData = {
      seo: {
        title:
          "Sepetli Platform Modelleri - İstanbul Sepetli Platform Kiralama | Tüm Platform Çeşitleri",
        description:
          "İstanbul'da kiralık sepetli platform modelleri. 10 metre'den 100 metre'ye kadar sepetli platform çeşitleri. Detaylı özellikler ve görseller.",
        keywords: [
          "sepetli platform modelleri",
          "kiralık sepetli platform",
          "sepetli platform çeşitleri",
          "istanbul sepetli platform kiralama",
        ],
      },
      canonical: "/kiralik-sepetli-platformlar",
      ogUrl: "/kiralik-sepetli-platformlar",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: "İstanbul Sepetli Platform Kiralama",
      description:
        "İstanbul'da kiralık sepetli platform modelleri ve çeşitleri",
      areaServed: { "@type": "City", name: "İstanbul" },
      serviceType: "Sepetli Platform Kiralama",
      provider: {
        "@type": "Organization",
        name: "İstanbul Vinç Kiralama",
        url: "https://kiralikvincistanbul.com",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
      },
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Sepetli Platformlar", url: "/kiralik-sepetli-platformlar" },
    ];

    res.render("pages/platforms", {
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
      platforms: availablePlatforms,
      districts: districtsData.districts,
      currentPath: "/kiralik-sepetli-platformlar",
    });
  },

  forklifts: (req, res) => {
    const availableForklifts = equipmentData.equipment.filter(
      (equipment) => equipment.availability && equipment.category === "forklift"
    );

    const seoData = {
      seo: {
        title:
          "Forklift Modelleri - İstanbul Forklift Kiralama | Tüm Forklift Çeşitleri",
        description:
          "İstanbul'da kiralık forklift modelleri. 1.5 ton'dan 7 ton'a kadar forklift çeşitleri. Detaylı özellikler ve görseller.",
        keywords: [
          "forklift modelleri",
          "kiralık forklift",
          "forklift çeşitleri",
          "istanbul forklift kiralama",
        ],
      },
      canonical: "/kiralik-forkliftler",
      ogUrl: "/kiralik-forkliftler",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: "İstanbul Forklift Kiralama",
      description: "İstanbul'da kiralık forklift modelleri ve çeşitleri",
      areaServed: { "@type": "City", name: "İstanbul" },
      serviceType: "Forklift Kiralama",
      provider: {
        "@type": "Organization",
        name: "İstanbul Vinç Kiralama",
        url: "https://kiralikvincistanbul.com",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
      },
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Forkliftler", url: "/kiralik-forkliftler" },
    ];

    res.render("pages/forklifts", {
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
      forklifts: availableForklifts,
      districts: districtsData.districts,
      currentPath: "/kiralik-forkliftler",
    });
  },

  districtPlatforms: (req, res) => {
    const districtSlug = req.params.district;
    const district = districtsData.districts.find(
      (d) => d.slug === districtSlug
    );

    if (!district) {
      return res.status(404).render("pages/404", {
        title: "İlçe Bulunamadı",
        description: "Aradığınız ilçe bulunamadı",
        currentPath: "/hizmet-bolgeleri",
      });
    }

    const availablePlatforms = equipmentData.equipment.filter(
      (equipment) =>
        equipment.availability && equipment.category === "sepetli-platform"
    );

    const seoData = {
      seo: {
        title: `${district.name} Sepetli Platform Kiralama - İstanbul Sepetli Platform Hizmetleri`,
        description: `${district.name} ilçesinde profesyonel sepetli platform kiralama hizmeti. 10 metre'den 100 metre'ye kadar sepetli platform çeşitleri.`,
        keywords: [
          `${district.name} sepetli platform kiralama`,
          "sepetli platform modelleri",
          "istanbul sepetli platform",
          `${district.name} platform hizmetleri`,
        ],
      },
      canonical: `/kiralik-sepetli-platform-${district.slug}`,
      ogUrl: `/kiralik-sepetli-platform-${district.slug}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: `${district.name} Sepetli Platform Kiralama`,
      description: `${district.name} ilçesinde profesyonel sepetli platform kiralama hizmeti`,
      areaServed: { "@type": "City", name: "İstanbul" },
      serviceType: "Sepetli Platform Kiralama",
      provider: {
        "@type": "Organization",
        name: "İstanbul Vinç Kiralama",
        url: "https://kiralikvincistanbul.com",
      },
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Hizmet Bölgeleri", url: "/hizmet-bolgeleri" },
      {
        name: `${district.name} Sepetli Platformlar`,
        url: `/kiralik-sepetli-platform-${district.slug}`,
      },
    ];

    res.render("pages/district-platforms", {
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
      district,
      platforms: availablePlatforms,
      districts: districtsData.districts,
      currentPath: `/kiralik-sepetli-platform-${district.slug}`,
    });
  },

  neighborhoodPlatforms: (req, res) => {
    const districtSlug = req.params.district;
    const neighborhoodSlug = req.params.neighborhood;

    const district = districtsData.districts.find(
      (d) => d.slug === districtSlug
    );

    if (!district) {
      return res.status(404).render("pages/404", {
        title: "İlçe Bulunamadı",
        description: "Aradığınız ilçe bulunamadı",
        currentPath: "/hizmet-bolgeleri",
      });
    }

    const neighborhood = district.neighborhoods.find((n) => {
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

      const convertedName = n.replace(
        /[çÇğĞıIöÖşŞüÜ]/g,
        (char) => turkishChars[char] || char
      );
      const slug = convertedName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace("-mahallesi", "");
      return slug === neighborhoodSlug;
    });

    if (!neighborhood) {
      return res.status(404).render("pages/404", {
        title: "Mahalle Bulunamadı",
        description: "Aradığınız mahalle bulunamadı",
        currentPath: `/kiralik-sepetli-platform-${district.slug}`,
      });
    }

    const availablePlatforms = equipmentData.equipment.filter(
      (equipment) =>
        equipment.availability && equipment.category === "sepetli-platform"
    );

    const seoData = {
      seo: {
        title: `${neighborhood} Sepetli Platform Kiralama - ${district.name} İlçesi`,
        description: `${district.name} ilçesi ${neighborhood} mahallesinde profesyonel sepetli platform kiralama hizmeti.`,
        keywords: [
          `${neighborhood} sepetli platform kiralama`,
          `${district.name} sepetli platform`,
          "istanbul sepetli platform",
          `${neighborhood} platform hizmetleri`,
        ],
      },
      canonical: `/kiralik-sepetli-platform-${district.slug}/${neighborhoodSlug}`,
      ogUrl: `/kiralik-sepetli-platform-${district.slug}/${neighborhoodSlug}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: `${neighborhood} Sepetli Platform Kiralama`,
      description: `${district.name} ilçesi ${neighborhood} mahallesinde profesyonel sepetli platform kiralama hizmeti`,
      areaServed: { "@type": "City", name: "İstanbul" },
      serviceType: "Sepetli Platform Kiralama",
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Hizmet Bölgeleri", url: "/hizmet-bolgeleri" },
      {
        name: `${district.name} Sepetli Platformlar`,
        url: `/kiralik-sepetli-platform-${district.slug}`,
      },
      {
        name: `${neighborhood} Sepetli Platformlar`,
        url: `/kiralik-sepetli-platform-${district.slug}/${neighborhoodSlug}`,
      },
    ];

    res.render("pages/neighborhood-platforms", {
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
      district,
      neighborhood,
      platforms: availablePlatforms,
      districts: districtsData.districts,
      currentPath: `/kiralik-sepetli-platform-${district.slug}/${neighborhoodSlug}`,
    });
  },

  districtForklifts: (req, res) => {
    const districtSlug = req.params.district;
    const district = districtsData.districts.find(
      (d) => d.slug === districtSlug
    );

    if (!district) {
      return res.status(404).render("pages/404", {
        title: "İlçe Bulunamadı",
        description: "Aradığınız ilçe bulunamadı",
        currentPath: "/hizmet-bolgeleri",
      });
    }

    const availableForklifts = equipmentData.equipment.filter(
      (equipment) => equipment.availability && equipment.category === "forklift"
    );

    const seoData = {
      seo: {
        title: `${district.name} Forklift Kiralama - İstanbul Forklift Hizmetleri`,
        description: `${district.name} ilçesinde profesyonel forklift kiralama hizmeti. 1.5 ton'dan 7 ton'a kadar forklift çeşitleri.`,
        keywords: [
          `${district.name} forklift kiralama`,
          "forklift modelleri",
          "istanbul forklift",
          `${district.name} forklift hizmetleri`,
        ],
      },
      canonical: `/kiralik-forklift-${district.slug}`,
      ogUrl: `/kiralik-forklift-${district.slug}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: `${district.name} Forklift Kiralama`,
      description: `${district.name} ilçesinde profesyonel forklift kiralama hizmeti`,
      areaServed: { "@type": "City", name: "İstanbul" },
      serviceType: "Forklift Kiralama",
      provider: {
        "@type": "Organization",
        name: "İstanbul Vinç Kiralama",
        url: "https://kiralikvincistanbul.com",
      },
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Hizmet Bölgeleri", url: "/hizmet-bolgeleri" },
      {
        name: `${district.name} Forkliftler`,
        url: `/kiralik-forklift-${district.slug}`,
      },
    ];

    res.render("pages/district-forklifts", {
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
      district,
      forklifts: availableForklifts,
      districts: districtsData.districts,
      currentPath: `/kiralik-forklift-${district.slug}`,
    });
  },

  neighborhoodForklifts: (req, res) => {
    const districtSlug = req.params.district;
    const neighborhoodSlug = req.params.neighborhood;

    const district = districtsData.districts.find(
      (d) => d.slug === districtSlug
    );

    if (!district) {
      return res.status(404).render("pages/404", {
        title: "İlçe Bulunamadı",
        description: "Aradığınız ilçe bulunamadı",
        currentPath: "/hizmet-bolgeleri",
      });
    }

    const neighborhood = district.neighborhoods.find((n) => {
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

      const convertedName = n.replace(
        /[çÇğĞıIöÖşŞüÜ]/g,
        (char) => turkishChars[char] || char
      );
      const slug = convertedName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace("-mahallesi", "");
      return slug === neighborhoodSlug;
    });

    if (!neighborhood) {
      return res.status(404).render("pages/404", {
        title: "Mahalle Bulunamadı",
        description: "Aradığınız mahalle bulunamadı",
        currentPath: `/kiralik-forklift-${district.slug}`,
      });
    }

    const availableForklifts = equipmentData.equipment.filter(
      (equipment) => equipment.availability && equipment.category === "forklift"
    );

    const seoData = {
      seo: {
        title: `${neighborhood} Forklift Kiralama - ${district.name} İlçesi`,
        description: `${district.name} ilçesi ${neighborhood} mahallesinde profesyonel forklift kiralama hizmeti.`,
        keywords: [
          `${neighborhood} forklift kiralama`,
          `${district.name} forklift`,
          "istanbul forklift",
          `${neighborhood} forklift hizmetleri`,
        ],
      },
      canonical: `/kiralik-forklift-${district.slug}/${neighborhoodSlug}`,
      ogUrl: `/kiralik-forklift-${district.slug}/${neighborhoodSlug}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: `${neighborhood} Forklift Kiralama`,
      description: `${district.name} ilçesi ${neighborhood} mahallesinde profesyonel forklift kiralama hizmeti`,
      areaServed: { "@type": "City", name: "İstanbul" },
      serviceType: "Forklift Kiralama",
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Hizmet Bölgeleri", url: "/hizmet-bolgeleri" },
      {
        name: `${district.name} Forkliftler`,
        url: `/kiralik-forklift-${district.slug}`,
      },
      {
        name: `${neighborhood} Forkliftler`,
        url: `/kiralik-forklift-${district.slug}/${neighborhoodSlug}`,
      },
    ];

    res.render("pages/neighborhood-forklifts", {
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
      district,
      neighborhood,
      forklifts: availableForklifts,
      districts: districtsData.districts,
      currentPath: `/kiralik-forklift-${district.slug}/${neighborhoodSlug}`,
    });
  },

  platformDetail: (req, res) => {
    const platformSlug = req.params.platform.replace(/-kiralama$/, "");
    const platform = equipmentData.equipment.find(
      (equipment) =>
        equipment.availability &&
        equipment.category === "sepetli-platform" &&
        equipment.id === platformSlug
    );

    if (!platform) {
      return res.status(404).render("pages/404", {
        title: "Platform Bulunamadı",
        description: "Aradığınız sepetli platform bulunamadı",
        currentPath: "/kiralik-sepetli-platformlar",
      });
    }

    const relatedPlatforms = equipmentData.equipment
      .filter(
        (equipment) =>
          equipment.availability &&
          equipment.category === "sepetli-platform" &&
          equipment.id !== platform.id
      )
      .slice(0, 3);

    const seoData = {
      seo: {
        title: `${platform.name} - İstanbul Sepetli Platform Kiralama | Detaylı Özellikler`,
        description: `${platform.name} detaylı özellikleri ve kiralama bilgileri. ${platform.capacity} kapasiteli sepetli platform kiralama hizmeti.`,
        keywords: [
          `${platform.name}`,
          "sepetli platform kiralama",
          `${platform.capacity} sepetli platform`,
          "istanbul sepetli platform",
          "platform kiralama",
        ],
      },
      canonical: `/kiralik-sepetli-platformlar/${platform.id}`,
      ogUrl: `/kiralik-sepetli-platformlar/${platform.id}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Product", {
      name: platform.name,
      description: platform.description,
      brand: {
        "@type": "Brand",
        name: "İstanbul Vinç Kiralama",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "TRY",
      },
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Sepetli Platformlar", url: "/kiralik-sepetli-platformlar" },
      {
        name: platform.name,
        url: `/kiralik-sepetli-platformlar/${platform.id}`,
      },
    ];

    res.render("pages/platform-detail", {
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
      platform,
      relatedPlatforms,
      currentPath: `/kiralik-sepetli-platformlar/${platform.id}`,
    });
  },

  forkliftDetail: (req, res) => {
    const forkliftSlug = req.params.forklift.replace(/-kiralama$/, "");
    const forklift = equipmentData.equipment.find(
      (equipment) =>
        equipment.availability &&
        equipment.category === "forklift" &&
        equipment.id === forkliftSlug
    );

    if (!forklift) {
      return res.status(404).render("pages/404", {
        title: "Forklift Bulunamadı",
        description: "Aradığınız forklift bulunamadı",
        currentPath: "/kiralik-forkliftler",
      });
    }

    const relatedForklifts = equipmentData.equipment
      .filter(
        (equipment) =>
          equipment.availability &&
          equipment.category === "forklift" &&
          equipment.id !== forklift.id
      )
      .slice(0, 3);

    const seoData = {
      seo: {
        title: `${forklift.name} - İstanbul Forklift Kiralama | Detaylı Özellikler`,
        description: `${forklift.name} detaylı özellikleri ve kiralama bilgileri. ${forklift.capacity} kapasiteli forklift kiralama hizmeti.`,
        keywords: [
          `${forklift.name}`,
          "forklift kiralama",
          `${forklift.capacity} forklift`,
          "istanbul forklift",
          "forklift kiralama",
        ],
      },
      canonical: `/kiralik-forkliftler/${forklift.id}`,
      ogUrl: `/kiralik-forkliftler/${forklift.id}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Product", {
      name: forklift.name,
      description: forklift.description,
      brand: {
        "@type": "Brand",
        name: "İstanbul Vinç Kiralama",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "TRY",
      },
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Forkliftler", url: "/kiralik-forkliftler" },
      { name: forklift.name, url: `/kiralik-forkliftler/${forklift.id}` },
    ];

    res.render("pages/forklift-detail", {
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
      forklift,
      relatedForklifts,
      currentPath: `/kiralik-forkliftler/${forklift.id}`,
    });
  },
};

module.exports = equipmentController;
