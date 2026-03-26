import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface StatItem {
  name: string;
  stat: string;
  change?: string;
  changeType?: "positive" | "negative";
  linkTo?: string;
  onClick?: () => void;
}

interface Stats03Props {
  data: StatItem[];
}

export default function Stats03({ data }: Stats03Props) {
  if (!data || data.length === 0) return null;

  const gridCols = data.length === 5 ? 'lg:grid-cols-5' : data.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';

  return (
    <div className="flex items-center justify-center w-full">
      <dl className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 w-full", gridCols)}>
        {data.map((item) => {
          const content = (
            <Card className="p-6 py-4 shadow-2xs group-hover:shadow-md transition-shadow h-full">
              <CardContent className="p-0">
                <dt className="text-sm font-medium text-muted-foreground group-hover:text-blue-600 transition-colors uppercase tracking-widest">{item.name}</dt>
                <dd className="mt-2 flex items-baseline space-x-2.5">
                  <span className="tabular-nums text-3xl font-semibold text-foreground">
                    {item.stat}
                  </span>
                  {item.change && (
                    <span
                      className={cn(
                        item.changeType === "positive"
                          ? "text-green-800 dark:text-green-400"
                          : "text-red-800 dark:text-red-400",
                        "text-sm font-medium",
                      )}
                    >
                      {item.change}
                    </span>
                  )}
                </dd>
              </CardContent>
            </Card>
          );

          if (item.linkTo) {
            return (
              <Link 
                key={item.name} 
                to={item.linkTo}
                className="group block outline-none cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={item.name}
              onClick={item.onClick}
              className={cn(
                "group block outline-none", 
                item.onClick && "cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              )}
            >
              {content}
            </div>
          );
        })}
      </dl>
    </div>
  );
}


