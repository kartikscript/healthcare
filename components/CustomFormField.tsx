import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './form/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


interface CustomProps{
  control:Control<any>
  fieldType:FormFieldType
  name:string
  label?:string
  placeholder?:string
  iconSrc?:string
  iconAlt?:string
  disabled?:boolean
  dateFormat?:string
  showTimeSelect?:boolean
  children?:React.ReactNode
  renderSkeleton?:(field:any)=>React.ReactNode
}

const RenderField = ({props,field}:{props:CustomProps,field:any}) =>{
  
     const {fieldType, iconSrc, iconAlt, placeholder} = props

    if(fieldType === FormFieldType.INPUT){
      return(
        <div className='flex border-2 border-gray-900  px-2 text-sm rounded-lg bg-gray-800'>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              width={20}
              height={20}
              className=''
            />
          )}
          <FormControl>
            <Input
            placeholder={placeholder}
            {...field}
            className='border-0 '
            />
          </FormControl>
        </div>
      )
    }
    else if(fieldType === FormFieldType.PHONE_INPUT){
      return(
          <FormControl>
            <PhoneInput
            defaultCountry='IN'
            international
            value={field.value}
            onChange={field.onChange}
            countryCallingCodeEditable
            className='border-2 border-gray-900 p-2 text-black  rounded-lg bg-gray-800'
            />
          </FormControl>
      )
    }
}



const CustomFormField = (props:CustomProps) => {
  const {control,fieldType,name,label,placeholder} = props
  return (

  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {fieldType !== FormFieldType.CHECKBOX && label && (
          <FormLabel>{label}</FormLabel>
        )}
      {/* there we will show input of any type we pass like checkbox, number ,date */}
        <RenderField field={field} props={props}/>
      {/* for displaying mssg if any conflict in input user makes */}
        <FormMessage/>
      </FormItem>
    )}
  />


  )
}

export default CustomFormField

// <FormItem>
// <FormLabel>Username</FormLabel>
// <FormControl>
//   <Input placeholder="shadcn" {...field} />
// </FormControl>
// <FormDescription>
//   This is your public display name.
// </FormDescription>
// <FormMessage />
// </FormItem>