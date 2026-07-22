import { useState } from 'react'
import { useMenuCategories, useCreateMenuCategory, useUpdateMenuCategory, useDeleteMenuCategory } from '../hooks/useMenuCategories'
import CategoryForm from './CategoryForm'

export default function CategoryManager({ onClose }) {
  const { data: categories = [], isLoading } = useMenuCategories()
  const createMutation = useCreateMenuCategory()
  const updateMutation = useUpdateMenuCategory()
  const deleteMutation = useDeleteMenuCategory()
  const [editing, setEditing] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  function handleSubmit(data) {
    const mutation = editing
      ? updateMutation.mutateAsync({ id: editing.id, ...data })
      : createMutation.mutateAsync(data)
    mutation.then(() => setEditing(null)).catch(() => {})
  }

  function handleDelete(cat) {
    setDeleteError('')
    if (!window.confirm(`Hapus kategori "${cat.name}"?`)) return
    deleteMutation.mutate(cat.id, {
      onError: (err) => {
        setDeleteError(
          err.message.includes('foreign key')
            ? `Kategori "${cat.name}" masih digunakan oleh menu lain. Hapus atau pindahkan menu tersebut terlebih dahulu.`
            : err.message,
        )
      },
    })
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="category-manager">
      <CategoryForm
        key={editing?.id ?? 'new'}
        initial={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
        disabled={isPending}
      />

      {deleteError && <p className="form-error">{deleteError}</p>}

      <div className="category-divider">Daftar Kategori</div>

      {isLoading ? (
        <p className="state-msg" style={{ padding: '24px 0' }}>Memuat...</p>
      ) : categories.length === 0 ? (
        <p className="state-msg" style={{ padding: '24px 0' }}>Belum ada kategori.</p>
      ) : (
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id} className="category-item">
              <div className="category-info">
                <span className="category-name">{cat.name}</span>
                {cat.display_order > 0 && (
                  <span className="category-order">Urutan {cat.display_order}</span>
                )}
              </div>
              <div className="category-actions">
                <button
                  className="btn-edit"
                  onClick={() => setEditing(cat)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(cat)}
                  disabled={deleteMutation.isPending}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
