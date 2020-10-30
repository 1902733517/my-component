import React, { FC } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
import Progress from '../Progerss/progress';

interface UploadListProps {
    fileList: UploadFile[],
    onRemove: (_file: UploadFile) => void
}

export const UploadList:FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove
    } = props
    return (
        <ul className="wg-upload-list">
            { fileList.map(item => {
                return (
                    <li className="wg-upload-list-item" key={item.uid}>
                        <div className="list-content">
                            <Icon icon="paste" className={`file-icon file-name-${item.status}`} />
                            <span className={`file-name file-name-${item.status}`}>{item.name}</span>
                            <span className="file-status">
                                { item.status == "uploading" && <Icon icon="spinner" spin color="#3385fd" /> }
                                { item.status == 'success' && <Icon icon="check-circle" color="#1b926c" /> }
                                { item.status == 'error' && <Icon icon="times-circle" color="#f73131" /> }
                            </span>
                            <Icon className="file-action" icon="times" onClick={() => { onRemove(item) } } />
                        </div>
                        { item.status == 'uploading' && 
                            <Progress percent={item.percent || 0} />
                        } 
                    </li>
                )
            }) }
        </ul> 
    )
}

export default UploadList

