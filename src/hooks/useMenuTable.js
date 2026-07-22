import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'

/**
 * State tabel: paginasi, sorting, filter.
 *
 * @param {object} param
 * @returns {object}
 */
export const useMenuTable = ({ items, columns, categories }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState([])
  const [sorting, setSorting] = useState([{ id: 'name', desc: false }])

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      pagination,
      globalFilter,
      columnFilters,
      sorting,
    },
  })

  const handleCategoryFilter = (categoryId) => {
    if (!categoryId) {
      setColumnFilters((prev) => prev.filter((f) => f.id !== 'category'))
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
      return
    }
    const catName = categories.find((c) => c.id === categoryId)?.name ?? ''
    setColumnFilters([{ id: 'category', value: catName }])
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const handleSearch = (value) => {
    setGlobalFilter(value)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const activeCategoryId = columnFilters.find((f) => f.id === 'category')?.value ?? ''
  const categoryOption = categories.find((c) => c.name === activeCategoryId)
  const selectValue = categoryOption?.id ?? ''

  return {
    table,
    globalFilter,
    selectValue,
    handleCategoryFilter,
    handleSearch,
    filteredRowCount: table.getFilteredRowModel().rows.length,
  }
}
