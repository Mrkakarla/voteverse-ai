import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<Button className="custom-class">Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles click events', () => {
    let clicked = false
    const handleClick = () => {
      clicked = true
    }
    
    render(<Button onClick={handleClick}>Click</Button>)
    const button = screen.getByRole('button')
    button.click()
    expect(clicked).toBe(true)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('has accessible name', () => {
    render(<Button>Accessible Button</Button>)
    const button = screen.getByRole('button', { name: /accessible button/i })
    expect(button).toBeInTheDocument()
  })
})
