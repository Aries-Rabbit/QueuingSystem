import { Breadcrumb, Modal, Select } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { capSoCreator, State } from '../../Redux';
import { numberMaxCapSo } from '../../Util/method';
import { Image } from '../../Util/variableImage';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase/firebase.config';

const {Option} = Select;

export const ThemCapSo = () => {

    const dispatch = useDispatch();

    const [capSoList,setCapSoList] = useState<any>([]);

    const {LoadDuLieu} = bindActionCreators(capSoCreator, dispatch);

    const [select, setSelect] = useState<string>('fdsafadfs');

    useEffect(()=> {
      LoadDuLieu();
    }, []);

    const {capSoData} = useSelector((state:State)=>state.capSo);
    const {userLogin} = useSelector((state:State)=>state.taiKhoan);

    useEffect(() => {
      console.log(capSoData);
      const getAccount = async () => {
        setCapSoList(capSoData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
        console.log('Cấp số list',capSoList);
      }
      getAccount();

    }, [capSoData]);

    const navigate = useNavigate();
    const location = useLocation();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };


    const handleSubmit = (e:any) => {

      let date = new Date();

      e.preventDefault();
      showModal();
      const max = numberMaxCapSo(capSoList);
      const stt = parseInt(max) + 1;
      console.log(e.target.value);

      const day = date.getDate();
      console.log(day);
      const month = date.getMonth() + 1;
      const hours = date.getHours();
      const hoursHSD = hours + 4;
      let dayString = '';
      let monthString = '';
      if(day < 10) {
          dayString = `0${day}`
      }
      if (month < 10) {
        monthString = `0${month}`
      }



      const addCapSo = async () => {
        const docRef = await addDoc(collection(db, "capSo"), {
          email: `${userLogin[0].email}`,
          sdt: `${userLogin[0].sdt}`,
          tenDichVu: `${select}`,
          trangThaiHoatDong: `Đang hoạt động`,
          stt: `${stt}`,
          nguonCap: 'Kiosk',
          tenKhachHang: `${userLogin[0].hoTen}`,
          thoiGianCap: `${date.getHours()}:${date.getSeconds()} - ${dayString}/${monthString}/${date.getFullYear()}`,
          HSD: `${hoursHSD}:${date.getSeconds()} - ${dayString}/${monthString}/${date.getFullYear()}`
        });
      }
      addCapSo();
    }

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
                    <span>Cấp số</span>
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

    const handleChangeSelect = (event:any) => {
        console.log(`select ${event}`);
        setSelect(`${event}`);
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
                <div className='capSo__content-container'>
                    <h5 className='content__container-heading'>
                        Cấp số mới
                    </h5>
                    <form className='content__container-form' onSubmit={handleSubmit}>
                        <div className='content__container-form-top'>
                            <p className='form__top-title'>Dịch vụ khách hàng lựa chọn</p>
                            <Select defaultValue="Khám tổng quát" style={{ width: 400 }} onChange={handleChangeSelect} className='form__top-select' autoFocus={false} suffixIcon={<img src={Image.select}/>} placeholder='Chọn dịch vụ' dropdownClassName='capSo__dropdown'>
                                  <Option value="Khám tổng quát">Khám tổng quát</Option>
                                  <Option value="Khám tai mũi họng">Khám tai mũi họng</Option>
                                  <Option value="Khám răng hàm mặt">Khám răng hàm mặt</Option>
                                  <Option value="Khám tim mạch">Khám tim mạch</Option>
                                  <Option value="Khám sản - phụ khoa">Khám sản - phụ khoa</Option>
                                  <Option value="Khám hô hấp">Khám hô hấp</Option>
                            </Select>
                        </div>
                        <div className='content__container-form-bottom'>
                            <button type='button' className='form__bottom-btn-cancel' onClick={()=> {
                                navigate('/capSo');
                            }}>
                                Hủy bỏ
                            </button>
                            <button className='form__bottom-btn-print' type='submit'>In số</button> 
                        </div>
                    </form>
                </div>
            </div>
            <Modal title={<Fragment>
                <h3>Số thứ tự được cấp</h3>
                <p className='modal__capSo-number'>2001201</p>
                <p className='modal__capSo-info'>
                    DV: Khám răng hàm mặt 
                    <span> (tại quầy số 1)</span>
                </p>
            </Fragment>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className='modal__capSo'>
                <p>Thời gian cấp: 09:30 11/10/2021</p>
                <p>Hạn sử dụng: 17:30 11/10/2021</p>
            </Modal>
        </div>
    )
}
