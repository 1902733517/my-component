import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/test/Hello'
import LikeButton from './components/test/LikeButton'
import MouseTracker from './components/test/MouseTracker'
import useMousePosition from './components/test/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

interface IShowResult {
  message: string,
  status: string
}
interface IThemeProps {
  [key: string]:{color: string; background: string;}  //[key: string] key 不确定有几项
}

const  themes: IThemeProps = {
  light: {
    color: '#000',
    background: '#eee'
  },
  dark: {
    color: '#fff',
    background: '#222'
  }
}

const ThemeContext = React.createContext(themes.light)

export {ThemeContext}

function AppTest() {
  const [show, setShow] = useState(true)
  const site = useMousePosition();
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show]);
  const dogResult = data as IShowResult
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <button onClick={() => {setShow(!show)}}>获取图片</button>
          </p>
          { loading ? <p>加载中。。。</p> : <img src={dogResult && dogResult.message} /> }
          <Hello message='Hello world!' />
          <LikeButton />
          {/* { show && <MouseTracker /> } */}
          <p>X: {site.x}, Y: {site.y}</p>
        </header>
        </ThemeContext.Provider>
    </div>
  );
}

export default AppTest;
