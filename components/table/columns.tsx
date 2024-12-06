"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    header:'ID',
    cell:({row})=> <p>{row.index+1}</p>
  },
  {
    accessorKey:'patient',
    header:'Patient',
    cell:({row})=><p>{row.original.patient.name}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=><p>{row.original.status}</p>
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell:({row})=><p>{formatDateTime(row.original.schedule).dateTime}</p>
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell:({row})=><p>{row.original.primaryPhysician}</p>
  },
  {
    id: "actions",
    header:"Actions",
    cell: ({ row:{original:data} }) => {
      return(
        <div>
            <AppointmentModal 
             type='schedule'
             patientId={data.patient.$id}
             userId={data.userId}
             appointmentId={data}
             title='Schedule Appointment'
             description='Please confirm the following details to schedule'
            />
            <AppointmentModal 
             type='cancel'
             patientId={data.patient.$id}
             userId={data.userId}
             appointmentId={data}
             title='Cancel Appointment'
             description='Please confirm the following details to cancel'
            />
        </div>
      )
    },
  },
]
