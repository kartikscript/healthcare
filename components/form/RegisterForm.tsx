"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"


// export enum FormFieldType {
//   INPUT = 'input',
//   TEXTAREA='textarea',
//   PHONE_INPUT='phoneInput',
//   CHECKBOX='checkbox',
//   DATE_PICKER='datePicker',
//   SELECT='select',
//   SKELETON='skeleton'
// }



const RegisterForm = ({user}:{user:User}) => {
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
    async function onSubmit({email,name,phone}: z.infer<typeof UserFormValidation>) {
      setIsLoading(true)

      try {
        const userData = {name,email,phone}
        const user = await createUser(userData)

        if(user) router.push(`/patients/${user.$id}/register`)
      } catch (error) {
        console.log(error)
      }

    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
          <h1 className="font-semibold text-2xl my-6">Personal Information</h1>
          <CustomFormField
           control={form.control}
           name="username"
           fieldType={FormFieldType.INPUT}
           label='Full Name'
           placeholder='John Doe'
           iconSrc='/icons/user.svg'
           iconAlt="user"
          />
          <div className="flex gap-6">
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
            name="phone-number"
            fieldType={FormFieldType.PHONE_INPUT}
            label='phone number'
            placeholder='enter you number'
            />
          </div>
          <div className="flex gap-6">
            <CustomFormField
              control={form.control}
              name="birthDate"
              fieldType={FormFieldType.DATE_PICKER}
              label='Date of Birth'
              // iconSrc='/icons/email.svg'
              // iconAlt="email"
            />
            <CustomFormField
              control={form.control}
              name="gender"
              fieldType={FormFieldType.SKELETON}
              label='Gender'
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                   className="flex gap-4"
                   defaultValue={field.value}
                   onValueChange={field.onChange}
                  >
                   {
                    GenderOptions.map((option)=>(
                      <div key={option} className="bg-gray-800 space-x-1 p-2 rounded-lg border-2 border-gray-900 text-sm">
                        <RadioGroupItem value={option} id={option} className="border-white  text-white"/>
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))
                   }
                  </RadioGroup>
                </FormControl>
                 )}
            />
          </div>
          <div className="flex gap-6">
            <CustomFormField
              control={form.control}
              name="address"
              fieldType={FormFieldType.INPUT}
              label='Address'
              placeholder='14th Street, New York'
            />
            <CustomFormField
              control={form.control}
              name="occupation"
              fieldType={FormFieldType.INPUT}
              label='Occupation'
              placeholder='Software Engineer'
            />
          </div>
          <div className="flex gap-6">
            <CustomFormField
              control={form.control}
              name="emergencyContactName"
              fieldType={FormFieldType.INPUT}
              label='Emergency contact name'
              placeholder='Guardian&apos;s name'
            />
            <CustomFormField
              control={form.control}
              name="emergencyContactNumber"
              fieldType={FormFieldType.PHONE_INPUT}
              label='Emergency contact number'
              placeholder='1234 567 890'
            />
          </div>
          <h1 className="font-semibold text-2xl my-6">Medical Information</h1>
          <CustomFormField
            control={form.control}
            name="primaryPhysician"
            fieldType={FormFieldType.SELECT}
            label='Primary Physician'
            placeholder='Select a physician'
          >
             {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name} className="cursor-pointer">
                <div className="flex items-center gap-2 ">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-gray-800"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
          <h1 className="font-semibold text-2xl my-6">Identificarion and Verification</h1>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />
          <CustomFormField
           control={form.control}
           fieldType={FormFieldType.SKELETON}
           name='identificationDocument'
           label="Scanned copy of identification document"
           renderSkeleton={(field)=>(
             <FormControl>
               <FileUploader files={field.value} onChange={field.onChange}/>
             </FormControl>
           )}
          />

          <h1 className="font-semibold text-2xl my-6">Consent and Privacy</h1>
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    )
}

export default RegisterForm