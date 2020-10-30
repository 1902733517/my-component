import React, { FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef} from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import classNames from 'classnames'


interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void;   
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete:FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState(value as string);
    const [sugestions, setSugestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [ showDropdown, setShowDropdown] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debouncedValue = useDebounce(inputValue, 500)

    useClickOutside(componentRef, ()=>{
        setSugestions([])
    })
    useEffect(() => {

        if(debouncedValue && triggerSearch.current) {
            setSugestions([])
            const results = fetchSuggestions(debouncedValue)
            if(results instanceof Promise) { //判断返回结果是否为异步请求
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSugestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSugestions(results)
                setShowDropdown(true)
                if (results.length > 0) {
                setShowDropdown(true)
                } 
            }
        } else {
            setShowDropdown(false)
        }
        setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])
    const highlight = (index: number) => {
        if(index < 0) index = 0
        if(index >= sugestions.length) index = sugestions.length - 1
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                if(sugestions[highlightIndex]) {
                    handleSelect(sugestions[highlightIndex])
                }
                break;
            case 'ArrowUp':
                highlight(highlightIndex - 1)
                break;
            case 'ArrowDown':
                highlight(highlightIndex + 1)
                break;
            case 'Escape':
                setSugestions([])
                break;   
            default:
                break;
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
          onSelect(item)
        }
        triggerSearch.current = false
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => {setSugestions([])}}
            >
                <ul className="wg-suggestion-list">
                    { loading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin/>
                        </div>
                    }
                    {sugestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                        <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                        )
                    })}
                </ul>
        </Transition>
        )
    }

    return (
        <div className="wg-auto-complete" ref={componentRef}>
            <Input 
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {generateDropdown()}

            {/* spin  icon 自带的旋转  className="loading"  手动书写旋转样式*/}
            {/* { loading && <Icon  icon="spinner"  spin />} 
            { (sugestions.length > 0) && generateDropdown()} */}
        </div>
    )

}
export default AutoComplete;
