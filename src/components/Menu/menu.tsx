import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode  = 'horizontal' | 'vertical'
type SelectCallBack = (selectIndex: string) => void

export interface MenuProps {
    defaultIndex?: string
    className?: string
    mode?: MenuMode
    style?: React.CSSProperties
    onSelect?: SelectCallBack
    defaultOpenSubMenus?: string[]
}

interface IMenuContext {
    index: string,
    onSelect?: SelectCallBack
    mode?: MenuMode
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu:React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props
    const [ active, setActive ] = useState(defaultIndex)
    const classes = classNames('wg-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: active ? active : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }
    const renderChildern = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>  //as 断言 断言成某种具体类型
            const { displayName } = childElement.type
            if(displayName == 'MenuItem' || displayName === 'SubMenu') {
                // return child
                return React.cloneElement(childElement, {index: index.toString()})  //混入·index
            } else {
                console.log('Warn: Menu 不存在 MenuItem子项')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {/* {children} */}
                {renderChildern()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal'
}

export default Menu