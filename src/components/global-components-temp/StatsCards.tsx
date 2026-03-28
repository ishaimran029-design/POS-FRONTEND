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
            <Card className="min-h-[140px] flex flex-col p-7 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-600/5 transition-all duration-300 group-hover:scale-[1.02] rounded-[32px] relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 dark:bg-slate-800/20 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
              
              <CardContent className="p-0 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <dt className="text-[10px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 transition-colors uppercase tracking-[0.15em]">{item.name}</dt>
                  {item.change && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-sm border whitespace-nowrap",
                        item.changeType === "positive"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40"
                          : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/40",
                      )}
                    >
                      {item.change}
                    </span>
                  )}
                </div>
                
                <dd className="mt-auto">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white break-words group-hover:translate-x-1 transition-transform inline-block">
                    {item.stat}
                  </span>
                </dd>
              </CardContent>
            </Card>
          );

          if (item.linkTo) {
            return (
              <Link 
                key={item.name} 
                to={item.linkTo}
                className="group block outline-none h-full"
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


