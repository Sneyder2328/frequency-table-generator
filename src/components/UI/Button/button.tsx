import React from "react";
import classNames from "classnames";
import "./button.scss"

type Props = {
    className?: string;
    onClick?: () => any;
    isActive?: boolean;
}
export const Button: React.FC<Props> = ({isActive, className, onClick, children}) => {
    return (
        <button className={classNames((className || "") + " button", {'active': isActive === true || isActive == null})}
                onClick={() => isActive && onClick && onClick()}>{children}
        </button>
    )
}