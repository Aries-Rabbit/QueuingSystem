import { Breadcrumb } from 'antd';
import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { MyParams } from '../../config/paramType';
import { Image } from '../../Util/variableImage';
import { State, thietBiCreator } from '../../Redux/index';


export const ChiTietThietBi = () => {

    const location = useLocation();

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

    useEffect(()=> {
      LayDuLieu(id);
      console.log(id);
  }, []);
    
    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(thietBiCreator, dispatch);

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
        console.log('infoAccount',infoThietBi);
    }, [thietBiInfo]);

    const navigate = useNavigate();

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
                    <span>Chi tiết thiết bị</span>
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

  return (
    <div>

        <div className='thietBi__breadcrumb'>
            {breadCrumbView()}
        </div>
        <div className='thietBi__content'>
            <h3 className='thietBi__content-heading'>
            Quản lý thiết bị
            </h3>
            <div className='thietBi__content-about'>
                <h3 className='content__about-heading'>
                    Thông tin chi tiết
                </h3>
                <div className='content__about-list'>
                    <div className='content__about-item'>
                        <div className='about__info-list'>
                            <div className='about__info-item'>
                                <p>Mã thiết bị:</p>
                                <span>{infoThietBi.maThietBi}</span>
                            </div>
                            <div className='about__info-item'>
                                <p>Tên thiết bị:</p>
                                <span>{infoThietBi.tenThietBi}</span>
                            </div>
                            <div className='about__info-item'>
                                <p>Địa chỉ IP:</p>
                                <span>{infoThietBi.diaChi}</span>
                            </div>
                        </div>
                    </div>
                    <div className='content__about-item'>
                        <div className='about__info-list'>
                            <div className='about__info-item'>
                                <p>Loại thiết bị</p>
                                <span>{infoThietBi.loaiThietBi}</span>
                            </div>
                            <div className='about__info-item'>
                                <p>Tên đăng nhập</p>
                                <span>{infoThietBi.tenDangNhap}</span>
                            </div>
                            <div className='about__info-item'>
                                <p>Mật khẩu</p>
                                <span>{infoThietBi.matKhau}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p style={{color: '##282739', fontWeight: '600', marginBottom: '8px'}}>Dịch vụ sử dụng:</p>
                </div>
                <div>
                    <p style={{color: '#535261'}}>Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát.</p>
                </div>
            </div>
        </div>

        <div className='thietBi__capNhat' onClick={()=> {
            navigate(`/thietbi/capNhatThietBi/${id}`);
        }}>
            <img src={`${Image.edit}`}/>
            <span>Cập nhật thiết bị</span>
        </div>
    </div>
  )
}
