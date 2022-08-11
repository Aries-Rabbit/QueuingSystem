import React from 'react'
import { Outlet} from 'react-router-dom';

export const QuanLyTaiKhoan = () => {
    return (
      <div className='taiKhoan'>
        <Outlet/>
      </div>
    )
}
