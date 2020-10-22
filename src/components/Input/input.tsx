import React, {FC, ReactElement, InputHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

//Omit 移除/忽略接口中的某个值
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean,
    size?: InputSize,
    icon?: IconProp,
    prepand?: string | ReactElement;
    append?: string | ReactElement;
}

 export const Input: FC<InputProps> = (props) => {
     const {
        disabled,
        size,
        icon,
        prepand,
        append,
        ...restProps
     } = props
     const classes = classNames("wg-input", {
        'is-disabled': disabled,
        [`input-`+ size]:size,
        'wg-input-append':append,
        'wg-input-prepand':prepand,
     })
    return (
        <div className={classes}>
            {
                prepand ? <div className="input-prepand">
                    { prepand }
                </div>: <></>
            }

            <input disabled={ disabled } {...restProps} />
            {
                icon ? <span className="input-icon">
                    <Icon  className="input-icon" icon={icon} /> 
                </span>: <></>
            }
            {
                append ? <div className="input-append">
                    { append }
                </div>: <></>
            }
            
        </div>
    )
 }