import React from 'react';
import './styles/index.scss';
import Button, {ButtonType, ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
function App() {
  return (
    <div className="App">
      {/* <Button>Button </Button>
      <Button disabled>disabled Button</Button>
      <Button btnType={ButtonType.Danger}  size={ButtonSize.Small} >Small Danger </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small} disabled>disabled Danger </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Danger </Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com">Link</Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com" disabled>disabled Link</Button> */}
    
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
    </div>
  );
}

export default App;
