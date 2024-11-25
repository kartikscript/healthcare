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
import { Calendar } from 'lucide-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'


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
  
     const {fieldType, iconSrc, iconAlt, placeholder,dateFormat,showTimeSelect,renderSkeleton,children} = props

    if(fieldType === FormFieldType.INPUT){
      return(
        <div className='flex border-2 border-gray-800   text-sm rounded-lg bg-gray-900'>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              width={20}
              height={20}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
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
            className='border-2 border-gray-800 p-2 text-black  rounded-lg bg-gray-900'
            />
          </FormControl>
      )
    }
    else if(fieldType === FormFieldType.DATE_PICKER){
      return(
        <div className='flex items-center gap-3 text-sm p-2 text-white bg-gray-900 border-2 border-gray-800 rounded-lg'>
          <Calendar className='size-5'/>
          <FormControl>
           <DatePicker 
            className='bg-transparent '
            selected={field.value}
            onChange={(date) => field.onChange(date)} 
            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
            showTimeSelect={showTimeSelect ?? false}
            timeInputLabel='Time:'
           />
          </FormControl>
        </div>
      )
    }
    else if(fieldType === FormFieldType.SELECT){
      return(
        <FormControl>
          <Select
           onValueChange={field.onChange} 
           defaultValue={field.value} 
          >
            <SelectTrigger className='px-2 py-5 border-gray-800'>
              <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
           <SelectContent className='bg-gray-900 text-white border-gray-800'>
            {children}
           </SelectContent>
          </Select>
        </FormControl>
      )
    }
    else if(fieldType === FormFieldType.TEXTAREA){
      return(
        <FormControl>
          <Textarea 
           className='h-24 bg-gray-900 border-2 border-gray-800 remove-scrollbar'
           placeholder={placeholder}
           {...field}
           disabled={props.disabled}
          />
        </FormControl>
      )
    }
    else if(fieldType === FormFieldType.CHECKBOX){
      return(
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
             id={props.name}
             checked={field.value}
             onCheckedChange={field.onChange}
            />
            <label className='text-sm text-gray-300' htmlFor={props.name} >
              {props.label}
            </label>
          </div>
        </FormControl>
      )
    }
    else if(fieldType === FormFieldType.SKELETON){
      return renderSkeleton ? renderSkeleton(field) : null
    }
}



const CustomFormField = (props:CustomProps) => {
  const {control,fieldType,name,label,placeholder} = props
  return (

  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex-1'>
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