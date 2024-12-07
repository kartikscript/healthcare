"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"


export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA='textarea',
  PHONE_INPUT='phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton'
}



const PatientForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
        name: "",
        email:'',
        phone:''
      },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
      setIsLoading(true)
      console.log('submittingg',values)
      try {
        const userData = {
          name:values.name,
          email:values.email,
          phone:values.phone}
        const user = await createUser(userData)
        console.log('userr registerrr')
        if(user) router.push(`/patients/${user.$id}/register`)
      } catch (error) {
        console.log(error)
      }

    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
          <CustomFormField
           control={form.control}
           name="name"
           fieldType={FormFieldType.INPUT}
           label='Full Name'
           placeholder='John Doe'
           iconSrc='/icons/user.svg'
           iconAlt="user"
          />
          <CustomFormField
           control={form.control}
           name="email"
           fieldType={FormFieldType.INPUT}
           label='Email'
           placeholder='Johndoe@email'
           iconSrc='/icons/email.svg'
           iconAlt="email"
          />
          <CustomFormField
           control={form.control}
           name="phone"
           fieldType={FormFieldType.PHONE_INPUT}
           label='phone number'
           placeholder='enter you number'
          />
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    )
}

export default PatientForm