import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useURLLoader = (url: string, deps: any[] = []) => {  //deps 在什么情况下触发数据的加载   
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get(url).then(result => {
            setData(result.data);
            setLoading(false);
        })
    }, deps)

    return [data, loading]
}

export default useURLLoader