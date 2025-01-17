import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import{ MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
}

const SubMenu:React.FC<SubMenuProps> = ({index, title, className, children}) => {
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus ? context.defaultOpenSubMenus as Array<string> : [];
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpend);

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }

    let timer: any 
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        timer = setTimeout(()=>{
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode  === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    }: {}
    const renderChildern = () => {
        const subMenuClasses = classNames('wg-submenu', {
            'menu-opened' : menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement  = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName == 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.log('Warning: Menu 不存在 MenuItem子项')
            }
        })
        return(  //unmountOnExit   动态增删子组件
            <Transition 
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >   
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down"  className="arrow-icon" />
            </div>
            
            {renderChildern()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu