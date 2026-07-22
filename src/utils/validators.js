export const validateMenuItem = (form) => {
  if (!form.name.trim()) return "Nama menu wajib diisi";
  if (!form.categoryId) return "Kategori wajib dipilih";
  const numericPrice = Number(form.price);
  if (!form.price || isNaN(numericPrice) || numericPrice <= 0) return "Harga harus berupa angka > 0";
  return null;
};

export const validateCategory = (name) => {
  if (!name.trim()) return "Nama kategori wajib diisi";
  return null;
};
