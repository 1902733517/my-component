import React, { ChangeEvent, Children, FC, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import Icon from '../Icon/icon'
import {UploadList} from "./uploadList"

export type UploadFilestatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string,
    size: number,
    name: string,
    status?: UploadFilestatus,
    percent?: number,
    raw?: File
    response?: any,
    error?: any
}

export interface UploadProps {
    action: string,
    defaultFileList?: UploadFile[], //默认上传图标列表
    beforeUpload?: (file: File) => boolean | Promise<File>,
    onProgress?: (percentage: number, file: File) => void,
    onSuccess?: (data:any, file: File) => void,
    onError?: (err: any, file: File) => void,
    onChange?: (file: File) => void,
    onRemove?: (file: UploadFile) => void,

    headers?: {[key: string]: any},
    name?: string,
    data?: {[key: string]: any},
    withCredentials?: boolean,

    accept?: string,
    multiple?: boolean
}


export const Upload:FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children
    } 
    = props
    const fileRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    //更新数组中的部分值  Partial  更新其中的任意几项
    const updateFileList = (uploadFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if(file.uid === uploadFile.uid) {
                    return { ...file, ...updateObj}
                } else {
                    return file
                }
            })
        })
    }
    const handleClick =() => {
        if(fileRef.current) {
            fileRef.current.click();
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files){return;}
        uploadFiles(files);
        if(fileRef.current) {
            fileRef.current.value = '';
        }
        
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if(onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if(beforeUpload) {
               const result = beforeUpload(file)
               if(result && result instanceof Promise) {
                   result.then(processedFile => {
                       post(processedFile)
                   })
               } else if (result != false) {
                   post(file)
               }
            } else  {
                post(file);
            }
           
        })
    }  
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + '_file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList]) // 无法时时拿到最新值
        setFileList( prevList =>{
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if(data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if(percentage < 100) { //prevList 之前列表
                    // setFileList((prevList) => {
                    //     return prevList
                    // })
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if(onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(response => {
            updateFileList(_file, {status: 'success', response: response.data})
            if(onSuccess) {
                onSuccess(response.data, file)
            }
            if(onChange) {
                onChange(file)
            }
        }).catch(error => {
            console.error(error)
            updateFileList(_file, {status: 'error', response: error})
            if(onError) {
                onError(error, file)
            }
            if(onChange) {
                onChange(file)
            }
        })
    }
    console.log(fileList);

    return (
       <div className="wg-upload-component">
            <div className="wg-upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                {children}
                <input 
                    type="file" 
                    className="wg-file-input"
                    style={{display: 'none'}}
                    onChange={ handleChange }
                    ref={fileRef}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList 
                fileList={ fileList }
                onRemove={ handleRemove }
            />
       </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}
export default Upload