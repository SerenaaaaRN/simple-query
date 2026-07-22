import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Drawer({ open, onClose, title, children }) {
  const prevOpen = useRef(open)

  useEffect(() => {
    if (open === prevOpen.current) return
    prevOpen.current = open

    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return createPortal(
    <>
      <div className={`drawer-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`drawer-panel${open ? ' open' : ''}`}>
        <div className="drawer-header">
          <h2>{title}</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Tutup">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </>,
    document.body,
  )
}
