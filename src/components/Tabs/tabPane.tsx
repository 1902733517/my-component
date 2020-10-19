import React, { useContext, useRef } from 'react'
import classNames  from 'classnames'
import { TabsContext } from './tabs'

export interface TabPaneProps {
    tab?: string,
    paneKey?: string,
    disabled?: boolean
}

const TabPane:React.FC<TabPaneProps> = (props) => {
    const context = useContext(TabsContext)
    const {
        tab,
        paneKey,
        disabled,
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
    return (
        <div className={classes} onClick={() => {handleClick()}} ref={domRef}>
            {tab}
        </div>
    )
}

export default TabPane