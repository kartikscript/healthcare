'use client'
import { convertFileToUrl } from '@/lib/utils'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
  files :File[] | undefined,
  onChange: (files:File[])=> void
}
const FileUploader =({files,onChange}:FileUploaderProps)=> {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    // Do something with the files
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='bg-gray-900 min-h-32 cursor-pointer flex items-center justify-center border-dashed border-2 border-gray-800 rounded-lg '>
      <input {...getInputProps()} />
      {
        files && files?.length>0 ?(
          // to show uploaded image
          <Image
           src={convertFileToUrl(files[0])}
           width={600}
           height={600}
           alt='uploaded file'
           className='object-contain '
          />
        ):(
          <div className='flex-col flex justify-center items-center text-gray-700 text-sm'>
           <UploadCloud className='bg-gray-800 text-emerald-700 my-2  p-1 size-7 rounded-xl'/>
           <p className=''>
            <span className='text-emerald-600'>Click to upload </span>
            or drag and drop
           </p>
           <p >SVG, PNG, JPG or Gif (max 800x400)</p>
          </div>
        )
      }
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
    </div>
  )
}
export default FileUploader