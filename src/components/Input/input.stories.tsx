import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Input } from './input'

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
)

storiesOf('Input Component', module)
  .add('Input', defaultInput)
