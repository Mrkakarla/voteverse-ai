# Testing Guide

This document outlines testing strategies and examples for VoteVerse AI.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch
```

## Test Structure

Tests are organized in `__tests__` directory, mirroring the source structure:

```
__tests__/
  ├── components/
  │   ├── Button.test.tsx
  │   └── ...
  ├── lib/
  │   ├── utils.test.ts
  │   ├── gamification.test.ts
  │   └── ...
  └── hooks/
      └── ...
```

## Writing Tests

### Unit Tests

Test individual functions and utilities:

```typescript
import { describe, it, expect } from 'vitest'
import { calculateLevel } from '@/lib/gamification'

describe('calculateLevel', () => {
  it('should return level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1)
  })

  it('should increment level every 100 XP', () => {
    expect(calculateLevel(100)).toBe(2)
  })
})
```

### Component Tests

Test React components with React Testing Library:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Hook Tests

Test custom hooks using renderHook:

```typescript
import { renderHook } from '@testing-library/react'
import { useUser } from '@/hooks/useUser'

describe('useUser', () => {
  it('returns user data', () => {
    const { result } = renderHook(() => useUser())
    expect(result.current.user).toBeDefined()
  })
})
```

## Best Practices

1. **Use Accessible Queries**: Prefer `getByRole`, `getByLabelText`, `getByPlaceholderText`
2. **Test Behavior, Not Implementation**: Test what users see and do
3. **Keep Tests Focused**: One concept per test
4. **Use Descriptive Names**: Test names should describe what's being tested
5. **Avoid Test Interdependencies**: Tests should be independent
6. **Mock External Dependencies**: Mock API calls, timers, etc.

## Mocking

### Mocking Functions

```typescript
import { vi } from 'vitest'

const mockFn = vi.fn()
const mockFnWithReturnValue = vi.fn(() => 'value')
```

### Mocking Modules

```typescript
import { vi } from 'vitest'

vi.mock('@/lib/supabase/client', () => ({
  createBrowserClient: vi.fn(() => ({
    auth: { getSession: vi.fn() }
  }))
}))
```

## Code Coverage

Generate coverage reports:

```bash
npm run test:coverage
```

Coverage thresholds are configured in `vitest.config.ts`. Aim for:

- **Statements**: 70%+
- **Branches**: 70%+
- **Functions**: 70%+
- **Lines**: 70%+

## Debugging Tests

### Use Debug Function

```typescript
import { render, screen } from '@testing-library/react'

const { debug } = render(<Component />)
debug() // Logs DOM to console
```

### Use Browser DevTools

```typescript
import { screen } from '@testing-library/react'

screen.logTestingPlaygroundURL()
```

### Use VS Code Debugger

Add breakpoints and run tests with debugger:

```bash
node --inspect-brk ./node_modules/vitest/vitest.mjs
```

## Continuous Integration

Tests run automatically on:

- Pre-commit (via git hooks)
- Pull requests
- Before production builds

Ensure all tests pass before merging.
