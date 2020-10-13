import React, { useState } from 'react'
import { ListFormat } from 'typescript';

const LikeButtonLink: React.FC = () => {
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);
    return (
        <>
            <button onClick={() => {setLike(on ?  like + 1 : like - 1)}}>
                {like} 赞
            </button>
            <button onClick={()=>{setOn(!on)}}>
                {on ? '赞': '踩'}
            </button>
        </>
    )
}

export default LikeButtonLink