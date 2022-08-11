import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { State } from '../Redux';

export const Profile = () => {

  const {userLogin} = useSelector((state: State)=> state.taiKhoan);

  const [bgUser, setBgUser] = useState('./img/user.png');

  return (
    <div className='profile'> 
      <h5 className='profile__heading'>Thông tin cá nhân</h5>
      <div className='profile__content'>
          <div className='profile__content-left'>
            <div className='content__left-img' style={{backgroundImage: `url(${bgUser})`}}>
              <div className='content__left-img-camera'>
                <img src='./img/mayanh.png'/>
              </div>
            </div>
            <p className='content__left-txt'>{userLogin[0].hoTen}</p>
          </div>
          <div className='profile__content-right'>
              <div className='profile__content-item'>
                  <h5 className='profile__content-title'>
                    Tên người dùng
                  </h5>
                  <input placeholder={`${userLogin[0].hoTen}`} disabled className='profile__content-input'/>
              </div>
              <div className='profile__content-item'>
                  <h5 className='profile__content-title'>
                    Tên đăng nhập
                  </h5>
                  <input placeholder={`${userLogin[0].tenDangNhap}`} disabled className='profile__content-input'/>
              </div>
              <div className='profile__content-item'>
                  <h5 className='profile__content-title'>
                    Số điện thoại
                  </h5>
                  <input placeholder={`${userLogin[0].sdt}`} disabled className='profile__content-input'/>
              </div>
              <div className='profile__content-item'>
                  <h5 className='profile__content-title'>
                    Mật khẩu
                  </h5>
                  <input placeholder={`${userLogin[0].matKhau}`} disabled className='profile__content-input'/>
              </div>
              <div className='profile__content-item'>
                  <h5 className='profile__content-title'>
                    Email:
                  </h5>
                  <input placeholder={`${userLogin[0].email}`} disabled className='profile__content-input'/>
              </div>
              <div className='profile__content-item'>
                  <h5 className='profile__content-title'>
                    Vai trò:
                  </h5>
                  <input placeholder={`${userLogin[0].vaiTro}`} disabled className='profile__content-input'/>
              </div>
          </div>
      </div>
    </div>
  )
}
