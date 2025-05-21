import { cn } from "@/lib/utils";

interface PriceFormatterProps {
  price: number;
  currency?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceFormatter({
  price,
  currency = "USD",
  className,
  size = "md",
}: PriceFormatterProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedPrice = formatter.format(price);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg font-medium",
    lg: "text-2xl font-semibold",
  };

  return (
    <span className={cn(sizeClasses[size], className)}>
      {formattedPrice}
    </span>
  );
}