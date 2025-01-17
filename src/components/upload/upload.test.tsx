import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import {render, RenderResult, fireEvent, wait} from '@testing-library/react'

import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
    return (icon:any) => {
        return <span>{icon}</span>
    }
})
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: "fakeurl.com",
    onSuccess: jest.fn(),
    onChange: jest.fn()
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLAreaElement;

const testFile = new File(['zly'], 'test.png', {type: 'image/png'})
describe('test upload component', () => {
    beforeEach(()=>{
        wrapper = render(<Upload {...testProps}> click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.wg-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('click to upload') as HTMLAreaElement
    })
    it('upload process should works fine', async () => {
        const { queryByText } = wrapper
        // mockedAxios.post.mockImplementation(()=>{
        //     return Promise.resolve({'data': 'cool'})
        // })
        mockedAxios.post.mockResolvedValue({'data': 'cool'})
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.change(fileInput, { target: {files: [testFile]}})
        
        expect(queryByText('spinner')).toBeInTheDocument()
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })
        expect(queryByText('check-circle')).toBeInTheDocument()
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
        expect(testProps.onChange).toHaveBeenCalledWith(testFile)
    }) 
})