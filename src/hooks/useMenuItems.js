import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../lib/api'

export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menuItems'],
    queryFn: getMenuItems,
    staleTime: 60_000,
  })
}

export const useCreateMenuItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuItems'] }),
  })
}

export const useUpdateMenuItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateMenuItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['menuItems'] }),
  })
}

export const useDeleteMenuItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteMenuItem,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['menuItems'] })
      const prev = qc.getQueryData(['menuItems'])
      qc.setQueryData(['menuItems'], (old) => old?.filter((item) => item.id !== id))
      return { prev }
    },
    onError: (_err, _id, ctx) => {
      qc.setQueryData(['menuItems'], ctx?.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['menuItems'] }),
  })
}
