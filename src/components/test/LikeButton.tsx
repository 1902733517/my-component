import React, { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from '../../AppTest'

const LikeButtonLink: React.FC = () => {
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);
    const likeRef = useRef(0)
    const domRef = useRef<HTMLInputElement>(null)
    const theme = useContext(ThemeContext)
    useEffect(()=>{
        document.title = `点击${like}次` 
    }, [like])
    useEffect(()=>{
        if(domRef && domRef.current) {
            domRef.current.focus()
        }
    })

    return (
        <>
            <input type="text"  ref={domRef}/>
            <button onClick={() => {setLike(on ?  like + 1 : like - 1); likeRef.current++;}} style={theme}>
                {like} 赞
            </button>
            <button onClick={()=>{setOn(!on)}}>
                {on ? '赞': '踩'}
            </button>
            <button onClick = {() => {setTimeout(()=>{alert(likeRef.current)}, 2000)}}>弹窗</button>
        </>
    )
}

export default LikeButtonLink