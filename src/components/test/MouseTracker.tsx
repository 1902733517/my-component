import React, { useState, useEffect } from 'react'

const MouseTracker: React.FC = () => {
    const [site, setSite] = useState({x: 0, y: 0})
    useEffect(()=>{
        const updateMouse = (e: MouseEvent) =>{
            console.log('mousemove 事件')
            setSite({x: e.clientX, y: e.clientY})
        }
        document.addEventListener('mousemove', updateMouse)
        return () => {
            document.removeEventListener('mousemove', updateMouse)
        }
    }, [])
    return (  // 做清除操作
        <p>X: {site.x}, Y: {site.y}</p>
    )
}

export default MouseTracker