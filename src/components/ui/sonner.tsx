import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * ShriNeo toast host.
 * Temporary, non-critical feedback only — outcomes such as approval,
 * rejection or payment failure must live in persistent page or modal state.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      duration={6000}
      closeButton
      gap={10}
      offset={16}
      mobileOffset={{ bottom: 88, left: 16, right: 16 }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-[var(--shadow-overlay)] group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-success",
          error: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-destructive",
          warning: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-warning",
          info: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-info",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
