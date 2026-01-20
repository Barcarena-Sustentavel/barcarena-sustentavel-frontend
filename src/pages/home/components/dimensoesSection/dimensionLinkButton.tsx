import React, { FC, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './dimension-link-button.css';

interface DimensionLinkButtonProps extends LinkProps {
  color: string;
  children: ReactNode;
  increaseIcon?: boolean;
}

const DimensionLinkButton: FC<DimensionLinkButtonProps> = ({
  color,
  children,
  increaseIcon = false,
  ...props
}) => {
  return (
    <Link
      {...props}
      className="dimension-link-button"
      style={{ ['--dim-color' as any]: `var(--${color})` }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const updatedInnerChildren = React.Children.map(
            child.props.children,
            (innerChild) => {
              if (React.isValidElement(innerChild)) {
                const element = innerChild as React.ReactElement<any>;
                const className = element.props.className || '';

                if (className.includes('icon-color') && increaseIcon) {
                  return React.cloneElement(element, {
                    className: `${className} increase-icon`.trim(),
                  });
                }
                return element;
              }
              return innerChild;
            }
          );

          return React.cloneElement(child, {
            ...child.props,
            children: updatedInnerChildren,
          });
        }

        return child;
      })}
    </Link>
  );
};

export default DimensionLinkButton;
