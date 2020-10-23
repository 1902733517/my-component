import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface LakerPlayerProps {
    value: string;
    number: number 
}

const SimpleComplete = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 
    'james', 'AD', 'freen', 'howard', 'kuzma', 'McGee', 'rando']

    const lakersWithObject = [
        { value: 'cook', number: 2 },
        { value: 'cousins', number: 15 },
        { value: 'james', number: 23 },
        { value: 'AD', number: 3 },
        { value: 'green', number: 17 },
        { value: 'howard', number: 39 },
        { value: 'kuzma', number: 0 },
    ]

    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map(name => ({value: name}));
    // }

    // const handleFetch = (query: string) => {
    //     return lakersWithObject.filter(player => player.value.includes(query))
    // }

    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
          .then(res => res.json())
          .then(({ items }) => {
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
          })
      }


    const  renderOption  = (item: DataSourceType) => {
        const asItem  = item as DataSourceType<LakerPlayerProps>
        return (
            <p>
                <label>name: {asItem.value}</label>
                <label style={{paddingLeft: '5px'}}>number: {asItem.number}</label>
            </p>
        )
    }
    return(

        <AutoComplete 
            fetchSuggestions={handleFetch}
            onSelect={action('select')}
            // renderOption={renderOption}
        />
    )
}

storiesOf('AutoComplete Component', module)
.add('AutoComplete', SimpleComplete)