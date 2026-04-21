import {
  createElement,
  type ComponentType,
  type ReactElement,
  type ReactNode,
  Suspense,
} from "react";
import dynamic from "next/dynamic";

interface LazyComponentConfig<Props> {
  component: ComponentType<Props>;
  loading?: ReactNode;
  delay?: number;
}

const defaultLoadingElement = createElement("div", {
  className: "h-96 animate-pulse",
});

export function lazyLoadComponent<Props>({
  component,
  loading = defaultLoadingElement,
  delay = 0,
}: LazyComponentConfig<Props>) {
  const DynamicComponent = dynamic(
    () =>
      Promise.all([
        new Promise<void>((resolve) => setTimeout(resolve, delay)),
        Promise.resolve({ default: component }),
      ]).then(([, module]) => module),
    {
      loading: () => loading as ReactElement | null,
      ssr: true,
    }
  );

  return DynamicComponent as ComponentType<Props>;
}

export function withSuspense<Props>(
  Component: ComponentType<Props>,
  fallback?: ReactNode
) {
  return function SuspenseWrapper(props: Props) {
    const SuspendedComponent = Component as ComponentType<Record<string, unknown>>;

    return createElement(
      Suspense,
      { fallback: fallback ?? defaultLoadingElement },
      createElement(SuspendedComponent, props as Record<string, unknown>)
    );
  };
}
