import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as LucideIcons from 'lucide-react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconComponent(iconName: string) {
  const dict = (LucideIcons as unknown) as Record<string, React.ComponentType<{ className?: string }>>
  const maybe = dict[iconName]
  if (typeof maybe === 'function') {
    return maybe
  }
  return LucideIcons.Users
}
