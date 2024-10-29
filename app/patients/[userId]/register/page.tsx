import RegisterForm from '@/components/form/RegisterForm'
import { Hospital } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { getUser } from "@/lib/actions/patient.action"

const Register = async({params:{userId}}:SearchParamProps) => {

  const user = await getUser(userId)
  return (
    <header className="bg-gray-950 text-white/90 flex h-screen max-h-screen">
    <div className="flex-1 my-auto px-32">
        <h2 className="flex items-center gap-4 text-xl font-semibold pb-8"><Hospital/> HealthCare</h2>
        <h1 className="text-2xl font-medium ">Welcome !</h1>
        <p className="text-sm text-white/60 pt-2 pb-6">Let us know more about yourself </p>
        <RegisterForm user={user}/>
        <div className="flex justify-between mt-16 text-sm text-white/50">
          <p>&copy; 2024 Healthcare</p>
          <p>Admin</p>
        </div>
    </div>
      <Image
        className="w-[40%] bg-cover "
        src={'/images/register.jpg'}
        alt="healthcare"
        width={1000}
        height={1000}
      />
  </header>
  )
}

export default Register