"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Appointment>[] = [
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
             appointment={data}
             
            />
            <AppointmentModal 
             type='cancel'
             patientId={data.patient.$id}
             userId={data.userId}
             appointment={data}
            />
        </div>
      )
    },
  },
]
