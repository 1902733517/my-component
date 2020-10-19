import React, { useState } from 'react';
import './styles/index.scss';
import Button, {ButtonType, ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import Tabs from './components/Tabs/tabs'
import TabPane from './components/Tabs/tabPane'

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <Button>Button </Button>
      <Button disabled>disabled Button</Button>
      <Button btnType={ButtonType.Danger}  size={ButtonSize.Small} >Small Danger </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small} disabled>disabled Danger </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Danger </Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com">Link</Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com" disabled>disabled Link</Button>
    
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

      <Tabs activeKey="0" type="card">
        <TabPane tab="标签1" paneKey="0" ></TabPane>
        <TabPane tab="标签2" paneKey="1" disabled></TabPane>
        <TabPane tab="标签3" paneKey="2" ></TabPane>
      </Tabs>
    </div>
  );
}

export default App;
