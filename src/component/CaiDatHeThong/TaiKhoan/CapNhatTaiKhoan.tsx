import React, { useEffect, useState } from 'react'
import { Breadcrumb, Input, Select, Table } from 'antd';
import { Image } from '../../../Util/variableImage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { State, taiKhoanCreator } from '../../../Redux';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { MyParams } from '../../../config/paramType';
import * as yup from 'yup';
import { doc, updateDoc } from "firebase/firestore";
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

export const CapNhattaiKhoan = (props:any) => {

    const { id } = useParams<keyof MyParams>() as MyParams;

    const [idDocument, setIdDocument] = useState<string>('');

    const [infoAccount,setInfoAccount] = useState<any | undefined>({
        hoTen: '',
        tenDangNhap: '',
        sdt: '',
        matKhau: '',
        email: '',
        nhapLaiMatKhau: '',
        vaiTro: '',
        trangThaiHoatDong: ''
    });

    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(taiKhoanCreator, dispatch);

    useEffect(()=> {
        LayDuLieu(id);
        console.log(id);
    }, []);

    const taiKhoanInfo = useSelector((state: State) => state.taiKhoan);

    useEffect(()=> {
        setInfoAccount(taiKhoanInfo.taiKhoanInfo[0]._document.data.value.mapValue.fields);
        setIdDocument(taiKhoanInfo.taiKhoanInfo[0]._document.key.path.segments[6]);
        console.log('infoAccount',infoAccount);
    }, [taiKhoanInfo]);

    const location = useLocation();
    const navigate = useNavigate();


    const initialValues: formikFace = {
        hoTen: `${infoAccount.hoTen.stringValue}`,
        tenDangNhap: `${infoAccount.tenDangNhap.stringValue}`,
        sdt: `${infoAccount.sdt.stringValue}`,
        matKhau: `${infoAccount.matKhau.stringValue}`,
        email: `${infoAccount.email.stringValue}`,
        nhapLaiMatKhau: `${infoAccount.nhapLaiMatKhau.stringValue}`,
        vaiTro: `${infoAccount.vaiTro.stringValue}`,
        trangThaiHoatDong: `${infoAccount.trangThaiHoatDong.stringValue}`
    }

    const validationSchema = yup.object().shape({
        hoTen: yup.string()
          .required('Kh??ng ???????c b??? tr???ng!'),
        tenDangNhap: yup.string()
          .required('Kh??ng ???????c b??? tr???ng!'),
        sdt: yup.number().typeError('Kh??ng ???????c nh???p k?? t??? chu???i!')
          .required('Kh??ng ???????c b??? tr???ng!'),
        matKhau: yup.string()
          .required('Kh??ng ???????c b??? tr???ng!'),       
        email: yup.string()
          .email('Email kh??ng ????ng d???ng!')
          .required('Kh??ng ???????c b??? tr???ng!'),
        nhapLaiMatKhau: yup.string()
          .required('Kh??ng ???????c b??? tr???ng!'),    
      })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values:any) => {
            console.log('????y l?? gi?? tr???',values);
            const update = async () => {
                console.log(id);
                const washingtonRef = doc(db, "taiKhoan", `${idDocument}`);

                await updateDoc(washingtonRef, {
                    hoTen: values.hoTen,
                    email: values.email,
                    matKhau: values.matKhau,
                    nhapLaiMatKhau: values.matKhau,
                    sdt: values.sdt,
                    vaiTro: values.vaiTro,
                    trangThaiHoatDong: values.trangThaiHoatDong,
                    tenDangNhap: values.tenDangNhap,
                });
            }
            update();
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
                    <Breadcrumb.Item>C??i ?????t h??? th???ng</Breadcrumb.Item>
                    <Breadcrumb.Separator>
                      <img src={`${Image.separator}`}/>
                    </Breadcrumb.Separator>
                    <Breadcrumb.Item>
                        <a onClick={()=> {
                            navigate('/qlTaiKhoan');
                        }}>Qu???n l?? t??i kho???n</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator>
                      <img src={`${Image.separator}`}/>
                    </Breadcrumb.Separator>
                    <Breadcrumb.Item>C???p nh???t t??i kho???n</Breadcrumb.Item>
                  </>
                ) : (
                  <>
                    <Breadcrumb.Item>C??i ?????t h??? th???ng</Breadcrumb.Item>
                    <Breadcrumb.Item>
  
                    </Breadcrumb.Item>
                  </>
                )}
              </Breadcrumb>
            </div>
          )
    }

    return (
        <div>
            <div className='taiKhoan__breadcrumb'>
                {breadCrumbView()}
            </div>
            <div className='taiKhoan__content'>
                <h3 className='taiKhoan__content-heading'>
                Qu???n l?? thi???t b???
                </h3>
                <form className='taiKhoan__content-update' onSubmit={formik.handleSubmit}>
                    <div className='content__update-top'>
                        <h3 className='content__update-heading'>
                            Th??ng tin thi???t b???
                        </h3>   
                        <div className='content__update-list'>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>H??? t??n: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <input className='content__update-input' value={formik.values.hoTen} name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                {formik.errors.hoTen && formik.touched.hoTen ? (<div className="text-danger">{formik.errors.hoTen}</div>) : ''}
                            </div>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>T??n ????ng nh???p: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <input className='content__update-input' value={formik.values.tenDangNhap} name="tenDangNhap" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                {formik.errors.tenDangNhap && formik.touched.tenDangNhap ? (<div className="text-danger">{formik.errors.tenDangNhap}</div>) : ''}
                            </div>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>S??? ??i???n tho???i: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <input className='content__update-input' value={formik.values.sdt} name="sdt" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                {formik.errors.sdt && formik.touched.sdt ? (<div className="text-danger">{formik.errors.sdt}</div>) : ''}
                            </div>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>M???t kh???u: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}className='content__update-input' value={formik.values.matKhau} name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                {formik.errors.matKhau && formik.touched.matKhau ? (<div className="text-danger">{formik.errors.matKhau}</div>) : ''}
                            </div>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>Email: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <input className='content__update-input' value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                {formik.errors.email && formik.touched.email ? (<div className="text-danger">{formik.errors.email}</div>) : ''}
                            </div>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>Nh???p l???i m???t kh???u: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}className='content__update-input' value={formik.values.nhapLaiMatKhau} name='nhapLaiMatKhau' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                {formik.errors.nhapLaiMatKhau && formik.touched.nhapLaiMatKhau ? (<div className="text-danger">{formik.errors.nhapLaiMatKhau}</div>) : ''}
                            </div>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>Vai tr??: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <Select
                                    labelInValue
                                    value={{ value: `${formik.values.vaiTro}` }}
                                    style={{ width: 120 }}
                                    onChange={handleChangeSelectVaiTro}
                                    suffixIcon={<img src={`${Image.select}`}/>}
                                    className="content__update-item-select"
                                >
                                    <Option value="K??? to??n">K??? to??n</Option>
                                    <Option value="Qu???n l??">Qu???n l??</Option>
                                    <Option value="Admin">Admin</Option>
                                </Select>
                            </div>
                            <div className='content__update-item'>
                                <div className='content__update-label'>
                                    <span>T??nh tr???ng: </span>
                                    <img src={`${Image.chuY}`}/>
                                </div>
                                <Select
                                    labelInValue
                                    value={{ value: `${formik.values.trangThaiHoatDong}` }}
                                    style={{ width: 120 }}
                                    onChange={handleChangeSelectTrangThaiHoatDong}
                                    suffixIcon={<img src={`${Image.select}`}/>}
                                    className="content__update-item-select"
                                >
                                    <Option value="T???t c???">T???t c???</Option>
                                    <Option value='Ng??ng ho???t ?????ng'>Ng??ng ho???t ?????ng</Option>
                                    <Option value='Ho???t ?????ng'>Ho???t ?????ng</Option>
                                </Select>
                            </div>
                        </div>
                        <div className='content__update-warning'>
                            <img src={`${Image.chuY}`}/>
                            <span>L?? tr?????ng th??ng tin b???t bu???c</span>
                        </div>
                    </div>
                    <div className='content__update-bottom'>
                        <button type='button' className='content__update-btn-cancel' onClick={()=> {
                            navigate('/qlTaiKhoan');
                        }}>H???y b???</button>
                        <button type='submit' className='content__update-btn-update'>C???p nh???t</button>
                    </div>
                </form>  
            </div>
        </div>
    )
}
