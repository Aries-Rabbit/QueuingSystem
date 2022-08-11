import React from 'react'
import { Outlet } from 'react-router-dom'

export const BaoCao = () => {
  return (
    <div className='baoCao'>
      <Outlet/>
    </div>
  )
}
