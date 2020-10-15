import React, { useState, useEffect } from 'react'

const useMousePosition = () => {
    
    const [site, setSite] = useState({x: 0, y: 0})
    useEffect(()=>{
        const updateMouse = (e: MouseEvent) =>{
            setSite({x: e.clientX, y: e.clientY})
        }
        document.addEventListener('click', updateMouse)
        return () => {
            document.removeEventListener('click', updateMouse)
        }
    }, [])
    return site
}

export default useMousePosition