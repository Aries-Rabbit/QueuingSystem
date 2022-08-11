import { Breadcrumb, Select } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import {Formik, useFormik, FormikProps, Form, Field} from 'formik';
import { MyParams } from '../../config/paramType';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, thietBiCreator } from '../../Redux';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase.config';

interface formikFace {
    maThietBi: string,
    loaiThietBi: string,
    tenThietBi: string,
    tenDangNhap: string,
    diaChi: string,
    matKhau: string,
    dichVu: string[],
}

export const CapNhatThietBi = (props:any) => {

    const {id} = useParams<keyof MyParams>() as MyParams;

    const [infoThietBi,setInfoThietBi] = useState<any | undefined>({
        maThietBi: '',
        tenThietBi: '',
        loaiThietBi: '',
        dichVu: '',
        diaChi: '',
        tenDangNhap: '',
        matKhau: '',
    });

    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(thietBiCreator, dispatch);

    useEffect(()=> {
        LayDuLieu(id);
        console.log(id);
      }, []);

    const thietBiInfo = useSelector((state: State) => state.thietBi);

    useEffect(()=> {
        const thietBi = thietBiInfo.thietBiInfo[0]._document.data.value.mapValue.fields;
        console.log(thietBi);
        setInfoThietBi({
          maThietBi: `${thietBi.maThietBi.stringValue}`,
          tenThietBi: `${thietBi.tenThietBi.stringValue}`,
          loaiThietBi: `${thietBi.loaiThietBi.stringValue}`,
          dichVu: `${thietBi.dichVu.stringValue}`,
          diaChi: `${thietBi.diaChi.stringValue}`,
          tenDangNhap: `${thietBi.tenDangNhap.stringValue}`,
          matKhau: `${thietBi.matKhau.stringValue}`,
        });
    }, [thietBiInfo]);

    const { Option } = Select;

    const navigate = useNavigate();

    const location = useLocation();

    const initialValues: formikFace = {
        maThietBi: `${infoThietBi.maThietBi}`,
        loaiThietBi: `${infoThietBi.loaiThietBi}`,
        tenThietBi: `${infoThietBi.tenThietBi}`,
        tenDangNhap: `${infoThietBi.tenDangNhap}`,
        diaChi: `${infoThietBi.diaChi}`,
        matKhau: `${infoThietBi.matKhau}`,
        dichVu: [`${infoThietBi.dichVu}`],
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            const updateThietBi = async () => {
                const thietBiRef = doc(db, "thietBi", id);

                await updateDoc(thietBiRef, {
                    maThietBi: `${values.maThietBi}`,
                    loaiThietBi: `${values.loaiThietBi}`,
                    tenThietBi: `${values.tenThietBi}`,
                    tenDangNhap: `${values.tenDangNhap}`,
                    diaChi: `${values.diaChi}`,
                    matKhau: `${values.matKhau}`,
                    dichVu: [`${values.dichVu}`],
                })
            }
            updateThietBi();
        }
    })

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
                        navigate('/thietbi');
                    }}>Danh sách thiết bị</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <span>Cập nhật thiết bị</span>
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

      const handleChangeLoaiThietBi = (e:any) => {
            formik.setFieldValue('loaiThietBi',e.value);
      }

      const handleChangeDichVu = (e:any) => {
            formik.setFieldValue('dichVu', e);
    }

  return (
    <Fragment>
        <div className='thietBi__breadcrumb'>
            {breadCrumbView()}
        </div>
        <div className='thietBi__content'>
            <h3 className='thietBi__content-heading'>
            Quản lý thiết bị
            </h3>
            <form className='thietBi__content-update' onSubmit={formik.handleSubmit}>
                <div className='content__update-top'>
                    <h3 className='content__update-heading'>
                        Thông tin thiết bị
                    </h3>   
                    <div className='content__update-list'>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Mã thiết bị: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.maThietBi} name="maThietBi" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Loại thiết bị: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Select
                                labelInValue
                                value={{ value: `${formik.values.loaiThietBi}` }}
                                style={{ width: 120 }}
                                onChange={handleChangeLoaiThietBi}
                                suffixIcon={<img src={`${Image.select}`}/>}
                                className="content__update-item-select"
                            >
                                <Option value="kiosk">kiosk</Option>
                                <Option value="Display counter">Display counter</Option>
                            </Select>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Tên thiết bị: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.tenThietBi} name="tenThietBi" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Tên đăng nhập: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.tenDangNhap} name="tenDangNhap" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Địa chỉ IP: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.diaChi} name="diaChi" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Mật khẩu: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.matKhau} name="matKhau" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Dịch vụ sử dụng: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select one country"
                                value={{ value: `${formik.values.dichVu}` }}
                                onChange={handleChangeDichVu}
                                optionLabelProp="label"
                            >
                                <Option value="All" label="Tất cả">
                                    <div className="demo-option-label-item">
                                        Tất cả
                                    </div>
                                </Option>
                                <Option value="Khám tim mạch" label="Khám tim mạch">
                                    <div className="demo-option-label-item">
                                        Khám tim mạch
                                    </div>
                                </Option>
                                <Option value="Khám sản phụ khoa" label="Khám sản phụ khoa">
                                    <div className="demo-option-label-item">
                                        Khám sản phụ khoa
                                    </div>
                                </Option>
                                <Option value="Khám răng hàm mặt" label="Khám răng hàm mặt">
                                    <div className="demo-option-label-item">
                                        Khám răng hàm mặt
                                    </div>
                                </Option>
                                <Option value="Khám tai mũi họng" label="Khám tai mũi họng">
                                    <div className="demo-option-label-item">
                                        Khám tai mũi họng
                                    </div>
                                </Option>
                                <Option value="Khám hô hấp" label="Khám hô hấp">
                                    <div className="demo-option-label-item">
                                        Khám hô hấp
                                    </div>
                                </Option>
                                <Option value="Khám tổng quát" label="Khám tổng quát">
                                    <div className="demo-option-label-item">
                                        Khám tổng quát
                                    </div>
                                </Option>
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
                        navigate('/thietbi');
                    }}>Hủy bỏ</button>
                    <button type='submit' className='content__update-btn-update'>Cập nhật</button>
                </div>
            </form>  
        </div>
    </Fragment>
  )
}
