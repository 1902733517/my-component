import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button' 

const defaultButton = () => (
  <Button onClick={action('clicked')}> default button </Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
)

const buttonWithState = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="primary" disabled> disabled button </Button>
  </>
)

storiesOf('Button Component', module)
  .addParameters({
    info: {
      text: 'this is a very nice component',
      inline: true
    }
  })
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
  .add('不同状态的 Button', buttonWithState)