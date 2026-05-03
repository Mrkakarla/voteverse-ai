import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('should merge classnames correctly', () => {
    const result = cn('px-2', 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })

  it('should handle conditional classes', () => {
    const result = cn('px-2', { 'py-1': true, 'py-2': false })
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
    expect(result).not.toContain('py-2')
  })

  it('should handle Tailwind conflicts', () => {
    // tailwind-merge should resolve conflicts
    const result = cn('px-2', 'px-4')
    expect(result).toContain('px-4')
  })

  it('should handle undefined and null', () => {
    const result = cn('px-2', undefined, null, 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })
})
