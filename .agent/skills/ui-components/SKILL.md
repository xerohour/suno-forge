---
name: UI Components with Radix & Tailwind
description: Building and styling UI components using Radix UI and Tailwind CSS
---

# UI Components Skill

This skill covers working with the UI component system in suno-forge, which uses Radix UI primitives and Tailwind CSS.

## Component Architecture

### Directory Structure
```
components/
├── ui/              # Radix UI primitives (button, select, label, etc.)
├── PromptEditor.tsx # Feature components
├── StyleControls.tsx
├── LyricsEditor.tsx
└── ...
```

### Component Categories
- **`components/ui/*`** - Base primitives (shadcn/ui style)
- **`components/*`** - Feature-specific components
- **`app/*/page.tsx`** - Page-level components

## Working with Radix UI

### Available Primitives
The project includes these Radix UI components:
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`
- `@radix-ui/react-select`
- `@radix-ui/react-slot`

### Adding New Radix Components

1. Install the component:
```bash
npm install @radix-ui/react-dialog
```

2. Create wrapper in `components/ui/`:
```typescript
// components/ui/dialog.tsx
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "bg-white rounded-lg p-6 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
```

3. Export from `components/ui/index.ts` (if exists)

## Tailwind CSS

### Configuration
Tailwind is configured in `tailwind.config.js` with:
- Custom color schemes
- Animation utilities (`tailwindcss-animate`)
- Design tokens

### Using Tailwind Classes
```typescript
// Good: Use utility classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-slate-100">

// Better: Use cn() for conditional classes
import { cn } from '@/lib/utils';

<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500 text-white",
  !isActive && "bg-gray-200 text-gray-700"
)}>
```

### Custom Utilities
Add to `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'suno-purple': '#8B5CF6',
        'suno-blue': '#3B82F6'
      },
      spacing: {
        '128': '32rem'
      }
    }
  }
}
```

## Component Patterns

### Feature Component Template
```typescript
// components/FeatureName.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FeatureNameProps {
  onSubmit: (data: any) => void;
  initialValue?: string;
}

export function FeatureName({ onSubmit, initialValue = '' }: FeatureNameProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div className="space-y-4">
      <Label>Feature Label</Label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
```

### Using Class Variance Authority (CVA)
```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'rounded font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-300 hover:bg-gray-100',
        ghost: 'hover:bg-gray-100'
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

## Styling Best Practices

### Responsive Design
```typescript
<div className="
  grid grid-cols-1           // Mobile: 1 column
  md:grid-cols-2             // Tablet: 2 columns
  lg:grid-cols-3             // Desktop: 3 columns
  gap-4
">
```

### Dark Mode Support
```typescript
// Using next-themes
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}

// In components, use dark: prefix
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
```

### Animations
```typescript
// Using tailwindcss-animate
<div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
  Content with entrance animation
</div>

// Custom transitions
<button className="transition-all duration-200 hover:scale-105">
  Hover me
</button>
```

## Icons with Lucide React

```typescript
import { Music, Sparkles, Download } from 'lucide-react';

<div className="flex items-center gap-2">
  <Music className="w-5 h-5 text-purple-500" />
  <span>Generate Music</span>
</div>
```

### Common Icons
- `Music`, `Music2`, `Music3`, `Music4` - Music-related
- `Sparkles`, `Wand2` - AI/generation
- `Download`, `Upload` - File operations
- `Play`, `Pause`, `SkipForward` - Media controls
- `Settings`, `Sliders` - Configuration

## Testing UI Components

### Manual Testing Checklist
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode appearance
- [ ] Keyboard navigation
- [ ] Screen reader accessibility
- [ ] Loading states
- [ ] Error states

### Accessibility
```typescript
// Good: Semantic HTML + ARIA
<button
  aria-label="Generate prompt"
  aria-pressed={isActive}
  disabled={isLoading}
>
  {isLoading ? 'Generating...' : 'Generate'}
</button>

// Labels for inputs
<Label htmlFor="style-select">Music Style</Label>
<select id="style-select">...</select>
```

## Common Issues

### Tailwind Classes Not Applying
1. Check `tailwind.config.js` content paths
2. Restart dev server after config changes
3. Ensure PostCSS is configured

### Radix Component Styling
- Use `className` prop, not `style` when possible
- Wrap in styled components if needed
- Check Radix docs for styling APIs

### Hydration Errors
- Avoid `useEffect` for initial render logic
- Use `suppressHydrationWarning` sparingly
- Ensure server/client HTML matches
