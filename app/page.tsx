import PatientForm from "@/components/form/PatientForm";
import { Hospital } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (<>
  <header className="bg-gray-950 text-white/90 flex h-screen max-h-screen">
    <div className="container my-auto px-40">
        <h2 className="flex items-center gap-4 text-xl font-semibold pb-8"><Hospital/> HealthCare</h2>
        <h1 className="text-2xl font-medium ">Hi There !</h1>
        <p className="text-sm text-white/60 pt-2 pb-6">Schedule your first appointment</p>
        <PatientForm/>
        <div className="flex justify-between mt-16 text-sm text-white/50">
          <p>&copy; 2024 Healthcare</p>
          <p>Admin</p>
        </div>
    </div>
    <div className="relative size-full opacity-80">
      <Image
        className="bg-containcenter"
        src={'/images/main.jpg'}
        alt="healthcare"
        fill
      />
    </div>
  </header>
  </>
  );
}
