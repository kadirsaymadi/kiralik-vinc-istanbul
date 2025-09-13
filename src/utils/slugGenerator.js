const slugGenerator = {
  createSlug: (text) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
  },

  createCraneSlug: (name) => {
    return slugGenerator.createSlug(name) + "-vinc-kiralama";
  },

  createDistrictSlug: (district) => {
    return slugGenerator.createSlug(district) + "-vinc-kiralama";
  },

  createNeighborhoodSlug: (neighborhood, district) => {
    return slugGenerator.createSlug(neighborhood) + "-vinc-kiralama";
  },

  createBreadcrumbSlug: (district, neighborhood) => {
    if (neighborhood) {
      return `/${slugGenerator.createSlug(district)}/${slugGenerator.createSlug(
        neighborhood
      )}-vinc-kiralama`;
    }
    return `/${slugGenerator.createSlug(district)}-vinc-kiralama`;
  },
};

module.exports = slugGenerator;
