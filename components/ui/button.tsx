import * as React from "react"
import { Pressable, Text } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md mx-4",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-red-500",
        outline: "border border-border bg-transparent",
        ghost: "bg-transparent",
        custom: "bg-amber-500",
      },
      size: {
        sm: "h-8 w-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const textVariants = cva(
  "font-medium text-center",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        secondary: "text-secondary-foreground",
        destructive: "text-white font-bold ",
        outline: "text-foreground",
        ghost: "text-foreground",
        custom: "text-white font-bold",
      },
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

type ButtonProps =
  React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    title: string
  }

export function Button({
  title,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      accessibilityRole="button"
      {...props}
    >
      <Text className={textVariants({ variant, size })}>
        {title}
      </Text>
    </Pressable>
  )
}
