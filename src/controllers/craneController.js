const fs = require("fs");
const path = require("path");
const seoHelper = require("../utils/seoHelper");

const cranesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/cranes.json"), "utf8")
);
const districtsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/districts.json"), "utf8")
);

const craneController = {
  detail: (req, res) => {
    const craneSlug = req.params.crane;
    const crane = cranesData.cranes.find(
      (c) => c.id === craneSlug.replace("-vinc-kiralama", "")
    );

    if (!crane) {
      return res.status(404).render("pages/404", {
        title: "Vinç Bulunamadı - İstanbul Vinç Kiralama",
        description: "Aradığınız vinç modeli bulunamadı.",
        currentPath: req.path,
        districts: districtsData.districts,
      });
    }

    const relatedCranes = cranesData.cranes
      .filter((c) => c.id !== crane.id && c.availability)
      .slice(0, 3);

    const seoData = {
      seo: crane.seo,
      canonical: `/kiralik-vincler/${craneSlug}`,
      ogUrl: `/kiralik-vincler/${craneSlug}`,
      ogImage: crane.images[0] || "/images/og-image.jpg",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Product", {
      name: crane.name,
      description: crane.description,
      brand: crane.type,
      category: "Vinç Kiralama",
      availability: crane.availability,
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Vinçler", url: "/kiralik-vincler" },
      { name: crane.name, url: `/kiralik-vincler/${craneSlug}` },
    ];

    res.render("pages/crane-detail", {
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
      crane,
      relatedCranes,
      districts: districtsData.districts,
      currentPath: `/kiralik-vincler/${craneSlug}`,
    });
  },

  list: (req, res) => {
    const availableCranes = cranesData.cranes.filter(
      (crane) => crane.availability
    );

    const seoData = {
      seo: {
        title: "Vinç Modelleri - İstanbul Vinç Kiralama | Tüm Vinç Çeşitleri",
        description:
          "İstanbul'da kiralık vinç modelleri. 25 ton'dan 350 ton'a kadar mobil ve sabit vinç çeşitleri. Detaylı özellikler, fiyatlar ve görseller.",
        keywords: [
          "vinç modelleri",
          "kiralık vinç",
          "mobil vinç çeşitleri",
          "sabit vinç modelleri",
          "istanbul vinç kiralama",
        ],
      },
      canonical: "/kiralik-vincler",
      ogUrl: "/kiralik-vincler",
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: "Vinç Modelleri",
      description: "İstanbul'da kiralık vinç modelleri ve çeşitleri",
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      { name: "Vinçler", url: "/kiralik-vincler" },
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
      cranes: availableCranes,
      districts: districtsData.districts,
      currentPath: "/kiralik-vincler",
    });
  },
};

module.exports = craneController;
