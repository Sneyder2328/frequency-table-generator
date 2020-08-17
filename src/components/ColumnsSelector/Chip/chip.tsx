import React, {useState} from 'react';
import classnames from 'classnames';
import "./chip.scss";

type Props = {
    label: string;
    isActive: boolean;
    isEditable: boolean;

}

export const Chip: React.FC<Props> = (props) => {
    const [isActive, setActive] = useState(props.isActive)

    const handleClick = () => {

    };

    return (
        <div className={classnames('chip', {'active': isActive, 'editable': props.isEditable})} onClick={handleClick}>
            <span>{props.label}</span>
        </div>
    )
}