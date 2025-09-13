const fs = require("fs");
const path = require("path");
const seoHelper = require("../utils/seoHelper");
const slugGenerator = require("../utils/slugGenerator");

const cranesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/cranes.json"), "utf8")
);
const districtsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/districts.json"), "utf8")
);
const neighborhoodsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/neighborhoods.json"), "utf8")
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

    const districtNeighborhoods = neighborhoodsData.neighborhoods.filter(
      (n) => n.district === district.name
    );
    const availableCranes = cranesData.cranes.filter(
      (crane) => crane.availability
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
    const neighborhood = neighborhoodsData.neighborhoods.find(
      (n) => n.slug === neighborhoodSlug && n.district === district?.name
    );

    if (!district || !neighborhood) {
      return res.status(404).render("pages/404", {
        title: "Mahalle Bulunamadı - İstanbul Vinç Kiralama",
        description: "Aradığınız mahalle bulunamadı.",
        currentPath: req.path,
        districts: districtsData.districts,
      });
    }

    const availableCranes = cranesData.cranes.filter(
      (crane) => crane.availability
    );

    const seoData = {
      seo: neighborhood.seo,
      canonical: `/kiralik-vinc-${district.slug}/${neighborhood.slug}`,
      ogUrl: `/kiralik-vinc-${district.slug}/${neighborhood.slug}`,
    };

    const metaTags = seoHelper.generateMetaTags(seoData);
    const structuredData = seoHelper.generateStructuredData("Service", {
      name: `${neighborhood.name} Vinç Kiralama`,
      description: neighborhood.description,
    });

    const breadcrumbs = [
      { name: "Ana Sayfa", url: "/" },
      {
        name: `${district.name} Vinç Kiralama`,
        url: `/kiralik-vinc-${district.slug}`,
      },
      {
        name: `${neighborhood.name} Vinç Kiralama`,
        url: `/kiralik-vinc-${district.slug}/${neighborhood.slug}`,
      },
    ];

    res.render("pages/neighborhood", {
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
      currentPath: `/kiralik-vinc-${district.slug}/${neighborhood.slug}`,
    });
  },
};

module.exports = categoryController;
