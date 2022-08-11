import { Breadcrumb, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { dichVuCreator, State } from '../../Redux';
import { Image } from '../../Util/variableImage';
import {MyParams}  from '../../config/paramType';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase.config';

interface formikFace {
  maDichVu: string,
  tenDichVu: string,
  moTa: string
}

export const CapNhatDichVu = () => {

    const {id} = useParams<keyof MyParams>() as MyParams;

    const [infoDichVu, setInfoDichVu] = useState<any>({
      maDichVu: '',
      tenDichVu: '',
      moTa: '',
    });

    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(dichVuCreator, dispatch);

    useEffect(()=> {
      LayDuLieu(id);
    }, []);

    const dichVuInfo = useSelector((state: State) => state.dichVu);

    useEffect(()=> {
      console.log('dịch vụ info', dichVuInfo);
      const dichVuData = dichVuInfo.dichVuInfo[0]._document.data.value.mapValue.fields;
      setInfoDichVu({
        maDichVu: `${dichVuData.maDichVu.stringValue}`,
        tenDichVu: `${dichVuData.tenDichVu.stringValue}`,
        moTa: `${dichVuData.moTa.stringValue}`,
      })
    }, [dichVuInfo]);

    const navigate = useNavigate();
    const location = useLocation();
    
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
                  <a onClick={()=> {
                      navigate(`/dichvu/chiTietDichVu/${id}`);
                  }}>Chi tiết</a>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  <img src={`${Image.separator}`}/>
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <span>Cập nhật</span>
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

    // Checkbox
    function onChange(e:any) {
      console.log(`checked = ${e.target.checked}`);
    }

    const validationSchema = yup.object().shape({
      maDichVu: yup.number().typeError('Không được nhập ký tự chuỗi!')
        .required('Không được bỏ trống!').min(3, 'Tối thiểu 3 số!'),
      tenDichVu: yup.string()
        .required('Không được bỏ trống!'),
      moTa: yup.string()
        .required('Không được bỏ trống!'),  
    })

    const initialValues: formikFace = {
        "maDichVu": `${infoDichVu.maDichVu}`,
        "tenDichVu": `${infoDichVu.tenDichVu}`,
        "moTa": `${infoDichVu.moTa}`
    }

    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values:any) => {
        console.log(values);

        const updateDichVu = async () => {
            const dichVuRef = doc(db, "dichVu", `${id}`);
            // Set the "capital" field of the city 'DC'
            await updateDoc(dichVuRef, {
              maDichVu: `${values.maDichVu}`,
              moTa: `${values.moTa}`,
              tenDichVu: `${values.tenDichVu}`
            });
        }

        updateDichVu();
        
      },
      validationSchema
    });

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
                      <h3 className='content__update-heading'>
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
                    </div>
                    <div className='content__update-item'>
                      <h3 className='content__update-heading'>
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
                <div className='content__update-bottom'>
                    <button className='content__update-bottom-button dichVu__cancel' type="button" onClick={()=> {
                        navigate('/dichVu');
                    }}>
                        <span>Hủy bỏ</span>
                    </button>
                    <button className='content__update-bottom-button dichVu__add' type="submit">
                        <span>Cập nhật</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
