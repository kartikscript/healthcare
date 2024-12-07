import RegisterForm from '@/components/form/RegisterForm'
import { Hospital } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { getUser } from "@/lib/actions/patient.action"

const Register = async({params:{userId}}:SearchParamProps) => {
  
  const user = await getUser(userId)
  return (
    <header className="bg-gray-950 text-white/90 lg:flex ">
      <Image
        className="h-64 lg:h-full lg:w-[20%] object-cover order-2"
        src={'/images/register-img.png'}
        alt="healthcare"
        width={1000}
        height={1000}
      />
      <div className="overflow-y-scroll flex-1 remove-scrollbar max-w-[700px] mx-auto py-10 px-6">
          <h2 className="flex items-center gap-4 text-xl font-semibold pb-8"><Hospital/> HealthCare</h2>
          <h1 className="text-3xl font-semibold ">Welcome !</h1>
          <p className="text-sm text-white/60 py-2 ">Let us know more about yourself </p>
          <RegisterForm user={user}/>
          <p className='mt-16 text-sm text-white/50'>&copy; 2024 Healthcare</p>
      </div>
  </header>
  )
}

export default Register