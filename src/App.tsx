import React, { useState } from 'react';
import './styles/index.scss';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import Tabs from './components/Tabs/tabs'
import TabPane from './components/Tabs/tabPane'
import { Input } from './components/Input/input'

function App() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([
    {name: '标签1'},
    {name: '标签2'},
    {name: '标签3', closePane: true},
    {name: '标签4'},
    {name: '标签5'},
  ])
  const closePane = (index: string) => {
    const arr = list.slice()
    arr.splice(Number(index), 1)
    setList(arr)
  }
  return (
    <div className="App">
      <Button>Button </Button>
      <Button disabled>disabled Button</Button>
      <Button btnType='danger'  size='sm'>Small Danger </Button>
      <Button btnType='primary' size='sm' disabled>disabled Danger </Button>
      <Button btnType='primary' size='lg'>Large Danger </Button>
      <Button btnType='link' href="www.baidu.com">Link</Button>
      <Button btnType='link' href="www.baidu.com" disabled>disabled Link</Button>
    
      <Menu onSelect={(index) => {alert(index)}} >
        <MenuItem>
          cool link 
        </MenuItem>
        <MenuItem disabled>
          cool link 2
        </MenuItem>
        <MenuItem>
          cool link 3
        </MenuItem>
        <SubMenu title="dropdown" >
          <MenuItem>
            drop1
          </MenuItem>
          <MenuItem>
            dropdown 2
          </MenuItem>
          <MenuItem>
            dropdown 3
          </MenuItem>
        </SubMenu>
      </Menu>
      <Button onClick={()=>{setShow(!show)}}>Button </Button>
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-right"
      >
        <div>
          <p>
            EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD
          </p>
          <p>
            EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD
          </p>
          <p>
            EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD
          </p>
          <p>
            EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD
          </p>
          <p>
            EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD
          </p>
          <p>
            EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD
          </p>
          </div>
      </Transition>
      <br />
      <br />
      <br />
      <Tabs activeKey="0"  type="editable-card" onEdit={closePane}>
        {
          list.map((item, index)=>{
            return (
              <TabPane tab={item.name} paneKey={index.toString()} closable={item.closePane} key={index}>
                <h1>这是h1标签<b>999</b></h1>
              </TabPane>
            )
          })
        }
      </Tabs>
      <br />
      <br />
      <div style={{marginLeft: '15px',}}>
        <Input icon="search" placeholder="placeholder"/>
        <br />
        <Input disabled placeholder="placeholder" />
        <br />
        <Input append=".com" placeholder="placeholder" />
        <br />
        <Input prepand="https:"placeholder="placeholder" />
        <br />
        <Input prepand="https:" append=".com" placeholder="placeholder" />
      </div>
      
    </div>
  );
}

export default App;
