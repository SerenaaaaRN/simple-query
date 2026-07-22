import { useState } from 'react'
import { buildInitialForm, buildVariantPayload, emptyVariant } from '../utils/menu-helpers'
import { validateMenuItem } from '../utils/validators'

/**
 * State form + validasi + submit handler menu item.
 *
 * @param {object|null} initial
 * @param {function}    onSubmit
 * @returns {object}
 */
export const useMenuItemForm = (initial, onSubmit) => {
  const [form, setForm] = useState(() => buildInitialForm(initial))
  const [error, setError] = useState('')

  const reset = (override) => {
    setForm(buildInitialForm(override))
    setError('')
  }

  const patch = (partial) => {
    setForm((prev) => ({ ...prev, ...partial }))
  }

  const handleVariantChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.variants]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, variants: updated }
    })
  }

  const addVariant = () => {
    setForm((prev) => ({ ...prev, variants: [...prev.variants, { ...emptyVariant }] }))
  }

  const removeVariant = (index) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const validationError = validateMenuItem(form)
    if (validationError) {
      setError(validationError)
      return
    }

    const numericPrice = Number(form.price)
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || null,
      category_id: form.categoryId,
      price: numericPrice,
      is_available: form.isAvailable,
      variants: buildVariantPayload(form.variants, numericPrice),
    })
  }

  return {
    form,
    error,
    setError,
    reset,
    patch,
    handleVariantChange,
    addVariant,
    removeVariant,
    handleSubmit,
  }
}
