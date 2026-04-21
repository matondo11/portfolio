import clsx from "clsx";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({ eyebrow, title, description, centered = false }: Props) {
  return (
    <div className={clsx("max-w-2xl", centered && "mx-auto text-center")}>
      <p className="text-xs font-mono font-semibold tracking-widest uppercase text-accent mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary leading-relaxed">{description}</p>
      )}
    </div>
  );
}
