import { Breadcrumb, Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from '../../../Util/variableImage';
import { db } from '../../../firebase/firebase.config';
import {collection, onSnapshot, getDocs} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { LoadDuLieu } from '../../../Redux/ActionCreator/taiKhoanCreator';
import { State, taiKhoanCreator } from '../../../Redux';
import { bindActionCreators } from 'redux';

const {Option} = Select;

export const DanhSachTaiKhoan = () => {

    const dispatch = useDispatch();

    const [account, setAccount] = useState<any>([]);
    
    const {LoadDuLieu} = bindActionCreators(taiKhoanCreator, dispatch);

    useEffect(()=> {
      LoadDuLieu();
    }, []);


    const {taiKhoanData} = useSelector((state: State) => state.taiKhoan);

    useEffect(()=> {
      console.log(taiKhoanData);
      const getAccount = async () => {
          setAccount(taiKhoanData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
      }
        getAccount();
    }, [taiKhoanData]);

    useEffect(()=> {
      console.log('account nè',account);
    }, [account])

    const location = useLocation();

    const navigate = useNavigate();

    const columns = [
  
      {
          title: 'Tên đăng nhập',
          dataIndex: 'tenDangNhap',
          width: 150,
      },
      {
          title: 'Họ tên',
          dataIndex: 'hoTen',
          width: 166,
      },
      {
          title: 'Số điện thoại',
          dataIndex: 'sdt',
          width: 130,
      },
      {
          title: 'Email',
          dataIndex: 'email',
          width: 255,
      },
      {
          title: 'Vai trò',
          dataIndex: 'vaiTro',
          width: 114,
      },
      {
          title: 'Trạng thái hoạt động',
          dataIndex: 'trangThaiHoatDong',
          width: 193,
          render: (dataIndex:string) => {
              if(dataIndex === 'Hoạt động') {
                  return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                    <img src={Image.hoatdong} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                    <span>{dataIndex}</span>
                  </div>
              }else {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                  <img src={Image.ngunghoatdong} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                  <span>{dataIndex}</span>
                </div>
              }
          }
      },
      {
        title: ' ',
        dataIndex: "id",
        width: 99,
        render: (dataIndex:any) => {
            return (
            <button onClick={()=> {
                navigate(`/qlTaiKhoan/capNhatTaiKhoan/${dataIndex}`);
                }}>
                Cập nhật
                </button>
            )
        }
      }
    
    ];

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
                  <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
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

    function itemRender(current:any, type:any, originalElement:any) {
      if (type === 'prev') {
        return <a><img src={Image.prev}/></a>;
      } else if (type === 'next') {
        return <a><img src={Image.next}/></a>;
      }
      return originalElement;
    }

    const handleChangeSelect = (event:any) => {
      console.log(`select ${event}`);
    }

    const onChange = (value:any) => {
      const values = value.target.value;
      console.log('values: ',values);

      if( values !== '') {
        const result = account.filter((item: any) => item.tenDangNhap === values || item.hoTen === values || item.sdt === values || item.email === values || item.vaiTro === values);

        console.log(result);
  
        if(result[0] !== undefined) {
          setAccount(result);
        }else {
          const getAccount = async () => {
            setAccount(taiKhoanData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
        }
          getAccount();
        }
      }else {
        const getAccount = async () => {
          setAccount(taiKhoanData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
      }
        getAccount();
      }
    }
  
  return (
    <div>
        <div className='taiKhoan__breadcrumb'>
        {breadCrumbView()}
        </div>
        <div className='taiKhoan__content'>
            <h3 className='taiKhoan__content-heading'>
            Danh sách tài khoản
            </h3>
            <div className='taiKhoan__content-menu'>
            <div className='taiKhoan__content-list'>
                <div className='taiKhoan__content-item'>
                <span>Trạng thái hoạt động</span>
                <Select defaultValue="Tất cả" style={{ width: 300 }} onChange={handleChangeSelect} className='taiKhoan__content-select' autoFocus={false} suffixIcon={<img src={Image.select}/>}>
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="Hoạt động">Hoạt động</Option>
                    <Option value="Ngưng hoạt động">Ngưng hoạt động</Option>
                </Select>
                </div>
                <div className='taiKhoan__content-item'>
                <span>Từ khóa</span>
                <Input
                    placeholder="Nhập từ khóa"
                    // allowClear
                    onChange={onChange}
                    style={{ width: 304 }}
                    suffix={<img src={`${Image.search}`} 
                    className='taiKhoan__content-input'
                    />}
                />
                </div>
            </div>
            </div>
            <div className='taiKhoan__content-table'>
                <Table
                    dataSource={account}
                    columns={columns}
                    size="small"
                    pagination={{ pageSize: 9, itemRender:itemRender }}
                    bordered
                >
                </Table>
            </div>
        </div>
        <div className='taiKhoan__addTaiKhoan' onClick={()=>{
        navigate('/qlTaiKhoan/themTaiKhoan');
        }}>
            <img src={`${Image.create}`}/>
            <span>Thêm tài khoản</span>
        </div>
    </div>
  )
}
