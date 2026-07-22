import { useState, useEffect } from 'react'

export default function CategoryForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!initial) return
    setName(initial.name ?? '')
    setDisplayOrder(initial.display_order?.toString() ?? '')
  }, [initial])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Nama kategori wajib diisi')
      return
    }

    onSubmit({
      name: name.trim(),
      display_order: displayOrder ? Number(displayOrder) : 0,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <label>
        Nama Kategori *
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          placeholder="Misal: Minuman Segar"
        />
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
        <button type="submit" className="btn-primary">
          {initial ? 'Simpan' : 'Tambah'}
        </button>
      </div>
    </form>
  )
}
