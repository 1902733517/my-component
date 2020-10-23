import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import classNames from 'classnames'
import { type } from 'os'

type ButtonSize ='lg'|'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'


interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType,
    children: React.ReactNode;
    href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps> & Partial<AnchorButtonProps>  //Partial属性可选

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        btnType,
        size,
        disabled,
        children,
        href,
        ...restProps  //剩余属性
    } = props

    const classes = classNames('btn', className,  {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if(btnType === 'link' && href){
        return (
            <a 
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default',
}

export default Button