import { useMemo } from 'react'
import { useMenuItems } from '../hooks/useMenuItems'

export const MenuStats = () => {
  const { data: items = [] } = useMenuItems()

  const stats = useMemo(() => {
    const map = {}
    items.forEach((item) => {
      const cat = item.menu_categories?.name ?? 'Tanpa Kategori'
      map[cat] = (map[cat] || 0) + 1
    })
    return { total: items.length, perCategory: map }
  }, [items])

  return (
    <div className="stats">
      <div className="stat-card">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total Menu</span>
      </div>
      {Object.entries(stats.perCategory).map(([cat, count]) => (
        <div key={cat} className="stat-card">
          <span className="stat-value">{count}</span>
          <span className="stat-label">{cat}</span>
        </div>
      ))}
    </div>
  )
}
