import React from 'react'
import { storiesOf } from '@storybook/react'
import { action  } from '@storybook/addon-actions'
import { Upload } from './upload'
import Button from '../Button/button'


const checkFileSize = (file: File) => {
    if(Math.round(file.size / 1024) > 50) {
        alert("文件太大");
        return false
    } 
    return true
}
const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', {type: file.type})
    return Promise.resolve(newFile)  //返回一个以给定值解析后的Promise 对象
}

const SimpleUpload = () => {
    return(
        <Upload 
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action("error")}
            name="fileName"
            data={{'key': 'value'}}
            headers={{'token': '10086'}}
            accept=".jpg"
            multiple
            // beforeUpload={checkFileSize}
            // beforeUpload={filePromise}
        >
            <Button btnType="primary" >上传多图</Button>
        </Upload>
    )
}

storiesOf('Upload component', module)
.add('Upload', SimpleUpload)