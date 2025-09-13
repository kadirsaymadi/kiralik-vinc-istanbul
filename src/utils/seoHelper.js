const slugGenerator = require("./slugGenerator");

const seoHelper = {
  createSlug: (text) => {
    return slugGenerator.createSlug(text);
  },

  generateMetaTags: (data) => {
    const defaultTitle =
      "İstanbul Vinç Kiralama - Mobil ve Sabit Vinç Hizmetleri";
    const defaultDescription =
      "İstanbul'da profesyonel vinç kiralama hizmeti. Mobil ve sabit vinç kiralama, uygun fiyat, hızlı teslimat, deneyimli operatörler.";
    const defaultKeywords = [
      "vinç kiralama",
      "istanbul vinç",
      "mobil vinç",
      "sabit vinç",
      "vinç operatörü",
    ];

    return {
      title: data.seo?.title || defaultTitle,
      description: data.seo?.description || defaultDescription,
      keywords: data.seo?.keywords || defaultKeywords,
      canonical: data.canonical || "",
      ogTitle: data.seo?.title || defaultTitle,
      ogDescription: data.seo?.description || defaultDescription,
      ogImage: data.ogImage || "/images/og-image.jpg",
      ogUrl: data.ogUrl || "",
    };
  },

  generateStructuredData: (type, data) => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type,
      name: data.name || "İstanbul Vinç Kiralama",
      description:
        data.description || "İstanbul'da profesyonel vinç kiralama hizmeti",
      areaServed: {
        "@type": "City",
        name: "İstanbul",
      },
      serviceType: "Vinç Kiralama",
      provider: {
        "@type": "Organization",
        name: "İstanbul Vinç Kiralama",
        url: "https://kiralikvincistanbul.com",
      },
    };

    switch (type) {
      case "Service":
        return {
          ...baseSchema,
          serviceType: "Vinç Kiralama",
          offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
          },
        };

      case "Product":
        return {
          ...baseSchema,
          "@type": "Product",
          name: data.name,
          description: data.description,
          brand: data.brand || "Vinç",
          category: data.category || "Vinç Kiralama",
          offers: {
            "@type": "Offer",
            price: data.price,
            priceCurrency: "TRY",
            availability: data.availability
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        };

      case "Organization":
        return {
          ...baseSchema,
          "@type": "Organization",
          name: "İstanbul Vinç Kiralama",
          url: "https://kiralikvincistanbul.com",
          logo: "https://kiralikvincistanbul.com/images/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-XXX-XXX-XXXX",
            contactType: "customer service",
            availableLanguage: "Turkish",
          },
        };

      default:
        return baseSchema;
    }
  },

  generateBreadcrumbSchema: (breadcrumbs) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  },

  formatPrice: (price) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  },

  generateCanonicalUrl: (path) => {
    const baseUrl = "https://kiralikvincistanbul.com";
    return `${baseUrl}${path}`;
  },
};

module.exports = seoHelper;
