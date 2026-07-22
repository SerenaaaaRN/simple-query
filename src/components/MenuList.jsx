import { useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import { useMenuItems, useDeleteMenuItem } from "../hooks/useMenuItems";
import { useMenuCategories } from "../hooks/useMenuCategories";
import { useMenuTable } from "../hooks/useMenuTable";
import { formatPrice, formatVariantCount, getCategoryDisplay } from "../utils/formatters";

const SortIcon = ({ direction }) => {
  return (
    <span className={`sort-icon${!direction ? " sort-idle" : ""}`}>
      {direction === "asc" ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7-7 7 7" />
        </svg>
      ) : direction === "desc" ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7 7 7-7" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 6l6 6-6 6" />
          <path d="M12 6l6 6-6 6" />
        </svg>
      )}
    </span>
  );
};

export const MenuList = ({ onEdit, onCreate, onCategoryManage }) => {
  const { data: items = [], isLoading, isError, error, refetch } = useMenuItems();
  const { data: categories = [] } = useMenuCategories();
  const deleteMutation = useDeleteMenuItem();

  const columns = useMemo(
    () => [
      {
        header: "Nama",
        accessorKey: "name",
        size: 200,
      },
      {
        header: "Kategori",
        accessorFn: getCategoryDisplay,
        id: "category",
        size: 120,
      },
      {
        header: "Harga",
        accessorFn: (row) => formatPrice(row.price),
        id: "price",
        size: 130,
      },
      {
        header: "Varian",
        accessorFn: (row) => formatVariantCount(row.variants),
        id: "variants",
        enableSorting: false,
        size: 90,
      },
      {
        header: "Status",
        id: "status",
        enableSorting: false,
        size: 100,
        cell: ({ row }) => (
          <span className={`badge ${row.original.is_available ? "badge-available" : "badge-unavailable"}`}>
            {row.original.is_available ? "Tersedia" : "Habis"}
          </span>
        ),
      },
      {
        header: "Aksi",
        id: "actions",
        enableSorting: false,
        size: 150,
        cell: ({ row }) => (
          <div className="action-buttons">
            <button className="btn-edit" onClick={() => onEdit(row.original)}>
              Edit
            </button>
            <button
              className="btn-delete"
              onClick={() => {
                if (window.confirm(`Hapus "${row.original.name}"?`)) {
                  deleteMutation.mutate(row.original.id);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              Hapus
            </button>
          </div>
        ),
      },
    ],
    [onEdit, deleteMutation]
  );

  const { table, globalFilter, selectValue, handleCategoryFilter, handleSearch, filteredRowCount } = useMenuTable({
    items,
    columns,
    categories,
  });

  if (isLoading) return <p className="state-msg">Memuat data...</p>;
  if (isError)
    return (
      <p className="state-msg error">
        Gagal memuat data: {error.message}
        <button className="btn-secondary" onClick={() => refetch()} style={{ marginLeft: 12 }}>
          Coba Lagi
        </button>
      </p>
    );
  if (items.length === 0) return <p className="state-msg">Belum ada menu. Klik "Tambah Menu" untuk memulai.</p>;

  return (
    <>
      <div className="table-toolbar">
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Cari menu..."
            value={globalFilter}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={selectValue} onChange={(e) => handleCategoryFilter(e.target.value)}>
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button className="btn-secondary toolbar-btn-secondary" onClick={onCategoryManage}>
          Kelola Kategori
        </button>
        <button className="btn-primary toolbar-btn" onClick={onCreate}>
          + Tambah Menu
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && <SortIcon direction={header.column.getIsSorted()} />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-start">
            <span className="pagination-info">
              {filteredRowCount > 0
                ? `${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–${Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredRowCount
                  )} dari ${filteredRowCount}`
                : "0 item"}
            </span>
          </div>

          <div className="pagination-end">
            <label className="page-size-label">
              Tampilkan
              <select
                className="page-size-select"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <span className="pagination-page">
              Hal {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
            </span>

            <div className="pagination-actions">
              <button
                className="page-btn"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Halaman sebelumnya"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Prev
              </button>
              <button
                className="page-btn"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Halaman selanjutnya"
              >
                Next
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
