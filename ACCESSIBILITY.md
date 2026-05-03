# Accessibility Guidelines

This document outlines accessibility best practices implemented in VoteVerse AI.

## ARIA Labels and Attributes

All interactive elements should have proper ARIA labels:

```jsx
// Good - explicit aria-label
<button aria-label="Close menu">×</button>

// Good - aria-labelledby 
<nav aria-labelledby="nav-heading">
  <h2 id="nav-heading">Navigation</h2>
  ...
</nav>

// Good - label element
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

## Keyboard Navigation

All components must be keyboard accessible:

- Tab order should be logical and intuitive
- Buttons and links should be keyboard focusable
- Modals should trap focus
- Escape key should close modals/dropdowns

## Color Contrast

Maintain WCAG AA compliance:

- Normal text: 4.5:1 contrast ratio
- Large text (18pt+): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

## Semantic HTML

Use semantic elements:

- `<button>` for clickable elements
- `<nav>` for navigation
- `<main>` for main content
- `<article>` for independent content
- `<header>`, `<footer>` for page sections

## Image Alt Text

All images must have descriptive alt text:

```jsx
<img src="avatar.jpg" alt="User profile photo" />
```

## Headings

Maintain proper heading hierarchy:

```jsx
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

## Form Accessibility

Forms should be accessible:

```jsx
<label htmlFor="username">Username</label>
<input id="username" aria-describedby="username-hint" />
<div id="username-hint">Use 3-20 characters</div>
```

## Testing Accessibility

Run ESLint to catch accessibility issues:

```bash
npm run lint
```

Use testing library with accessible queries:

```jsx
// Good - accessible query
screen.getByRole('button', { name: /submit/i })

// Avoid - inaccessible query
screen.getByTestId('submit-button')
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)
