import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from '../lib/api'

/**
 * Mengambil semua kategori.
 *
 * @returns {UseQueryResult}
 */
export const useMenuCategories = () => {
  return useQuery({
    queryKey: ['menuCategories'],
    queryFn: getMenuCategories,
    staleTime: 120_000,
  })
}

/**
 * Membuat kategori baru dan invalidate cache.
 *
 * @returns {UseMutationResult}
 */
export const useCreateMenuCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}

/**
 * Mengupdate kategori dan invalidate cache.
 *
 * @returns {UseMutationResult}
 */
export const useUpdateMenuCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}

/**
 * Menghapus kategori dan invalidate cache.
 *
 * @returns {UseMutationResult}
 */
export const useDeleteMenuCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}
