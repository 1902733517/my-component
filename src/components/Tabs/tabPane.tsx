import React, { useContext, useRef } from 'react'
import classNames  from 'classnames'
import { TabsContext } from './tabs'
import Icon from '../Icon/icon'

export interface TabPaneProps {
    tab?: string,
    paneKey?: string,
    disabled?: boolean,
    closable?: boolean,
}

const TabPane:React.FC<TabPaneProps> = (props) => {
    const context = useContext(TabsContext)
    const {
        tab,
        paneKey,
        disabled,
        closable,
        children
    } = props
    const domRef =  useRef<HTMLDivElement>(null)
    const classes = classNames('tab-pane', {
        'tab-active': paneKey === context.index,
        'tab-disabled': disabled
    })
    const handleClick = () =>{
        if(context.onChange && !disabled && (typeof paneKey === 'string')) {
            context.onChange(paneKey, domRef.current as HTMLDivElement)
        }
    }
    const closeClick =  () => {
        if(context.onEdit && !disabled && (typeof paneKey === 'string')) {
            context.onEdit(paneKey)
        }
    }
    return (
        <div className={classes} onClick={() => {handleClick()}} ref={domRef}>
            {tab}
            {
                context.type == 'editable-card' && !closable ? 
                (<button className="tabs-tab-remove" onClick={() => {closeClick()}}>
                    <Icon  icon="times" />
                </button>) : ''
            }
            
        </div>
    )
}

export default TabPane