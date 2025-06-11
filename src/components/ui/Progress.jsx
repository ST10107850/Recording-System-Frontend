import React, { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../lib/utils";

const Progress = forwardRef(({ className, value = 0, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-300", 
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-gray-950 transition-all duration-300 ease-in-out" 
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
export { Progress };
