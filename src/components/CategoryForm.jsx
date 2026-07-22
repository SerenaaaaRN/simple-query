import { useState, useEffect } from "react";
import { validateCategory } from "../utils/validators";

export const CategoryForm = ({ initial, onSubmit, onCancel, disabled }) => {
  const [name, setName] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initial) return;
    setName(initial.name ?? "");
    setDisplayOrder(initial.display_order?.toString() ?? "");
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateCategory(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit({
      name: name.trim(),
      display_order: displayOrder ? Number(displayOrder) : 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <label>
        Nama Kategori *
        <input value={name} onChange={(e) => setName(e.target.value)} autoFocus placeholder="Misal: Minuman Segar" />
      </label>
      <label>
        Urutan Tampil
        <input
          type="number"
          min="0"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          placeholder="0"
        />
      </label>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn-primary" disabled={disabled}>
          {initial ? "Simpan" : "Tambah"}
        </button>
      </div>
    </form>
  );
};
