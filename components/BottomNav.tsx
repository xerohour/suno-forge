import Link from "next/link";
import { Wand2, Aperture, Library, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  active?: 'forge' | 'vision' | 'library' | 'profile';
  className?: string;
}

const ITEMS = [
  {
    id: 'forge',
    label: 'Forge',
    href: '/studio',
    icon: Wand2,
  },
  {
    id: 'vision',
    label: 'Vision',
    href: '/vision',
    icon: Aperture,
  },
  {
    id: 'library',
    label: 'Library',
    href: '/library',
    icon: Library,
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '#',
    icon: User,
  },
] as const;

export function BottomNav({ active, className }: BottomNavProps) {
  return (
    <nav
      style={{ bottom: 0 }}
      className={cn(
      "flex gap-2 border-t border-primary/10 bg-background-dark/95 px-4 pb-8 pt-3 backdrop-blur-lg absolute w-full z-30",
      className
    )}>
      {ITEMS.map((item) => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-end gap-1 transition-colors",
              isActive ? "text-primary" : "text-primary/40 hover:text-primary"
            )}
          >
            <Icon className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal tracking-widest uppercase">{item.label}</p>
          </Link>
        );
      })}
    </nav>
  );
}
