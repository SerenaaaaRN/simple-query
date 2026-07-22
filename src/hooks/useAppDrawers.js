import { useState } from 'react'
import { useCreateMenuItem, useUpdateMenuItem } from './useMenuItems'

/**
 * State drawer + orchestration mutation menu.
 *
 * @returns {object}
 */
export const useAppDrawers = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [catDrawerOpen, setCatDrawerOpen] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const createMutation = useCreateMenuItem()
  const updateMutation = useUpdateMenuItem()

  const openCreate = () => {
    setEditingItem(null)
    setDrawerOpen(true)
    setSubmitError('')
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setDrawerOpen(true)
    setSubmitError('')
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingItem(null)
    setSubmitError('')
  }

  const handleSubmit = (data) => {
    const mutation = editingItem
      ? updateMutation.mutateAsync({ id: editingItem.id, ...data })
      : createMutation.mutateAsync(data)

    mutation.then(closeDrawer).catch((err) => setSubmitError(err.message))
  }

  const openCatDrawer = () => {
    setCatDrawerOpen(true)
  }

  const closeCatDrawer = () => {
    setCatDrawerOpen(false)
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return {
    drawerOpen,
    editingItem,
    catDrawerOpen,
    submitError,
    isPending,
    openCreate,
    openEdit,
    closeDrawer,
    handleSubmit,
    openCatDrawer,
    closeCatDrawer,
  }
}
