export const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));
};

export const formatVariantCount = (variants) => {
  return Array.isArray(variants) ? `${variants.length} varian` : "-";
};

export const getCategoryDisplay = (item) => {
  return item.menu_categories?.name ?? "-";
};
