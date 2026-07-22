import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from '../lib/api'

export const useMenuCategories = () => {
  return useQuery({
    queryKey: ['menuCategories'],
    queryFn: getMenuCategories,
    staleTime: 120_000,
  })
}

export const useCreateMenuCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}

export const useUpdateMenuCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}

export const useDeleteMenuCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteMenuCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuCategories'] }),
  })
}
