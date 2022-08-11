import { Breadcrumb, Checkbox } from 'antd';
import { useFormik } from 'formik';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from '../../../Util/variableImage';
import * as yup from 'yup'

interface formikFace {
    tenVaiTro: string,
    moTa: string
}

export const ThemVaiTro = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const initialValues:formikFace = {
        tenVaiTro: '',
        moTa: ''
    }

    const validationSchema = yup.object().shape({
        tenVaiTro: yup.string().required('Không được bỏ trống!'),
        moTa: yup.string().required('Không được bỏ trống!'),
    })

    const formik = useFormik({
      initialValues,
      onSubmit: (e:any) => {
          console.log(e);
      },
      validationSchema
    })

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
                        navigate('/qlVaiTro');
                    }}>Quản lý vai trò</a>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  <img src={`${Image.separator}`}/>
                </Breadcrumb.Separator>
                <Breadcrumb.Item>Thêm vai trò</Breadcrumb.Item>
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

    function onChange(e:any) {
      console.log(`checked = ${e.target.checked}`);
    }

    return (
      <div>
        <div className='vaiTro__breadcrumb'>
          {breadCrumbView()}
        </div>
        <div className='vaiTro__content'>
          <h3 className='vaiTro__content-heading'>
            Danh sách vai trò
          </h3>
          <form className='vaiTro__content-form' onSubmit={formik.handleSubmit}>
            <div className='vaiTro__content-form-top'>
              <h5 className='content__form-top-heading'>
                Thông tin vai trò
              </h5>
              <div className='content__form-top-list'>
                <div className='content__form-top-list-left'>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-title'>
                      <span>Tên vai trò:</span> <img src={Image.chuY}/>
                    </div>
                    <input placeholder='Nhập tên vai trò' name='tenVaiTro' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.tenVaiTro && formik.touched.tenVaiTro ? (<div className='text-danger'>{formik.errors.tenVaiTro}</div>) : ''}
                  </div>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-title'>
                      <span>Mô tả:</span>
                    </div>
                    <textarea placeholder='Nhập mô tả' name='moTa' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.moTa && formik.touched.moTa ? (<div className='text-danger'>{formik.errors.moTa}</div>) : ''}

                  </div>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-item-warning'>
                      <img src={Image.chuY}/>
                      <span>Là trường thông tin bắt buộc</span>
                    </div>
                  </div>
                </div>
                <div className='content__form-top-list-right'>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-item-title'>
                      <span>Phân quyền chức năng: </span>
                      <img src={Image.chuY}/>
                    </div>
                    <div className='content__form-top-item-wrap'>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nhóm chức năng A</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>Tất cả</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng x</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng y</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng z</Checkbox>
                          </div>
                        </div>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nhóm chức năng B</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>Tất cả</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng x</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng y</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng z</Checkbox>
                          </div>
                        </div>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nhóm chức năng C</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>Tất cả</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng x</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng y</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng z</Checkbox>
                          </div>
                        </div>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nhóm chức năng D</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>Tất cả</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng x</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng y</Checkbox>
                            <Checkbox onChange={onChange}>Chức năng z</Checkbox>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='vaiTro__content-form-bottom'>
              <button className='content__form-bottom-cancel' type='button' onClick={()=> {
                navigate('/qlVaiTro');
              }}>Hủy bỏ</button>
              <button className='content__form-bottom-add' type='submit' onClick={()=> {
                navigate('/qlVaiTro');
              }}>Thêm mới</button>
            </div>
          </form>
        </div>
      </div>
    )
}
