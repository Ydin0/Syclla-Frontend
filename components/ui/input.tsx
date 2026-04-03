import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/components/lib/utils"
import { Search } from "lucide-react"

const inputVariants = cva(
  "w-full border border-black/10 bg-black/[0.02] text-[13px] placeholder:text-black/40 focus:border-black/20 focus:outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "",
        search: "",
      },
      inputSize: {
        default: "h-11 rounded-lg px-4",
        sm: "h-9 rounded-lg px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, icon, type, ...props }, ref) => {
    if (variant === "search" || icon) {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize }),
              "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30">
            {icon || <Search className="size-4" />}
          </div>
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
