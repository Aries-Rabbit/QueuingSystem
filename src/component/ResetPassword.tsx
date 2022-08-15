import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import { Image } from '../Util/variableImage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { MyParams } from '../config/paramType';
import * as yup from 'yup';
import { useFormik } from 'formik';

interface formikFace {
    matKhau: string,
    nhapLaiMatKhau: string,
  }

export const ResetPassword = () => {


    const {id} = useParams<keyof MyParams>() as MyParams;

    const [form] = Form.useForm();

    const onFinish = (event: any) => {
        console.log('Success:', event);
        const updateDichVu = async () => {
            const dichVuRef = doc(db, "taiKhoan", `${id}`);
            // Set the "capital" field of the city 'DC'
            await updateDoc(dichVuRef, {
              nhapLaiMatKhau: `${event.nhapLaiMatKhau}`,
              matKhau: `${event.matKhau}`,
            });
            window.location.replace('/login');
        }

        updateDichVu();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    const onReset = () => {
        form.resetFields();
    };

    const initialValues: formikFace = {
        matKhau: '',
        nhapLaiMatKhau: '',
      }
  
      const validationSchema = yup.object().shape({
            matKhau: yup.string()
                .required('Không được bỏ trống!'),
            nhapLaiMatKhau: yup.string()
                .required('Không được bỏ trống!').oneOf([yup.ref('matKhau'), null], 'Mật khẩu nhập lại không chính xác!')   
        })
        
        const formik = useFormik({
            initialValues,
            enableReinitialize: true,
            onSubmit: () => {
                
                const updateDichVu = async () => {
                    const dichVuRef = doc(db, "taiKhoan", `${id}`);
                    
                    await updateDoc(dichVuRef, {
                      nhapLaiMatKhau: `${formik.values.nhapLaiMatKhau}`,
                      matKhau: `${formik.values.matKhau}`,
                    });
                    window.location.replace('/login');
                }
        
                updateDichVu();
            },
            validationSchema
        })
  return (
    <div className='layout'>
        <div className='container-fuild h-100'>
            <div className='row reset'>
                <div className='col-5 reset__left'>
                    <div className='reset__left-logo'>
                        <img src={Image.logo} className='reset__left-img'/>
                    </div>
                    <h3 className='reset__left-heading'>Đặt lại mật khẩu mới</h3>
                    <form className='reset__left-form' onSubmit={formik.handleSubmit}>
                        <div className='reset__left-item'>
                            <p>Mật khẩu</p>
                            <Input.Password value={formik.values.matKhau} name="matKhau" className='reset__left-input' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {formik.errors.matKhau && formik.touched.matKhau ? (<div className="text-danger">{formik.errors.matKhau}</div>) : ''}
                        </div>
                        <div className='reset__left-item'>
                            <p>Nhập lại mật khẩu</p>
                            <Input.Password value={formik.values.nhapLaiMatKhau} name="nhapLaiMatKhau" className='reset__left-input' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {formik.errors.nhapLaiMatKhau && formik.touched.nhapLaiMatKhau ? (<div className="text-danger">{formik.errors.nhapLaiMatKhau}</div>) : ''}
                        </div>
                        <div className="reset__left-form-control">
                            <Button type="primary" htmlType="submit" className='reset__left-btn'>Xác nhận</Button>
                        </div>
                    </form>
                </div>
                <div className='col-7 reset__right'>
                    <img src={Image.frame} className='reset__right-img'/>
                </div>
            </div>
        </div>
    </div>
  )
}
