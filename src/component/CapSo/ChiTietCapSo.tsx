import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { MyParams } from '../../config/paramType';
import { capSoCreator, State } from '../../Redux';
import { Image } from '../../Util/variableImage';

export const ChiTietCapSo = () => {

    const [capSo, setCapSo] = useState<any>({
        hoTen: '',
        tenDichVu: '',
        stt: '',
        thoiGianCap: '',
        HSD: '',
        nguonCap: '',
        trangThaiHoatDong: '',
        sdt: '',
        email: ''
    })
    
    const {id} = useParams<keyof MyParams>() as MyParams;

    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(capSoCreator, dispatch);

    useEffect(()=> {
        LayDuLieu(id);
    }, []);


    const capSoInfo = useSelector((state: State) => state.capSo);

    useEffect(()=> {
        console.log('capSoInfo',capSoInfo);
        const capSoData = capSoInfo.capSoInfo[0]._document.data.value.mapValue.fields;
        setCapSo({
            hoTen : `${capSoData.tenKhachHang.stringValue}`,
            tenDichVu: `${capSoData.tenDichVu.stringValue}`,
            stt: `${capSoData.stt.stringValue}`,
            thoiGianCap: `${capSoData.thoiGianCap.stringValue}`,
            HSD: `${capSoData.HSD.stringValue}`,
            nguonCap: `${capSoData.nguonCap.stringValue}`,
            trangThaiHoatDong: `${capSoData.trangThaiHoatDong.stringValue}`,
            sdt: `${capSoData.sdt.stringValue}`,
            email: `${capSoData.email.stringValue}`
        })
    }, [capSoInfo]);


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
                  <Breadcrumb.Item>Cấp số</Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <a onClick={()=> {
                        navigate('/capSo');
                    }}>Danh sách cấp số</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <span>Chi tiết</span>
                  </Breadcrumb.Item>
                </>
              ) : (
                <>
                  <Breadcrumb.Item>Cấp số</Breadcrumb.Item>
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
            <div className='capSo__breadcrumb'>
                {breadCrumbView()}
            </div>
            <div className='capSo__content'>
                <h3 className='capSo__content-heading'>
                Quản lý cấp số
                </h3>
                <div className='capSo__content-about'>
                    <h3 className='content__about-heading'>
                        Thông tin cấp số
                    </h3>
                    <div className='content__about-list'>
                        <div className='content__about-item'>
                            <div className='about__info-list'>
                                <div className='about__info-item'>
                                    <p>Họ tên:</p>
                                    <span>{capSo.hoTen}</span>
                                </div>
                                <div className='about__info-item'>
                                    <p>Tên dịch vụ:</p>
                                    <span>{capSo.tenDichVu}</span>
                                </div>
                                <div className='about__info-item'>
                                    <p>Số thứ tự: </p>
                                    <span>{capSo.tenDichVu}</span>
                                </div>
                                <div className='about__info-item'>
                                    <p>Thời gian cấp: </p>
                                    <span>{capSo.thoiGianCap}</span>
                                </div>
                                <div className='about__info-item'>
                                    <p>Hạn sử dụng: </p>
                                    <span>{capSo.HSD}</span>
                                </div>
                            </div>
                        </div>
                        <div className='content__about-item'>
                            <div className='about__info-list'>
                                <div className='about__info-item'>
                                    <p>Nguồn cấp</p>
                                    <span>{capSo.nguonCap}</span>
                                </div>
                                <div className='about__info-item'>
                                    <p>Trạng thái</p>
                                    <span className='d-flex align-items-center'>
                                        <img src={Image.dangthuchien} style={{marginRight: '3px'}}/>
                                        {capSo.trangThaiHoatDong}
                                    </span>
                                </div>
                                <div className='about__info-item'>
                                    <p>Số điện thoại</p>
                                    <span>{capSo.sdt}</span>
                                </div>
                                <div className='about__info-item'>
                                    <p>Địa chỉ Email: </p>
                                    <span>{capSo.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='capSo__return' onClick={()=> {
                navigate('/capSo');
            }}>
                <img src={`${Image.returnImage}`}/>
                <span>Quay lại</span>
            </div>
        </div>
    )
}
