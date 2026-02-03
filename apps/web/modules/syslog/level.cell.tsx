import { Badge } from "@workspace/ui/components/badge";
import { ReactNode } from "react";

export const getLevelText = (level: number): ReactNode => {
  switch (level) {
    case 1:
      return (
        <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">DEBUG</Badge>
      );
    case 2:
      return (
        <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          INFO
        </Badge>
      );
    case 3:
      return (
        <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          WARNING
        </Badge>
      );
    case 4:
      return (
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">ERROR</Badge>
      );
  }
};
