import DashboardLayout from '@/components/DashboardComponents/dashboardLayout'
import Typography from '@/components/Typography/Typography'
import React from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useState } from 'react'
import { useData } from '@/components/Provider/authProvider'
const Tugas = () => {
  const {userData} = useData()
  const modul = userData?.modul?.replace(/'/g, '"') || ""
  const modulList = JSON.parse(modul || '[]');
  const [task, setTask] = useState(true)
  const taskData = [
    { name: "Tugas 1 modul dasar pemrograman", type: "Dasar Pemrograman", date: "Jumat, 1 November 2024", file:"tugas/dasprog-1.pdf" },
    { name: "Tugas 1 modul mikrokontroler", type: "Microcontroller", date: "Jumat, 1 November 2024", file:"tugas/mikro-1.pdf"},
    { name: "Tugas 1 modul machine learning", type: "Machine Learning", date: "Jumat, 1 November 2024", file:"tugas/ml-1.pdf" },
  ]
  const filteredTask = taskData.filter(modulItem => 
    modulList.includes(modulItem.type)
  );


  const handleTask = () => {

  }


  return (
    <DashboardLayout>
      <div className='h-full w-full lg:mt-[45px] lg:ml-[20px] ' >
        <Typography size='xl' variant='Paragraph' className='text-AddsOn-neutral text-2xl mb-6'>Daftar Tugas</Typography>
        {task
          ?
          (taskData.map(({ name, type, date, file }, index) => (
            <a download href={file} className='h-auto w-full rounded-3xl  border-b-[1px] border-transparent hover:border-accent-warning-500' key={index}>
              <div className='flex flex-row items-center gap-10 p-5 '>
                <div className='w-fit h-fit p-2 bg-AddsOn-neutral rounded-full items-center justify-center'>
                  <HiOutlineDocumentText size={20} />
                </div>
                <div className='flex flex-col w-full lg:justify-between lg:gap-0 gap-3 '>
                  <Typography variant='Paragraph' size='xs' className='lg:text-lg font-semibold text-AddsOn-neutral'>
                    {name}
                  </Typography>
                  <Typography variant='Paragraph' size='xs' className='font-light text-AddsOn-neutral lg:order-2'>
                    {type}
                  </Typography>
                  <Typography variant='Paragraph' size='xs' className='font-light text-AddsOn-neutral flex lg:justify-end  '>
                    Deadline: {date} 11.59 PM
                  </Typography>
                </div>
              </div>
            </a>
          )))
          :
          (
            <Typography variant='Paragraph' size='sm' className="text-primary-light-light ">Tidak Ada Daftar Tugas Yang Tersedia</Typography>
          )
        }
      </div>


    </DashboardLayout>
  )
}

export default Tugas