'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const PasskeyModal = () => {

  const router = useRouter()
  const path = usePathname()
  const [open, setOpen] = useState(true)
  const [passkey, setPasskey] = useState('')
  const [error, setError] = useState('')


//we dont want to sign in admin again and again so saving acccess key in storage
  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey)
    //path exists means we are in client side
    if(path){
      if(accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
        setOpen(false);
        router.push('/admin')   
      }else{
        setOpen(true)
      }
    }
  }, [encryptedKey])
  
  const closeModal = ()=>{
    setOpen(false)
    router.push('/')
  }

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.preventDefault()

      if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
          const encryptedKey = encryptKey(passkey)

          localStorage.setItem('accessKey',encryptedKey)

          setOpen(false)
      }else{
        setError('Invalid Passkey. Please try again.')
      }
  }
  return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="w-96 space-y-2 bg-gray-900 text-gray-100 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between mb-1">
              Admin Access Verification
              <button onClick={()=>closeModal()} className='p-1 cursor-pointer bg-gray-800 rounded-full size-8 flex items-center justify-center'>X</button>
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access the admin page, please enter the passkey.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value)=>setPasskey(value)}>
            <InputOTPGroup className='flex justify-between w-full *:border *:rounded-md *:text-3xl *:size-12 '>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-red-400 text-sm font-medium mt-3 text-center">{error}</p>}
          </div>
          <AlertDialogFooter>
           <AlertDialogAction className="w-full bg-green-600 hover:bg-green-500" onClick={(e)=>validatePasskey(e)}>Enter Admin Passkey</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

  )
}

export default PasskeyModal