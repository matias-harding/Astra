"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          // Success
          '--success-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--success-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--success-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
          // Error
          '--error-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--error-text': 'var(--destructive)',
          '--error-border': 'var(--destructive)',
          // Warning
          '--warning-bg':
            'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
          '--warning-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
          '--warning-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
          // Info
          "--info-bg": 'color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))',
          "--info-text": "light-dark(var(--color-sky-600), var(--color-sky-400))",
          "--info-border": "light-dark(var(--color-sky-600), var(--color-sky-400))",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
