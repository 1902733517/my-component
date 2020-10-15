import React from 'react';
import './styles/index.scss';
import Button, {ButtonType, ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
function App() {
  return (
    <div className="App">
      <Button>Button </Button>
      <Button disabled>disabled Button</Button>
      <Button btnType={ButtonType.Danger}  size={ButtonSize.Small} >Small Danger </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small} disabled>disabled Danger </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Danger </Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com">Link</Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com" disabled>disabled Link</Button>
    
      <Menu>
        <MenuItem index={0}>
          cool link 
        </MenuItem>
        <MenuItem index={1}>
          cool link 2
        </MenuItem>
        <MenuItem index={2}>
          cool link 3
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
