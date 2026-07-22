import { useMenuItemForm } from "../hooks/useMenuItemForm";
import { useMenuCategories } from "../hooks/useMenuCategories";

export const MenuItemForm = ({ initial, onSubmit, onCancel }) => {
  const { data: categories = [] } = useMenuCategories();
  const isEdit = !!initial;

  const { form, error, patch, handleVariantChange, addVariant, removeVariant, handleSubmit } = useMenuItemForm(
    initial,
    onSubmit
  );

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <label>
        Nama Menu *
        <input
          value={form.name}
          onChange={(e) => patch({ name: e.target.value })}
          autoFocus
          placeholder="Misal: Es Kopi Susu"
        />
      </label>

      <label>
        Kategori *
        <select value={form.categoryId} onChange={(e) => patch({ categoryId: e.target.value })}>
          <option value="">Pilih kategori</option>
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
          min="0"
          step="500"
          value={form.price}
          onChange={(e) => patch({ price: e.target.value })}
          placeholder="0"
        />
      </label>

      <label>
        Deskripsi
        <textarea
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder="Opsional"
          rows={3}
        />
      </label>

      <fieldset className="variants-fieldset">
        <legend>Varian (opsional)</legend>
        {form.variants.map((v, i) => (
          <div key={i} className="variant-row">
            <input
              className="variant-name"
              placeholder="Nama varian"
              value={v.name}
              onChange={(e) => handleVariantChange(i, "name", e.target.value)}
            />
            <input
              className="variant-price"
              type="number"
              min="0"
              step="500"
              placeholder="Harga"
              value={v.price}
              onChange={(e) => handleVariantChange(i, "price", e.target.value)}
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
        <input type="checkbox" checked={form.isAvailable} onChange={(e) => patch({ isAvailable: e.target.checked })} />
        Tersedia
      </label>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn-primary">
          {isEdit ? "Simpan" : "Tambah"}
        </button>
      </div>
    </form>
  );
};
