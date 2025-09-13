const fs = require("fs");
const path = require("path");
const seoHelper = require("../utils/seoHelper");
const slugGenerator = require("../utils/slugGenerator");

const equipmentData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/cranes.json"), "utf8")
);
const districtsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/districts.json"), "utf8")
);

const categoryController = {
  district: (req, res) => {
    const districtSlug = req.params.district;
    const district = districtsData.districts.find(
      (d) => d.slug === districtSlug
    );

    if (!district) {
      return res.status(404).render("pages/404", {
        title: "İlçe Bulunamadı - İstanbul Vinç Kiralama",
        description: "Aradığınız ilçe bulunamadı.",
        currentPath: req.path,
        districts: districtsData.districts,
      });
    }

    const districtNeighborhoods = district.neighborhoods;
    const availableCranes = equipmentData.equipment.filter(
      (equipment) => equipment.availability && equipment.category === "vinç"
    );

    const seoData = {
      seo: district.seo,
      canonical: `/kiralik-vinc-${district.slug}`,
      ogUrl: `/kiralik-vinc-${district.slug}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: `${district.name} Vinç Kiralama`,
      description: district.description,
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      {
        name: `${district.name} Vinç Kiralama`,
        url: `/kiralik-vinc-${district.slug}`,
      },
    ];

    res.render("pages/district", {
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
      neighborhoods: districtNeighborhoods,
      availableCranes,
      districts: districtsData.districts,
      currentPath: `/kiralik-vinc-${district.slug}`,
    });
  },

  neighborhood: (req, res) => {
    const districtSlug = req.params.district;
    const neighborhoodSlug = req.params.neighborhood;

    const district = districtsData.districts.find(
      (d) => d.slug === districtSlug
    );
    if (!district) {
      return res.status(404).render("pages/404", {
        title: "İlçe Bulunamadı - İstanbul Vinç Kiralama",
        description: "Aradığınız ilçe bulunamadı.",
        currentPath: req.path,
        districts: districtsData.districts,
      });
    }

    const neighborhood = district.neighborhoods.find((n) => {
      // Türkçe karakterleri İngilizce karakterlere çevir
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
        title: "Mahalle Bulunamadı - İstanbul Vinç Kiralama",
        description: "Aradığınız mahalle bulunamadı.",
        currentPath: req.path,
        districts: districtsData.districts,
      });
    }

    const availableCranes = equipmentData.equipment.filter(
      (equipment) => equipment.availability && equipment.category === "vinç"
    );

    const seoData = {
      seo: {
        title: `${neighborhood} Vinç Kiralama - ${district.name} İstanbul`,
        description: `${district.name} ilçesinde ${neighborhood} mahallesinde vinç kiralama hizmeti. Mobil ve sabit vinç kiralama, profesyonel operatörlü hizmet.`,
        keywords: [
          `${neighborhood.toLowerCase()} vinç kiralama`,
          `${district.name.toLowerCase()} vinç`,
          `${neighborhood.toLowerCase()} mahalle vinç`,
          `${district.name.toLowerCase()} ${neighborhood.toLowerCase()} vinç`,
        ],
      },
      canonical: `/kiralik-vinc-${district.slug}/${neighborhoodSlug}`,
      ogUrl: `/kiralik-vinc-${district.slug}/${neighborhoodSlug}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: `${neighborhood} Vinç Kiralama`,
      description: `${district.name} ilçesinde ${neighborhood} mahallesinde profesyonel vinç kiralama hizmeti`,
      url: `${process.env.SITE_URL || "http://localhost:3000"}/kiralik-vinc-${
        district.slug
      }/${neighborhoodSlug}`,
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      {
        name: `${district.name} Vinç Kiralama`,
        url: `/kiralik-vinc-${district.slug}`,
      },
      {
        name: `${neighborhood} Vinç Kiralama`,
        url: `/kiralik-vinc-${district.slug}/${neighborhoodSlug}`,
      },
    ];

    res.render("pages/neighborhood-detail", {
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
      availableCranes,
      districts: districtsData.districts,
      currentPath: `/kiralik-vinc-${district.slug}/${neighborhoodSlug}`,
    });
  },
};

module.exports = categoryController;
