import React, { useState, createContext } from 'react';
import classNames from 'classnames'
import { types } from 'util';

type position = 'top' | 'bottom' | 'left' | 'right'
type tabsType = 'card' | 'line' | 'editable-card'

export interface ITabsProps {
    tabsPosition?: position,
    type?: tabsType,
    activeKey?: string,
    onChange?: (index: string) => void,
    onEdit?: (index:string) => void
}

interface ITabsContext {
    index: string,
    type?: tabsType,
    onChange?: (index: string, e:HTMLDivElement ) => void,
    onEdit?: (index: string) => void,
}

export const TabsContext = createContext<ITabsContext>({index: '0'})

const Tabs: React.FC<ITabsProps> = (props) => {
    const {
        type,
        tabsPosition,
        children,
        activeKey,
        onChange,
        onEdit
    } = props
    console.log(children)
    const classes = classNames('wg-tabs', {
        [`tabs-${tabsPosition}`]: tabsPosition,
        [`tabs-${type}`]: type
    })

    const [ active, setActive ] = useState(activeKey)
    const [site, setSite] = useState({width: '50px', left: '0px'})

    const handleClick = (index: string, e:any) => {
        setActive(index)
        setSite({width: (e ? e.offsetWidth : 0 +'px'), left:  (e? e.offsetLeft : 0 +'px')})
        if(onChange) {
            onChange(e.current)
        }
    }
    const editClick = (index: string) => {
        if(onEdit) {
            onEdit(index)
        }
    }
    const passContext:ITabsContext = {
        index: active ? active : '0',
        type: type,
        onChange: handleClick,
        onEdit: editClick,
    }

    return (
        <div className={classes}>
            <div className="tabs-title">
                <TabsContext.Provider value={passContext}>
                    { children }
                    <div className="tabs-ink-bar" style={site}></div>
                </TabsContext.Provider>
            </div>
            <div className="tabs-content">
                {
                    
                }
            </div>
        </div>
    )
}
Tabs.defaultProps = {
    tabsPosition: 'top',
    type: 'line'
}

export default Tabs