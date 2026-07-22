import { useState } from 'react'
import MenuStats from './components/MenuStats'
import MenuList from './components/MenuList'
import MenuItemForm from './components/MenuItemForm'
import CategoryManager from './components/CategoryManager'
import Drawer from './components/Drawer'
import {
  useCreateMenuItem,
  useUpdateMenuItem,
} from './hooks/useMenuItems'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [catDrawerOpen, setCatDrawerOpen] = useState(false)

  const createMutation = useCreateMenuItem()
  const updateMutation = useUpdateMenuItem()

  function openCreate() {
    setEditingItem(null)
    setDrawerOpen(true)
  }

  function openEdit(item) {
    setEditingItem(item)
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
    setEditingItem(null)
  }

  function handleSubmit(data) {
    const mutation = editingItem
      ? updateMutation.mutateAsync({ id: editingItem.id, ...data })
      : createMutation.mutateAsync(data)

    mutation.then(closeDrawer).catch(() => {})
  }

  function openCatDrawer() {
    setCatDrawerOpen(true)
  }

  function closeCatDrawer() {
    setCatDrawerOpen(false)
  }

  return (
    <>
      <header>
        <h1>Menu</h1>
      </header>

      <main>
        <MenuStats />
        <MenuList
          onEdit={openEdit}
          onCreate={openCreate}
          onCategoryManage={openCatDrawer}
        />
      </main>

      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        title={editingItem ? 'Edit Menu' : 'Tambah Menu'}
      >
        <MenuItemForm
          key={editingItem?.id ?? 'new'}
          initial={editingItem}
          onSubmit={handleSubmit}
          onCancel={closeDrawer}
        />
      </Drawer>

      <Drawer
        open={catDrawerOpen}
        onClose={closeCatDrawer}
        title="Kelola Kategori"
      >
        <CategoryManager onClose={closeCatDrawer} />
      </Drawer>
    </>
  )
}

export default App
