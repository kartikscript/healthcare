import StatCard from '@/components/StatCard'
import {columns} from '@/components/table/columns'
import {DataTable} from '@/components/table/DataTable'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import { Hospital } from 'lucide-react'
import React from 'react'

const page =async () => {
  const appointments = await getRecentAppointmentList()
  return (
    <div className='flex flex-col gap-10 p-2 bg-gray-900 text-gray-50'>
      <header className='bg-gray-950 rounded-xl flex justify-between items-center py-4 px-8 w-[70%] mx-auto'>
        <h2 className="flex items-center gap-4 text-lg font-semibold"><Hospital/> HealthCare</h2>
        <p className='text-sm'>Admin Dashboard</p>
      </header>
      <section className='w-[70%] mx-auto px-4 space-y-2'>
        <h2 className='text-3xl font-medium'>Welcome</h2>
        <p className='text-white/60'>Start the day with managing new appointments</p>
        <div className='pt-8 w-full flex gap-8 justify-between'>
          <StatCard
          type='schedule'
          count={appointments.scheduledCount}
          label='Schedule appointments'
          />
          <StatCard
          type='pending'
          count={appointments.pendingCount}
          label='Pending appointments'
          />
          <StatCard
          type='cancel'
          count={appointments.cancelledCount}
          label='Cancelled appointments'
          />
        </div>
      </section>
      <DataTable columns={columns} data={appointments.documents}/>

    </div>
  )
}

export default page