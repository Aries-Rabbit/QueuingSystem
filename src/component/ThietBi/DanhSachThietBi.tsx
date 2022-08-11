import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import { Select } from 'antd';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import * as Data from '../../data/ThietBiData.json';
import { State, thietBiCreator } from '../../Redux';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';


  const { Option } = Select;
  
  const { Search } = Input;

export const DanhSachThietBi = () => {

   const dispatch = useDispatch();

   const [thietBi, setThietBi] = useState<any>();

   const {LoadDuLieu} = bindActionCreators(thietBiCreator, dispatch);

   useEffect(()=> {
     LoadDuLieu();
   }, []);

   const {thietBiData} = useSelector((state: State) => state.thietBi);

   useEffect(()=> {
     console.log(thietBiData);
     const getThietBi = async () => {
         setThietBi(thietBiData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
     }
       getThietBi();
   }, [thietBiData]);

    const location = useLocation();
  
    const navigate = useNavigate();
  
    const columns = [
  
      {
        title: 'Mã thiết bị',
        dataIndex: 'maThietBi',
        width: 120,
      },
      {
        title: 'Tên thiết bị',
        dataIndex: 'tenThietBi',
        width: 119,
      },
      {
        title: 'Địa chỉ IP',
        dataIndex: 'diaChi',
        width: 138,
      },
      {
        title: 'Trạng thái hoạt động',
        dataIndex: 'trangThaiHoatDong',
        width: 171,
        render: (dataIndex:string) => {
    
            if(dataIndex === 'Hoạt động') {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                  <img src={`${Image.hoatdong}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                  {dataIndex}
                </div>
            }
            else {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                  <img src={`${Image.ngunghoatdong}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                  {dataIndex}
                </div>
            }
          
        }
      },
      {
        title: 'Trạng thái kết nối',
        dataIndex: 'trangThaiKetNoi',
        width: 145,
        render: (dataIndex:string) => {
    
          if(dataIndex === 'Kết nối') {
              return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                <img src={`${Image.hoatdong}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                {dataIndex}
              </div>
          }
          else {
              return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                <img src={`${Image.ngunghoatdong}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                {dataIndex}
              </div>
          }
        
        }
      },
      {
        title: 'Dịch vụ sử dụng',
        dataIndex: 'dichVu',
        width: 268,
        render: (dataIndex:string) => {
            return <Fragment>
              <p className='ant-table-cell-content'>{dataIndex}</p>
              <div className='ant-table-cell-more'>
                <button className='more'>Xem thêm</button>
                <div className='ant-table-cell-dichvu'>
                  <p>{dataIndex} </p> 
                </div>     
              </div>
                  
            </Fragment>
        }
      },
      {
        title: ' ',
        dataIndex: 'id',
        render: (dataIndex:any) => {
          return (
            <button onClick={()=> {
              navigate(`/thietbi/chiTietThietBi/${dataIndex}`);
            }}>
              Chi tiết
            </button>
          )
        }
      },
      {
        title: ' ',
        dataIndex: 'id',
        render: (dataIndex:any) => {
          return (
            <button onClick={()=> {
                navigate(`/thietbi/capNhatThietBi/${dataIndex}`);
              }}>
                Cập nhật
              </button>
          )
        }
      }
    
    ];

    const handleChangeSelect = (event:any) => {
        console.log(`select ${event}`);
      }
    
    const onChange = (value:any) => {
      const values = value.target.value;
      console.log('values: ',values);

      if( values !== '') {
        const result = thietBi.filter((item: any) => item.tenThietBi === values || item.tenDangNhap === values || item.loaiThietBi === values || item.maThietBi === values || item.diaChi === values);

        console.log(result);
  
        if(result[0] !== undefined) {
          setThietBi(result);
        }else {
          const getThietBi = async () => {
            setThietBi(thietBiData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
          }
          getThietBi();
        }
      }else {
        const getThietBi = async () => {
          setThietBi(thietBiData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
        }
        getThietBi();
      }
      
    };

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
                  <Breadcrumb.Item>Danh sách thiết bị</Breadcrumb.Item>
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

      function itemRender(current:any, type:any, originalElement:any) {
        if (type === 'prev') {
          return <a><img src={Image.prev}/></a>;
        } else if (type === 'next') {
          return <a><img src={Image.next}/></a>;
        }
        return originalElement;
      }

  return (
    <div>

        <div className='thietBi__breadcrumb'>
            {breadCrumbView()}
        </div>
        <div className='thietBi__content'>
            <h3 className='thietBi__content-heading'>
            Danh sách thiết bị
            </h3>
            <div className='thietBi__content-menu'>
              <div className='thietBi__content-list thietBi__content-option'>
                <div className='thietBi__content-item'>
                <span>Trạng thái hoạt động</span>
                <Select defaultValue="Tất cả" style={{ width: 120 }} onChange={handleChangeSelect} className='thietBi__content-select' autoFocus={false} suffixIcon={<img src={Image.select}/>}>
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="Hoạt động">Hoạt động</Option>
                    <Option value="Ngưng hoạt động">Ngưng hoạt động</Option>
                </Select>
                </div>
                <div className='thietBi__content-item'>
                <span>Trạng thái kết nối</span>
                <Select defaultValue="Tất cả" style={{ width: 120 }} onChange={handleChangeSelect} className='thietBi__content-select' autoFocus={false} suffixIcon={<img src={Image.select}/>}>
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value="Kết nối">Kết nối</Option>
                    <Option value="Mất kết nối">Mất kết nối</Option>
                </Select>
                </div>
            </div>
            <div className='thietBi__content-list thietBi__content-search'>
                <div className='thietBi__content-item'>
                <span>Từ khóa</span>
                <Input
                    placeholder="Nhập từ khóa"
                    // allowClear
                    onChange={onChange}
                    style={{ width: 304 }}
                    suffix={<img src={`${Image.search}`} 
                    className='thietBi__content-input'
                    />}
                />
                </div>
            </div>
            </div>
            <div className='thietBi__content-table'>
            <Table
                dataSource={thietBi}
                columns={columns}
                size="small"
                pagination={{ pageSize: 9, itemRender:itemRender }}
                bordered
            >
            </Table>
            </div>
        </div>
        <div className='thietBi__addThietBi' onClick={()=>{
            navigate('/thietbi/themThietBi');
        }}>
            <img src={`${Image.create}`}/>
            <span>Thêm thiết bị</span>
        </div>
    </div>
  )
}
