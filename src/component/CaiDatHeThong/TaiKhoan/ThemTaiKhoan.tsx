import React from 'react'
import { Breadcrumb, Input, Select, Table } from 'antd';
import { Image } from '../../../Util/variableImage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { string } from 'yup';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import * as yup from 'yup';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../../firebase/firebase.config';

interface formikFace {
    hoTen: string,
    tenDangNhap: string,
    sdt: string,
    matKhau: string,
    email: string,
    nhapLaiMatKhau: string,
    vaiTro: string,
    trangThaiHoatDong: string
}

const {Option} = Select;

export const ThemTaiKhoan = () => {

  const location = useLocation();
  const navigate = useNavigate();


  const initialValues: formikFace = {
      hoTen: '',
      tenDangNhap: '',
      sdt: '',
      matKhau: '',
      email: '',
      nhapLaiMatKhau: '',
      vaiTro: '',
      trangThaiHoatDong: ''
  }

  const validationSchema = yup.object().shape({
    hoTen: yup.string()
      .required('Không được bỏ trống!'),
    tenDangNhap: yup.string()
      .required('Không được bỏ trống!'),
    sdt: yup.number().typeError('Không được nhập ký tự chuỗi!')
      .required('Không được bỏ trống!'),
    matKhau: yup.string()
      .required('Không được bỏ trống!'),       
    email: yup.string()
      .email('Email không đúng dạng!')
      .required('Không được bỏ trống!'),
    nhapLaiMatKhau: yup.string()
      .required('Không được bỏ trống!').oneOf([yup.ref('matKhau'), null], 'Mật khẩu nhập lại không chính xác!')   
  })

  const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values:any) => {
            console.log(values);
            const addDocument = async () => {
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "taiKhoan"), {
                    hoTen: values.hoTen,
                    email: values.email,
                    matKhau: values.matKhau,
                    nhapLaiMatKhau: values.matKhau,
                    sdt: values.sdt,
                    vaiTro: values.vaiTro,
                    trangThaiHoatDong: values.trangThaiHoatDong,
                    tenDangNhap: values.tenDangNhap,
                    ID: (Math.random() * 1000).toString()
                });
            }
            addDocument();
      },
      validationSchema
  })

  const handleChangeSelectVaiTro = (e:any) => {
    formik.setFieldValue('vaiTro',e.value);
}

const handleChangeSelectTrangThaiHoatDong = (e:any) => {
    formik.setFieldValue('trangThaiHoatDong',e.value);
}
  const breadCrumbView = () => {
      const {pathname} = location;
      const pathnames = pathname.split('/').filter((item) => item);
      return (
          <div>
            <Breadcrumb separator=''>
              {pathnames.length > 0 ? (
                <>
                  <Breadcrumb.Item>Cài đặt hệ thống</Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                      <a onClick={()=> {
                          navigate('/qlTaiKhoan');
                      }}>Quản lý tài khoản</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>Thêm tài khoản</Breadcrumb.Item>
                </>
              ) : (
                <>
                  <Breadcrumb.Item>Cài đặt hệ thống</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    
                  </Breadcrumb.Item>
                </>
              )}
            </Breadcrumb>
          </div>
        )
  }

//   const addDocument = async () => {
//     // Add a new document with a generated id.
//     const docRef = await addDoc(collection(db, "taiKhoan"), {
//         name: "Tokyo",
//         country: "Japan"
//     });
//     console.log("Document written with ID: ", docRef.id);
//   }
  return (
    <div>
        <div className='taiKhoan__breadcrumb'>
          {breadCrumbView()}
        </div>
        <div className='taiKhoan__content'>
            <h3 className='taiKhoan__content-heading'>
            Quản lý thiết bị
            </h3>
            <form className='taiKhoan__content-update' onSubmit={formik.handleSubmit}>
                <div className='content__update-top'>
                    <h3 className='content__update-heading'>
                        Thông tin thiết bị
                    </h3>   
                    <div className='content__update-list'>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Họ tên: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.hoTen} name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            placeholder='Nhập họ tên'/>
                            {formik.errors.hoTen && formik.touched.hoTen ? (<div className="text-danger">{formik.errors.hoTen}</div>) : ''}
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Tên đăng nhập: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.tenDangNhap} name="tenDangNhap" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Nhập tên đăng nhập'/>
                            {formik.errors.tenDangNhap && formik.touched.tenDangNhap ? (<div className="text-danger">{formik.errors.tenDangNhap}</div>) : ''}
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Số điện thoại: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.sdt} name="sdt" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Nhập số điện thoại'/>
                            {formik.errors.sdt && formik.touched.sdt ? (<div className="text-danger">{formik.errors.sdt}</div>) : ''}
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Mật khẩu: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}className='content__update-input' value={formik.values.matKhau} name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Nhập mật khẩu'/>
                            {formik.errors.matKhau && formik.touched.matKhau ? (<div className="text-danger">{formik.errors.matKhau}</div>) : ''}
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Email: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Nhập email'/>
                            {formik.errors.email && formik.touched.email ? (<div className="text-danger">{formik.errors.email}</div>) : ''}
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Nhập lại mật khẩu: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}className='content__update-input' value={formik.values.nhapLaiMatKhau} name="nhapLaiMatKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Nhập lại mật khẩu'/>
                            {formik.errors.nhapLaiMatKhau && formik.touched.nhapLaiMatKhau ? (<div className="text-danger">{formik.errors.nhapLaiMatKhau}</div>) : ''}
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Vai trò: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Select
                                labelInValue
                                style={{ width: 120 }}
                                onChange={handleChangeSelectVaiTro}
                                defaultValue={{ value: `${formik.values.vaiTro}` }}
                                suffixIcon={<img src={`${Image.select}`}/>}
                                placeholder='Chọn vai trò'
                                className="content__update-item-select"
                            >
                                <Option value="Kế toán">Kế toán</Option>
                                <Option value="Quản lý">Quản lý</Option>
                                <Option value="Admin">Admin</Option>
                            </Select>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Tình trạng: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Select
                                labelInValue
                                defaultValue={{ value: `${formik.values.trangThaiHoatDong}` }}
                                style={{ width: 120 }}
                                onChange={handleChangeSelectTrangThaiHoatDong}
                                suffixIcon={<img src={`${Image.select}`}/>}
                                className="content__update-item-select"
                            >
                                <Option value="Tất cả">Tất cả</Option>
                                <Option value='Ngưng hoạt động'>Ngưng hoạt động</Option>
                                <Option value='Hoạt động'>Hoạt động</Option>
                            </Select>
                        </div>
                    </div>
                    <div className='content__update-warning'>
                        <img src={`${Image.chuY}`}/>
                        <span>Là trường thông tin bắt buộc</span>
                    </div>
                </div>
                <div className='content__update-bottom'>
                    <button type='button' className='content__update-btn-cancel' onClick={()=> {
                        navigate('/qlTaiKhoan');
                    }}>Hủy bỏ</button>
                    <button type='submit' className='content__update-btn-update'  onClick={()=> {
                            // addDocument()
                    }}>Thêm</button>
                </div>
            </form>  
        </div>
    </div>
  )
}
