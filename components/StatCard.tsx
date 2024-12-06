import { Calendar, GripVerticalIcon, Timer } from 'lucide-react';
import React from 'react'


interface StatCardProps{
  label:string;
  count:number;
  type:string
}
const StatCard = ({label,count,type}:StatCardProps) => {
  let icon;
  if(type === 'schedule') icon=(<Calendar className='size-6'/>)
  if(type === 'pending') icon=(<Timer className='size-6'/>)
  if(type === 'cancel') icon=(<GripVerticalIcon className='size-6'/>)
  return (
    <div className='space-y-4 p-4 bg-gray-800 rounded-xl w-full'>
      <div className='flex items-center gap-4'>
        {icon}
        <p className='text-3xl font-medium'>{count}</p>
      </div>
      <p>{label}</p>
    </div>
  )
}

export default StatCard