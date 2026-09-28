import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';

export function AnimatedList({ children, className = '', as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'ul' }) {
  const Component = as;
  return (
    <Component className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const element = child as ReactElement<{ className?: string; style?: CSSProperties }>;
        return cloneElement(element, {
          className: `animated-list-item ${element.props.className ?? ''}`,
          style: { ...element.props.style, '--list-index': index } as CSSProperties,
        });
      })}
    </Component>
  );
}
