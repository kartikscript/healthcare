import { Button } from '@/components/ui/button'
import { Doctors } from '@/constants'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { formatDateTime } from '@/lib/utils'
import { Calendar, CheckCircle2, Hospital } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


//http://localhost:3000/patients/67443759000ac700e5fa/new-appointment/success?appointmentId=6750486c000ab2f93454
const Success = async ({params:{userId},searchParams}:SearchParamProps) => {

  const appointmentId = (searchParams?.appointmentId as string) || ''
  const appointment = await getAppointment(appointmentId)
  const doctor = Doctors.find((doc)=> doc.name === appointment?.primaryPhysician)
  return (
    <div className='h-screen gap-4 flex flex-col justify-center items-center bg-gray-800 text-gray-100'>
      <h2 className="flex items-center gap-4 text-xl font-semibold pb-8"><Hospital/> HealthCare</h2>
      <div className='w-[80%] lg:w-[35%] flex flex-col items-center gap-4'>
        <CheckCircle2 className='bg-green-500 p-2 size-10 mt-2 rounded-full'/>
        <h2 className='text-3xl font-semibold text-center'>Your <span className='text-green-500'>appointment request </span>has been successfully submitted!</h2>
        <p className='text-gray-500 text-lg'>we will be in touch shortly to confirm</p>
      </div>
      <div className='mt-2 border-y border-gray-700 py-5 lg:flex-row flex-col flex gap-8'>
        <p>Requested appointment details :</p>
        <div className='flex gap-2'>
          <Image
          src={doctor?.image!}
          alt={'doctor'}
          width={100}
          height={100}
          className='size-6'
          />
          <p>{doctor?.name}</p>
        </div>
        <div className='flex gap-2'>
          <Calendar className='size-6'/>
          <p>{formatDateTime(appointment.schedule).dateTime}</p>
        </div>
      </div>
      <Button variant={'outline'} asChild>
        <Link className='p-4 bg-green-400' href={`/patients/${userId}/new-appointment`}>
          New Appointment
        </Link>
      </Button>
      <div className="flex justify-between mt-6 text-sm text-white/50">
          <p>&copy; 2024 Healthcare</p>
      </div>
    </div>
  )
}

export default Success