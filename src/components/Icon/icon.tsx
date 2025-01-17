import  React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

import {fas} from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core" 
library.add(fas)


export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IconProps extends FontAwesomeIconProps {
    theme? : ThemeProps,
}


const Icon:React.FC<IconProps> = (props) => {
    const { className, theme, ...restPros } = props
    const classes = classNames('wg-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restPros} />
    )
}

export default Icon