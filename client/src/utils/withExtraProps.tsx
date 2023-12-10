import React, { ReactElement } from "react";

export function withExtraProps<T extends {}>(
  children: React.ReactNode,
): React.FC<T> {
  return function WrappedComponent(extraProps: T) {
    return (
      <>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as ReactElement, { ...extraProps })
            : child,
        )}
      </>
    );
  };
}
