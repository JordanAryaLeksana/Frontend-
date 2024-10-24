import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
const ForgotPassword = () => {
  const [pw, setPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [email, setEmail] = useState('')
  const [sendSuccess, setSendSuccess] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  function handleReset() {
    setLoading(true)
    if(pw.length < 8){
      setLoading(false)
      alert("Password minimal 8 karakter")
      
      return
      
    }
    if(pw !== confirmPw) {
      setLoading(false)
      alert("Password tidak sama")
      return
    }
    
    axios.post("https://dzulf.pythonanywhere.com/api/reset-password/", {
      "reset_token": resetToken,
      "new_password": pw
    })
      .then((response) => {
        setLoading(false)
        console.log(response.data)
        setResetSuccess(true)
      })
      .catch((error) => {
        setLoading(false)
        alert("Reset token tidak valid")
        console.log(error)
        
      })
  }
  function handleSend() {
    setLoading(true)
    if(email === '') {
      setLoading(false)
      alert("Email harus diisi")
      return
    }
    axios.post("https://dzulf.pythonanywhere.com/api/forgot-password/", {
      "email": email
    })
      .then((response) => {
        setLoading(false)
        console.log(response.data)
        setSendSuccess(true)
        
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        alert("Email tidak terdaftar")
        
      })

  }
  return (
    <div className='bg-primary-normal-normal h-screen text-AddsOn-neutral justify-center items-center flex flex-col sm:px-0 px-5'>
      <div className='flex flex-col p-4 rounded-3xl border-2 gap-4 sm:w-[400px] w-full '>
        {
          !sendSuccess ?
            <>
              <label htmlFor="email">Masukkan email</label>
              <input className='bg-AddsOn-gray focus:outline-none border-[1px] rounded-xl p-2' type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)}/>
              {
                loading ?
                <button disabled className='bg-white px-4 py-2 rounded-xl text-AddsOn-gray'>Loading...</button>
                :
                <button onClick={handleSend} className='bg-white px-4 py-2 rounded-xl text-AddsOn-gray'>Lanjutkan</button>
              }
              
            </>
            :
            resetSuccess ?
            <>
              <h1>Password berhasil direset, silakan login</h1>
              <Link href={'/epta/login'} className='bg-white px-4 py-2 rounded-xl text-AddsOn-gray text-center'>Login</Link>
            </>
            :
            <>
              <input hidden type="text" />
              <label htmlFor="reset_token">Reset token berhasil dikirimkan ke {email}, silakan masukkan reset token</label>
              <input className='bg-AddsOn-gray focus:outline-none border-[1px] rounded-xl p-2' type="text" name="reset_token" id="reset_token" onChange={(e) => setResetToken(e.target.value)}/>
              <label htmlFor="new_password">Masukkan password baru</label>
              <input className='bg-AddsOn-gray focus:outline-none border-[1px] rounded-xl p-2' type="password" name="new_password" id="new_password" onChange={(e) => setPw(e.target.value)}/>
              <label htmlFor="new_password">Masukkan konfirmasi password</label>
              <input className='bg-AddsOn-gray focus:outline-none border-[1px] rounded-xl p-2' type="password" name="new_password" id="new_password" onChange={(e) => setConfirmPw(e.target.value)}/>
              {
                loading ?
                <button disabled className='bg-white px-4 py-2 rounded-xl text-AddsOn-gray'>Loading...</button>
                :
                <button onClick={handleReset} className='bg-white px-4 py-2 rounded-xl text-AddsOn-gray'>Reset</button>
              }
            </> 
            
        }
      </div>
    </div>
  )
}

export default ForgotPassword