import { Breadcrumb, Checkbox } from 'antd';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase/firebase.config';

interface formikFace {
    maDichVu: string,
    tenDichVu: string,
    moTa: string
}

export const ThemDichVu = () => {

    const navigate = useNavigate();
    
    const location = useLocation();

    const validationSchema = yup.object().shape({
        maDichVu: yup.number().typeError('Không được nhập ký tự chuỗi!')
          .required('Không được bỏ trống!').min(3, 'Tối thiểu 3 số!'),
        tenDichVu: yup.string()
          .required('Không được bỏ trống!'),
        moTa: yup.string()
          .required('Không được bỏ trống!'),  
      })
  
    const initialValues: formikFace = {
        "maDichVu": '',
        "tenDichVu": '',
        "moTa": ''
    }
  
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values:any) => {
            console.log(values);
            const addDichVu = async () => {
                const docRef = await addDoc(collection(db, "dichVu"), {
                    maDichVu: values.maDichVu,
                    tenDichVu: values.tenDichVu,
                    moTa: values.moTa,
                    listCapSo: [],
                    trangThaiHoatDong: 'Hoạt động'
                  });
                  console.log("Document written with ID: ", docRef.id);
            }
            addDichVu();

        },
        validationSchema
    });

    const breadCrumbView = () => {
        
        const {pathname} = location;
        const pathnames = pathname.split('/').filter((item) => item);
        return (
          <div>
            <Breadcrumb separator=''>
              {pathnames.length > 0 ? (
                <>
                  <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <a onClick={()=> {
                        navigate('/dichvu');
                    }}>Danh sách dịch vụ</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <span>Thêm dịch vụ</span>
                  </Breadcrumb.Item>
                </>
              ) : (
                <>
                  <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                  <Breadcrumb.Item>
    
                  </Breadcrumb.Item>
                </>
              )}
            </Breadcrumb>
          </div>
        )
    }

    const onChange = (e:any) => {
        console.log(e);
    }
    
    return (
        <div>
            <div className='dichVu__breadcrumb'>
                {breadCrumbView()}
            </div>
            <div className='dichVu__content'>
                <h3 className='dichVu__content-heading'>
                Quản lý dịch vụ
                </h3>
                <form className='dichVu__content-update' onSubmit={formik.handleSubmit}>
                    <div className='content__update-top'>
                        <div className='content__update-list'>
                            <div className='content__update-item'>
                                <h3 className='content__update-heading' style={{marginTop: '0'}}>
                                    Thông tin dịch vụ
                                </h3>
                                <div className='content__update-content'>
                                    <div className='content__update-input'>
                                    <span className='update__input-title'>
                                        Mã dịch vụ: 
                                        <img src={Image.chuY}/>
                                    </span>
                                    <input name="maDichVu" value={formik.values.maDichVu} className='update__input-input' min={3} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                    {formik.errors.maDichVu && formik.touched.maDichVu ? (<div className="text-danger">{formik.errors.maDichVu}</div>) : ''}
                                    </div>
                                    <div className='content__update-input moTa'>
                                    <span className='update__input-title'>
                                        Mô tả: 
                                    </span>
                                    <textarea name="moTa" value={formik.values.moTa} className='update__input-input' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                    {formik.errors.moTa && formik.touched.moTa ? (<div className="text-danger">{formik.errors.moTa}</div>) : ''}
                                    </div>
                                    <div className='content__update-input'>
                                        <span className='update__input-title'>
                                            Tên dịch vụ: 
                                            <img src={Image.chuY}/>
                                        </span>
                                        <input name="tenDichVu" value={formik.values.tenDichVu} className='update__input-input' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                        {formik.errors.tenDichVu && formik.touched.tenDichVu ? (<div className="text-danger">{formik.errors.tenDichVu}</div>) : ''}
                                    </div>
                                </div>
                            <div className='content__update-item'>
                                <h3 className='content__update-heading' style={{marginTop: '16px'}}>
                                    Quy tắc cấp số
                                </h3>
                                <div className='content__update-content check'>
                                <div className='content__update-check'>
                                <div className='content__update-check-left'>
                                    <Checkbox onChange={onChange}>
                                    <span className='content__update-title'>Tăng tự động từ: 2</span>
                                    </Checkbox>
                                </div>
                                <div className='content__update-check-right'>
                                    <div className='content__update-check-number'>
                                    0001
                                    </div>
                                    <span>đến</span>
                                    <div className='content__update-check-number'>
                                    9999
                                    </div>
                                </div>
                                </div>
                                <div className='content__update-check'>
                                <div className='content__update-check-left'>
                                    <Checkbox onChange={onChange}>
                                    <span className='content__update-title'>Prefix: </span>
                                    </Checkbox>
                                </div>
                                <div className='content__update-check-right'>
                                    <div className='content__update-check-number'>
                                    0001
                                    </div>
                                </div>
                                </div>
                                <div className='content__update-check'>
                                <div className='content__update-check-left'>
                                    <Checkbox onChange={onChange}>
                                    <span className='content__update-title'>Surfix: </span>
                                    </Checkbox>
                                </div>
                                <div className='content__update-check-right'>
                                    <div className='content__update-check-number'>
                                    0001
                                    </div>
                                </div>
                                </div>
                                <div className='content__update-check'>
                                <div className='content__update-check-left'>
                                    <Checkbox onChange={onChange}>
                                    <span className='content__update-title'>Reset mỗi ngày</span>
                                    </Checkbox>
                                </div>
                                </div>
                                <div className='content__update-check'>
                                <img src={Image.chuY}/>
                                <span>Là trường thông tin bắt buộc</span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='content__update-bottom'>
                        <button className='content__update-bottom-button dichVu__cancel' type="button" onClick={()=> {
                            navigate('/dichVu');
                        }}>
                            <span>Hủy bỏ</span>
                        </button>
                        <button className='content__update-bottom-button dichVu__add' type="submit">
                            <span>Thêm dịch vụ</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
