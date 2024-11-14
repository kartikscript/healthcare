import RegisterForm from '@/components/form/RegisterForm'
import { Hospital } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { getUser } from "@/lib/actions/patient.action"

const Register = async({params:{userId}}:SearchParamProps) => {

  const user = await getUser(userId)
  return (
    <header className="bg-gray-950 text-white/90 flex h-screen max-h-screen ">
      <div className="overflow-y-scroll flex-1 remove-scrollbar max-w-[700px] mx-auto py-10">
          <h2 className="flex items-center gap-4 text-xl font-semibold pb-8"><Hospital/> HealthCare</h2>
          <h1 className="text-3xl font-semibold ">Welcome !</h1>
          <p className="text-sm text-white/60 py-2 ">Let us know more about yourself </p>
          <RegisterForm user={user}/>
          <p className='mt-16 text-sm text-white/50'>&copy; 2024 Healthcare</p>
      </div>
      <Image
        className="w-[20%] bg-cover "
        src={'/images/register-img.png'}
        alt="healthcare"
        width={1000}
        height={1000}
      />
  </header>
  )
}

export default Register