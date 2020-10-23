import React, { FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
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

    const [inputVale, setInputValue] = useState(value as string);
    const [sugestions, setSugestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)

    const debouncedValue = useDebounce(inputVale, 500)
    useEffect(() => {
        if(debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue)
            if(results instanceof Promise) { //判断返回结果是否为异步请求
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSugestions(data)
                  })
            } else {
                setSugestions(results)
            }
        } else {
            setSugestions([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
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

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSugestions([])
        if(onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            <ul>
                { sugestions.map((item, index) => {
                    const classes = classNames('suggestion-item', {
                        'item-highlighted' : index == highlightIndex
                    })
                    return (
                        <li key={index} className={classes} onClick={()=>{handleSelect(item)}}>
                            { renderTemplate(item) }
                        </li>
                    )
                }) }
            </ul>
        )
    }

    return (
        <div className="wg-auto-complete">
            <Input 
                value={inputVale}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {/* spin  icon 自带的旋转  className="loading"  手动书写旋转样式*/}
            {loading && <Icon  icon="spinner"  spin /> } 
            { (sugestions.length > 0) && generateDropdown()}
        </div>
    )

}