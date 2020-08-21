import React from "react";
import classNames from "classnames";
import "./button.scss";

type Props = {
  className?: string;
  onClick?: (e?: any) => any;
  isActive?: boolean;
};
export const Button: React.FC<Props> = ({
  isActive,
  className,
  onClick,
  children,
}) => {
  let isClickable = isActive === true || isActive == null;
  return (
    <button
      className={classNames((className || "") + " button", {
        active: isClickable,
      })}
      onClick={(e: any) => isClickable && onClick && onClick(e)}
    >
      {children}
    </button>
  );
};
