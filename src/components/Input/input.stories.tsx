import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Input } from './input'

const ControlledInput = () => {
    const [value, setValue] = useState('')
    return <Input value={value} defaultValue={value} onChange={(e) => {setValue(e.target.value)}}/>
  }


const defaultInput = () => (
    <>
        <Input  placeholder="placeholder"/>
        <br />
        <Input  placeholder="placeholder"  disabled/>
        <br />
        <Input  placeholder="input"  size="sm" />
        <br />
        <Input placeholder="placeholder"  icon="search" />
        <br />
        <Input placeholder="placeholder" prepand="http://" />
        <br />
        <Input placeholder="placeholder" append=".com" />
        <br />
        <Input placeholder="placeholder"  prepand="http:"  append=".com" />
    </>
    // <>
    //     <Input 
    //         style={{width: '300px'}}
    //         placeholder="placehoder"
    //         onChange={action('changed')}
    //     />
    //     <ControlledInput />
    // </>
)

storiesOf('Input Component', module)
  .add('Input', defaultInput)
