import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
  centerAction?: React.ReactNode;
  className?: string;
  // Style props
  inactiveIconClassName?: string;
  inactiveLabelClassName?: string;
  activeIconClassName?: string;
  activeLabelClassName?: string;
}

export function BottomNav({
  items,
  centerAction,
  className,
  inactiveIconClassName,
  inactiveLabelClassName,
  activeIconClassName,
  activeLabelClassName,
}: BottomNavProps) {
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = centerAction ? items.slice(0, midpoint) : items;
  const rightItems = centerAction ? items.slice(midpoint) : [];

  const renderItem = (item: NavItem) => (
    <Link
      key={item.label}
      href={item.href}
      className="flex flex-col items-center gap-1 group"
    >
      <item.icon
        className={cn(
          "w-6 h-6 transition-colors",
          item.isActive ? activeIconClassName : inactiveIconClassName
        )}
      />
      <span
        className={cn(
          "text-[10px] font-medium uppercase tracking-wider transition-colors",
          item.isActive ? activeLabelClassName : inactiveLabelClassName
        )}
      >
        {item.label}
      </span>
    </Link>
  );

  return (
    <nav className={cn('flex items-center justify-around z-40', className)}>
      {leftItems.map(renderItem)}

      {centerAction && (
        <div className="relative -top-5">
          {centerAction}
        </div>
      )}

      {rightItems.map(renderItem)}
    </nav>
  );
}
