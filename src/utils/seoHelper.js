const slugGenerator = require("./slugGenerator");

const seoHelper = {
  createSlug: (text) => {
    return slugGenerator.createSlug(text);
  },

  generateMetaTags: (data) => {
    const defaultTitle =
      "İstanbul Vinç Kiralama - Mobil ve Sabit Vinç Hizmetleri | 7/24 Hizmet";
    const defaultDescription =
      "İstanbul'da profesyonel vinç kiralama hizmeti. 5 ton'dan 100 ton'a kadar mobil vinç, sepetli platform ve forklift kiralama. Uygun fiyat, hızlı teslimat, deneyimli operatörler. 7/24 hizmet.";
    const defaultKeywords = [
      "vinç kiralama istanbul",
      "mobil vinç kiralama",
      "sabit vinç kiralama",
      "sepetli platform kiralama",
      "forklift kiralama",
      "vinç operatörü",
      "istanbul vinç hizmetleri",
      "vinç kiralama fiyatları",
      "istanbul vinç",
      "vinç kiralama",
      "kiralık vinç",
      "mobil vinç",
      "sabit vinç",
      "vinç operatörlü",
      "7/24 vinç kiralama",
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
          "@context": "https://schema.org",
          "@type": "Service",
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
          offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
          },
        };

      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: data.name,
          description: data.description,
          brand: {
            "@type": "Brand",
            name: data.brand || "Vinç",
          },
          category: data.category || "Vinç Kiralama",
          offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            availability: data.availability
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            ...(data.price && { price: data.price }),
          },
        };

      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "İstanbul Vinç Kiralama",
          url: "https://kiralikvincistanbul.com",
          logo: "https://kiralikvincistanbul.com/images/logo.png",
          description:
            "İstanbul'da profesyonel vinç, sepetli platform ve forklift kiralama hizmeti",
          address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressCountry: "TR",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-532-315-99-51",
            contactType: "customer service",
            availableLanguage: "Turkish",
            areaServed: "TR",
            hoursAvailable: "24/7",
          },
          sameAs: [
            "https://www.facebook.com/kiralikvincistanbul",
            "https://www.instagram.com/kiralikvincistanbul",
            "https://www.linkedin.com/company/kiralikvincistanbul",
          ],
          serviceArea: {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: 41.0082,
              longitude: 28.9784,
            },
            geoRadius: "50000",
          },
        };

      case "ContactPage":
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: data.name || "İletişim - İstanbul Vinç Kiralama",
          description:
            data.description ||
            "İstanbul vinç kiralama hizmeti için bizimle iletişime geçin",
          url: "https://kiralikvincistanbul.com/iletisim",
          mainEntity: {
            "@type": "Organization",
            name: "İstanbul Vinç Kiralama",
            telephone: "+90-532-315-99-51",
            email: "kadirsaymadi@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "İstanbul",
              addressCountry: "TR",
            },
          },
        };

      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "İstanbul Vinç Kiralama",
          description:
            "İstanbul'da profesyonel vinç, sepetli platform ve forklift kiralama hizmeti",
          url: "https://kiralikvincistanbul.com",
          telephone: "+90-532-315-99-51",
          email: "kadirsaymadi@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressCountry: "TR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 41.0082,
            longitude: 28.9784,
          },
          openingHours: "Mo-Su 00:00-23:59",
          serviceArea: {
            "@type": "City",
            name: "İstanbul",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Vinç Kiralama Hizmetleri",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Mobil Vinç Kiralama",
                  description: "25 ton'dan 350 ton'a kadar mobil vinç kiralama",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Sepetli Platform Kiralama",
                  description:
                    "10 metre'den 100 metre'ye kadar sepetli platform kiralama",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Forklift Kiralama",
                  description: "1.5 ton'dan 7 ton'a kadar forklift kiralama",
                },
              },
            ],
          },
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: data.name || "İstanbul Vinç Kiralama",
          url: "https://kiralikvincistanbul.com",
          description:
            data.description ||
            "İstanbul'da profesyonel vinç, sepetli platform ve forklift kiralama hizmeti",
          publisher: {
            "@type": "Organization",
            name: "İstanbul Vinç Kiralama",
            url: "https://kiralikvincistanbul.com",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://kiralikvincistanbul.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        };

      default:
        return baseSchema;
    }
  },

  generateBreadcrumbSchema: (breadcrumbs) => {
    const baseUrl = "https://kiralikvincistanbul.com";
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${item.url}`,
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
