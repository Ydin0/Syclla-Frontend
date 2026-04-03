import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/components/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-black/80",
        secondary: "border border-black/10 bg-white hover:bg-black/[0.02]",
        outline: "border-2 border-black hover:bg-black/[0.02]",
        ghost: "text-black/60 hover:bg-black/[0.02] hover:text-black",
        icon: "text-black/40 hover:bg-black/5 hover:text-black",
        link: "text-black/60 hover:text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 text-sm rounded-full gap-2",
        lg: "h-11 px-6 text-sm rounded-full gap-2",
        sm: "h-8 px-3 text-xs rounded-full gap-2",
        icon: "size-9 rounded-full",
        ghost: "px-3 py-2 text-[13px] rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
