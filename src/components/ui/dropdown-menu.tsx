import React from 'react'

export const DropdownMenu: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block">{children}</div>
)

export const DropdownMenuTrigger: React.FC<{ asChild?: boolean; children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
)

export const DropdownMenuContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={className}>{children}</div>
)

export const DropdownMenuCheckboxItem: React.FC<{
  checked?: boolean
  onCheckedChange?: (v?: boolean) => void
  children?: React.ReactNode
  className?: string
}> = ({ checked, onCheckedChange, children, className }) => (
  <label className={className} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <input type="checkbox" checked={!!checked} onChange={(e) => onCheckedChange?.(e.target.checked)} />
    <span>{children}</span>
  </label>
)

export default DropdownMenu