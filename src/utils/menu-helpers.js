export const emptyVariant = { name: '', price: '' }

export const buildInitialForm = (initial) => {
  return {
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    categoryId: initial?.category_id ?? '',
    price: initial?.price?.toString() ?? '',
    isAvailable: initial?.is_available ?? true,
    variants:
      Array.isArray(initial?.variants) && initial.variants.length > 0
        ? initial.variants.map((v) => ({
            name: v.name ?? '',
            price: v.price?.toString() ?? '',
          }))
        : [{ ...emptyVariant }],
  }
}

export const buildVariantPayload = (variants, defaultPrice) => {
  const filtered = variants.filter((v) => v.name.trim() || v.price.trim())
  if (filtered.length === 0) return null
  return filtered.map((v) => ({
    name: v.name.trim(),
    price: v.price ? Number(v.price) : defaultPrice,
  }))
}
