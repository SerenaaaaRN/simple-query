import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from '../lib/api'

export function useMenuCategories() {
  return useQuery({
    queryKey: ['menuCategories'],
    queryFn: getMenuCategories,
    staleTime: 120_000,
  })
}

export function useCreateMenuCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}

export function useUpdateMenuCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}

export function useDeleteMenuCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}
