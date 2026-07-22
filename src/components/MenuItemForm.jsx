import { useState } from 'react'
import { useMenuCategories } from '../hooks/useMenuCategories'

const emptyVariant = { name: '', price: '' }

function buildInitial(initial) {
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

export default function MenuItemForm({ initial, onSubmit, onCancel }) {
  const { data: categories = [] } = useMenuCategories()
  const isEdit = !!initial

  const [form, setForm] = useState(() => buildInitial(initial))
  const [error, setError] = useState('')

  function patch(partial) {
    setForm((prev) => ({ ...prev, ...partial }))
  }

  function handleVariantChange(index, field, value) {
    setForm((prev) => {
      const variants = [...prev.variants]
      variants[index] = { ...variants[index], [field]: value }
      return { ...prev, variants }
    })
  }

  function addVariant() {
    setForm((prev) => ({ ...prev, variants: [...prev.variants, { ...emptyVariant }] }))
  }

  function removeVariant(index) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Nama menu wajib diisi')
      return
    }
    if (!form.categoryId) {
      setError('Kategori wajib dipilih')
      return
    }
    const numericPrice = Number(form.price)
    if (!form.price || isNaN(numericPrice) || numericPrice <= 0) {
      setError('Harga harus berupa angka > 0')
      return
    }

    const variantsJson = form.variants.some((v) => v.name.trim() !== '')
      ? form.variants
          .filter((v) => v.name.trim() !== '')
          .map((v) => ({
            name: v.name.trim(),
            price: Number(v.price) || numericPrice,
          }))
      : null

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || null,
      category_id: form.categoryId,
      price: numericPrice,
      is_available: form.isAvailable,
      variants: variantsJson,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <label>
        Nama Menu *
        <input
          value={form.name}
          onChange={(e) => patch({ name: e.target.value })}
          autoFocus
        />
      </label>

      <label>
        Kategori *
        <select
          value={form.categoryId}
          onChange={(e) => patch({ categoryId: e.target.value })}
        >
          <option value="">-- Pilih Kategori --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Harga *
        <input
          type="number"
          step="any"
          value={form.price}
          onChange={(e) => patch({ price: e.target.value })}
          placeholder="35000"
        />
      </label>

      <label>
        Deskripsi
        <textarea
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
          rows={2}
        />
      </label>

      <fieldset>
        <legend>Varian Harga (opsional)</legend>
        {form.variants.map((v, i) => (
          <div key={i} className="variant-row">
            <input
              placeholder="Nama varian"
              value={v.name}
              onChange={(e) => handleVariantChange(i, 'name', e.target.value)}
            />
            <input
              type="number"
              step="any"
              placeholder="Harga"
              value={v.price}
              onChange={(e) => handleVariantChange(i, 'price', e.target.value)}
            />
            {form.variants.length > 1 && (
              <button type="button" className="btn-danger" onClick={() => removeVariant(i)}>
                Hapus
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn-secondary" onClick={addVariant}>
          + Tambah Varian
        </button>
      </fieldset>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={form.isAvailable}
          onChange={(e) => patch({ isAvailable: e.target.checked })}
        />
        Tersedia
      </label>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn-primary">
          {isEdit ? 'Simpan' : 'Tambah'}
        </button>
      </div>
    </form>
  )
}
