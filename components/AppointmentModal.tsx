'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import AppointmentForm from "./form/AppointmentForm"
import { Appointment } from "@/types/appwrite.types"


const AppointmentModal = ({type,patientId,userId,appointment}:{
  type:'schedule'|'cancel',
  patientId:string,
  userId:string,
  appointment?:Appointment

}) => {

  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className={`${type==='schedule'&&'text-green-600'}`}>{type}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
         userId={userId}
         patientId={patientId}
         type={type}
         appointment={appointment}
         setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
    
  )
}

export default AppointmentModal