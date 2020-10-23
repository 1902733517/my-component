import React, {FC, ReactElement, InputHTMLAttributes, ChangeEvent, useState } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import { type } from 'os'

type InputSize = 'lg' | 'sm'

//Omit 移除/忽略接口中的某个值
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    /**是否禁用 Input */
    disabled?: boolean,
     /**设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize,
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp,
    /**添加前缀 用于配置一些固定组合 */
    prepand?: string | ReactElement,
    /**添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

 export const Input: FC<InputProps> = (props) => {
     const {
        disabled,
        size,
        icon,
        prepand,
        append,
        style,
        ...restProps
     } = props
     const classes = classNames("wg-input", {
        'is-disabled': disabled,
        [`input-`+ size]:size,
        'wg-input-group': prepand || append,
        'wg-input-append': !!append,
        'wg-input-prepand': !!prepand,
     })
     const fixControlledValue = (value: any) => {
        if(typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
     }
     if('value' in props) {  //避免 value 和 defaultValue 同时存在， 导致的控制台报错
         delete restProps.defaultValue
         restProps.value = fixControlledValue(props.value);
     }
    return (
        <div className={classes} style={style}>
            { prepand && <div className="input-prepand">{ prepand }</div>}
            { icon && <span className="input-icon"> <Icon  className="input-icon" icon={icon} /> </span> }
            <input disabled={ disabled } {...restProps} />
            { append && <div className="input-append"> { append } </div> }
        </div>
    )
 }

 export default Input