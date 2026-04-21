import clsx from "clsx";

interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Card({ className, style, children }: CardProps) {
  return (
    <div
      style={style}
      className={clsx(
        `
        flex flex-col
        gap-4
        p-5 sm:p-6
        rounded-2xl
        bg-surface
        border border-border
        transition-all duration-300
        hover:border-accent/40
        hover:-translate-y-1
        hover:shadow-lg

        will-change-transform
        `,
        className
      )}
    >
      {children}
    </div>
  );
}