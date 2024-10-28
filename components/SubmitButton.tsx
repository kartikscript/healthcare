import React from 'react'
import { Button } from './ui/button'

interface ButtonProps{
  isLoading:boolean
  className?:string
  children:React.ReactNode
}
const SubmitButton = ({isLoading, className, children}:ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'w-full my-4 bg-emerald-600 text-white'}>
      {isLoading ?(
        <div>
            Loading...
        </div>
      ):
        children
      }
      
    </Button>
  )
}

export default SubmitButton