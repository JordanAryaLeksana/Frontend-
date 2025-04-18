import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { HiOutlineBookOpen, HiOutlineClipboard, HiOutlineClipboardCheck, HiOutlineCog, HiOutlineDocumentDownload, HiOutlineLogout, HiOutlineMenu } from 'react-icons/hi';
import Cookies from 'js-cookie';
import Button from '@/components/Buttons';

const Menulinks = [
  { href: "/epta/dashboard/modul", label: "Modul", icon: <HiOutlineBookOpen size={30} /> },
  { href: "/epta/dashboard/tugas", label: "Tugas", icon: <HiOutlineClipboard size={30} /> },
  { href: "/epta/dashboard/penilaian", label: "Penilaian", icon: <HiOutlineClipboardCheck size={30} /> },
  { href: "/epta/dashboard/sertifikat", label: "Sertifikat", icon: <HiOutlineDocumentDownload size={30} /> },
];

const Otherlinks = [
  { href: "/epta/dashboard/pengaturan", label: "Pengaturan", icon: <HiOutlineCog size={30} /> },
  // { href: "/", label: "Keluar", icon: <HiOutlineLogout size={30} /> },
]


const Sidebar = () => {
  const { pathname } = useRouter(); 
  // Destructure pathname from useRouter
  const router = useRouter();

  function handleLogout() {

      Cookies.remove('data')
      router.push('/epta/login')
    
  }
  return (
    <div className={`max-w-[310px] w-full  hidden bg-primary-normal-normal lg:flex h-full min-h-screen flex-col items-center gap-14 justify-center border-r border-AddsOn-neutral border-solid z-[1111111]` }>
      <div className='flex flex-col items-start justify-center '>
        <Image src="/EPTA TEXT.svg" alt="logo epta" width={400} height={400} className=' relative right-4 top-2' />
      </div>
      
      <div className='flex flex-col w-full h-full items-center justify-center gap-10'>
        <ul className='flex flex-col items-start  space-y-12 text-AddsOn-neutral'>
          {Menulinks.map(({ href, label, icon }) => (
            <li key={`${href} ${label}`} className='mr-20 flex flex-row gap-6 '>
              <span className={pathname === href ? 'text-accent-warning-700' : 'text-secondary-light-light'}>
                {icon}
              </span>
              <Link href={href} className={pathname === href ? 'text-accent-warning-700 text-xl' : 'text-secondary-light-light text-xl'}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <span className='w-full border-t-[1px] border-AddsOn-neutral relative top-2'></span>
        <ul className='flex flex-col items-start ml-24 space-y-10 w-full text-AddsOn-neutral'>
          {Otherlinks.map(({ href, label, icon }) => (
            <li key={`${href} ${label}`} className='flex flex-row gap-6 items-center justify-center'>
              <span className={pathname === href ? 'text-accent-warning-700' : 'text-secondary-light-light'}>
                {icon}
              </span>
              <Link href={href} className={pathname === href ? 'text-accent-warning-700 text-xl' : 'text-secondary-light-light text-xl'}>
                {label}
              </Link>
               
            </li>
            
          ))}
          <button onClick={handleLogout} className='flex flex-row gap-6'><span className={ 'text-secondary-light-light'}>
                {<HiOutlineLogout size={30} />}
              </span><h1 className='text-secondary-light-light text-xl'>Keluar</h1></button>
        </ul>

      </div>
    
    </div>
  )
}

export default Sidebar;
