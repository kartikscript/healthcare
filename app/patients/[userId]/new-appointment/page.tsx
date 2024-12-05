import AppointmentForm from "@/components/form/AppointmentForm";
import PatientForm from "@/components/form/PatientForm";
import { getPatient } from "@/lib/actions/patient.action";
import { Hospital } from "lucide-react";
import Image from "next/image";

const NewAppointment=async ({params:{userId}}:SearchParamProps)=> {
 
  const patient = await getPatient(userId)
 return (<>
  <header className="bg-gray-950 text-white/90 flex h-screen max-h-screen">
    <div className="flex-1 my-auto px-32">
        <h2 className="flex items-center gap-4 text-xl font-semibold pb-8"><Hospital/> HealthCare</h2>
        <h1 className="text-2xl font-medium ">New Appointment</h1>
        <p className="text-sm text-white/60 pt-2 pb-6">Request a new appointment in 10 seconds</p>
        <AppointmentForm
          type='create'
          userId={userId} 
          patientId={patient.$id}
        />
        <div className="flex justify-between mt-16 text-sm text-white/50">
          <p>&copy; 2024 Healthcare</p>
        </div>
    </div>


      <Image
        className="w-[20%] bg-cover "
        src={'/images/appointment-img.png'}
        alt="healthcare"
        width={1000}
        height={1000}
      />
  </header>
  </>
  );
}

export default NewAppointment