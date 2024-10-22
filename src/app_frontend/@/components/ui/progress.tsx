import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary my-2",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="w-full flex-1 bg-primary transition-all rounded-lg p-1 "
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <h1 className="font-heading font-semibold text-sm text-center text-gray-500">
      {value}% done
    </h1>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
