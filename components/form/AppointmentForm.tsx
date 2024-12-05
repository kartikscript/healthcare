"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { CreateAppointmentSchema, getAppointmentSchema, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { Doctors } from "@/constants"
import { FormFieldType } from "./PatientForm"
import { createAppointment } from "@/lib/actions/appointment.actions"


const AppointmentForm = ({
  userId,patientId,type
}:{
  userId:string;
  patientId:string;
  type:'create'|'cancel'|'schedule'
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const AppointmentFormValidation = getAppointmentSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
        primaryPhysician:'',
        schedule:new Date(),
        reason:'',
        note:'',
        cancellationReason:''
      },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
      setIsLoading(true)

      let status
      if(type === 'schedule')status='scheduled'
      if(type === 'cancel')status='cancelled'
      else status='pending'

      try {
        if(type === 'create' && patientId) {
          const appointmentData={
            userId,
            patient:patientId,
            primaryPhysician:values.primaryPhysician,
            schedule:new Date(values.schedule),
            reason:values.reason||'',
            note:values.note,
            status:status as Status
          }
          const appointment = await createAppointment(appointmentData)
          console.log(appointment)
          if(appointment){
            form.reset();
            router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
          }
        }
        
      
      } catch (error) {
        console.log(error)
      }

    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
          
          {
            type !== 'cancel' && (
              <>
                 <CustomFormField
                    control={form.control}
                    name="primaryPhysician"
                    fieldType={FormFieldType.SELECT}
                    label='Doctor'
                    placeholder='Select a Doctor'
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

                  <CustomFormField
                   fieldType={FormFieldType.DATE_PICKER}
                   control={form.control}
                   name="schedule"
                   label="Expected appointment date"
                   showTimeSelect
                   dateFormat="MM/dd/yyyy - h:mm aa"
                  />
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="reason"
                      label="Reason for appointment"
                      placeholder="Enter a reason for appointment"
                    />

                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="note"
                      label="Enter notes"
                      placeholder="Enter notes"
                    />
                  </div>
              </>
            )
          }

          {
            type ==='cancel' && (
              <CustomFormField
               fieldType={FormFieldType.TEXTAREA}
               control={form.control}
               name="cancellationReason"
               label="Reason for cancellation"
               placeholder="Enter reason for cancellation"
              />
            )
          }
         
          <SubmitButton isLoading={isLoading} className={`${type==='cancel' ?'bg-red-400':'bg-green-400'} mt-4`}>
            {
              (type==='cancel' && 'Cancel Appointment') ||
              (type === 'create' && 'Create Appointment') ||
              (type === 'schedule' && 'Schedule Appointment')
            }
          </SubmitButton>
        </form>
      </Form>
    )
}

export default AppointmentForm