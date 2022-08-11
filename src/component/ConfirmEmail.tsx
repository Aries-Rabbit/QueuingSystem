import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, taiKhoanCreator } from '../Redux';
import { useSelector } from 'react-redux';

export const ConfirmEmail = () => {

    const dispatch = useDispatch();

    const [taiKhoanID, setTaiKhoanID] = useState<string>('');

    const {KiemTraEmail, LoadDuLieu} = bindActionCreators(taiKhoanCreator, dispatch);

    const navigate = useNavigate();

    useEffect(() => {
        LoadDuLieu();
    }, []);

    const {confirmEmail, taiKhoanInfo} = useSelector((state: State)=>state.taiKhoan);

    useEffect(()=>{
        if(confirmEmail===true) {
            setTaiKhoanID(taiKhoanInfo.id);
        }
    }, [confirmEmail])

    useEffect(()=> {
        if(taiKhoanID !== '') {
            navigate(`/resetPassword/${taiKhoanID}`);
        }
    }, [taiKhoanID])

    const [form] = Form.useForm();

    const onFinish = (event: any) => {
        // console.log('Success:', values);
        console.log(event.email);
        const email = event.email;
        KiemTraEmail(email);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    const onReset = () => {
        form.resetFields();
    };

  return (
    <div className='layout'>
        <div className='container-fuild h-100'>
            <div className='row confirmPassword'>
                <div className='col-5 confirmPassword__left'>
                    <div className='confirmPassword__left-logo'>
                        <img src="./img/logo.png" className='confirmPassword__left-img'/>
                    </div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className='confirmPassword__left-form'
                        form={form}
                        >
                            <h3 style={{textAlign: 'center', fontWeight: '600'}}>Đặt lại mật khẩu</h3>
                            <p style={{fontSize: '1.1rem'}}>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
                        <Form.Item
                            label=""
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            {/* <Form.Item name="email"noStyle><Input className='confirmPassword__left-input'/></Form.Item> */}
                            <Input className='confirmPassword__left-input'/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="confirmPassword__left-form-control">
                            <Button htmlType="button" onClick={onReset} className='confirmPassword__left-btn confirmPassword__cancel'>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" className='confirmPassword__left-btn'>
                                <span style={{fontWeight: '500'}}>Tiếp tục</span>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='col-7 confirmPassword__right'>
                    <img src='img/Frame.png' className='confirmPassword__right-img'/>
                </div>
            </div>
        </div>
    </div>
  )
}
