import { Breadcrumb, DatePicker, Input, Select, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { capSoCreator, State } from '../../Redux';
import { Image } from '../../Util/variableImage';

const {Option} = Select;

const data = [
  {
      "soThuTu": "2010001",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Kiosk"
  },
  {
      "soThuTu": "2010002",
      "tenKhachHang": "Huỳnh Ái Vân",
      "tenDichVu": "Khám sản - Phụ khoa",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đã sử dụng",
      "nguonCap": "Kiosk"
  },
  {
      "soThuTu": "2010003",
      "tenKhachHang": "Lê Ái Vân",
      "tenDichVu": "Khám răng hàm mặt",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Hệ thống"
  },
  {
      "soThuTu": "2010004",
      "tenKhachHang": "Trần Thị Ái Vân",
      "tenDichVu": "Khám tai mũi họng",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Hệ thống"
  },
  {
      "soThuTu": "2010005",
      "tenKhachHang": "Lê Huỳnh Nghĩa",
      "tenDichVu": "Khám tổng quát",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đã sử dụng",
      "nguonCap": "Kiosk"
  },
  {
      "soThuTu": "2010006",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Hệ thống"
  },
  {
      "soThuTu": "2010007",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Bỏ qua",
      "nguonCap": "Kiosk"
  },
  {
      "soThuTu": "2010008",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Hệ thống"
  },
  {
      "soThuTu": "2010009",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Kiosk"
  },
  {
      "soThuTu": "2010022",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Kiosk"
  },
  {
      "soThuTu": "2010023",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Bỏ qua",
      "nguonCap": "Kiosk"
  },
  {
      "soThuTu": "2010024",
      "tenKhachHang": "Lê Huỳnh Ái Vân",
      "tenDichVu": "Khám tim mạch",
      "thoiGianCap": "14:35 - 07/11/2021",
      "hanSuDung": "14:35 - 12/11/2021",
      "trangThai": "Đang chờ",
      "nguonCap": "Kiosk"
  },
];

export const DanhSachCapSo = () => {

    const dispatch = useDispatch();
    
    const {LoadDuLieu} = bindActionCreators(capSoCreator, dispatch);

    useEffect(()=> {
        LoadDuLieu();
    }, []);

    const {capSoData} = useSelector((state: State) => state.capSo);

    useEffect(()=> {
        console.log('Cấp số', capSoData.docs);
        const getAccount = async () => {
          setCapSoList(capSoData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
          console.log('Cấp số list',capSoList);
      }
        getAccount();
    }, [capSoData]);  

    const [startValue,setStartValue] = useState<any>(null);
    const [endValue,setEndValue] = useState<any>(null);
    const [endOpen,setEndOpen] = useState<boolean>(false);
    const [capSoList,setCapSoList] = useState<any>([]);

    const navigate = useNavigate();

    const location = useLocation();

    const date = new Date();

    const dateFormat = 'DD/MM/YYYY';

    const columns = [
  
      {
        title: 'STT',
        dataIndex: 'stt',
        width: 93,
      },
      {
        title: 'Tên khách hàng',
        dataIndex: 'tenKhachHang',
        width: 162,
      },
      {
        title: 'Tên dịch vụ',
        dataIndex: 'tenDichVu',
        width: 171,
      },
      {
        title: 'Thời gian cấp',
        dataIndex: 'thoiGianCap',
        width: 161,
      },
      {
        title: 'Hạn sử dụng',
        dataIndex: 'HSD',
        width: 174,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'trangThaiHoatDong',
        width: 147,
        render: (dataIndex:string) => {
    
            if(dataIndex === 'Đang chờ') {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                  <img src={`${Image.dangthuchien}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                  {dataIndex}
                </div>
            }
            else if(dataIndex === 'Đã sử dụng') {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                  <img src={`${Image.vang}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
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
        title: 'Nguồn cấp',
        dataIndex: 'nguonCap',
        width: 120,
      },
      {
        title: ' ',
        dataIndex: 'id',
        width: 125,
        render: (dataIndex: string) => {
          return (
            <button onClick={()=> {
              navigate(`/capSo/chiTietCapSo/${dataIndex}`);
            }}>
              Chi tiết
            </button>
          )
        }
      }
    ];


    const handleChangeSelect = (event:any) => {
      console.log(`select ${event}`);
    }

    const disabledStartDate = (startValue:any) => {
        // const day = (current:any) => current.isBefore(moment().subtract(1,"day"));
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      };
    
    const  disabledEndDate = (endValue:any) => {
        if (!endValue || !(startValue - 1)) {
          return false;
        } else if(!startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      };
    
    const onStartChange = (value:any) => {
        setStartValue(value);
        console.log(value);
      };
    
    const onEndChange = (value:any) => {
        setEndValue(value);
        console.log(value)
      };
    
    const handleStartOpenChange = (open:any) => {
        if (!open) {
        setEndOpen(true);
        }
      };
    
    const handleEndOpenChange = (open:any) => {
        setEndOpen(open);
      };
    
    const onChange = (value:any) => {
      const values = value.target.value;
      console.log('values: ',values);

      if( values !== '') {
        const result = capSoList.filter((item: any) => item.stt === values || item.tenKhachHang === values || item.tenDichVu === values || item.nguonCap === values);

        console.log(result);
  
        if(result[0] !== undefined) {
          setCapSoList(result);
        }else {
          const getThietBi = async () => {
            setCapSoList(capSoData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
          }
          getThietBi();
        }
      }else {
        const getThietBi = async () => {
          setCapSoList(capSoData.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
        }
        getThietBi();
      }
    };

    function onOk(value:any) {
        console.log('onOk: ', value);
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
                  <Breadcrumb.Item>Danh sách cấp số</Breadcrumb.Item>
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
          <div className='capSo__breadcrumb'>
              {breadCrumbView()}
          </div>
          <div className='capSo__content'>
                  <h3 className='capSo__content-heading'>
                  Danh sách cấp số
                  </h3>
                  <div className='capSo__content-menu'>
                      <div className='capSo__content-list capSo__content-option'>
                          <div className='capSo__content-item'>
                              <span>Tên dịch vụ</span>
                              <Select defaultValue="Tất cả" style={{ width: 154 }} onChange={handleChangeSelect} className='capSo__content-select' autoFocus={false} suffixIcon={<img src={Image.select}/>}>
                                  <Option value="Tất cả">Tất cả</Option>
                                  <Option value="Khám sản - phụ khoa">Khám sản - phụ khoa</Option>
                                  <Option value="Khám răng hàm mặt">Khám răng hàm mặt</Option>
                                  <Option value="Khám tai mũi họng">Khám tai mũi họng</Option>
                                  <Option value="Khám hô hấp">Khám hô hấp</Option>
                                  <Option value="Khám tổng quát">Khám tổng quát</Option>
                              </Select>
                          </div>
                          <div className='capSo__content-item'>
                              <span>Tình trạng</span>
                              <Select defaultValue="Tất cả" style={{ width: 154 }} onChange={handleChangeSelect} className='capSo__content-select' autoFocus={false} suffixIcon={<img src={Image.select}/>}>
                                  <Option value="Tất cả">Tất cả</Option>
                                  <Option value="Hoạt động">Đang chờ</Option>
                                  <Option value="Ngưng hoạt động">Đã sử dụng</Option>
                                  <Option value="Ngưng hoạt động">Bỏ qua</Option>
                              </Select>
                          </div>
                          <div className='capSo__content-item'>
                              <span>Nguồn cấp</span>
                              <Select defaultValue="Tất cả" style={{ width: 154 }} onChange={handleChangeSelect} className='capSo__content-select' autoFocus={false} suffixIcon={<img src={Image.select}/>}>
                                  <Option value="Tất cả">Tất cả</Option>
                                  <Option value="Hoạt động">Kiosk</Option>
                                  <Option value="Ngưng hoạt động">Hệ thống</Option>
                              </Select>
                          </div>
                          <div className='capSo__content-item'>
                              <span>Chọn thời gian</span>
                              <div>
                                  <DatePicker
                                      disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))}
                                      value={startValue}
                                      placeholder={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                                      onChange={onStartChange}
                                      format={dateFormat}
                                      onOpenChange={handleStartOpenChange}    
                                      suffixIcon={<img src={`${Image.date}`}/>}
                                      superNextIcon={<></>}
                                      superPrevIcon={<></>}
                                  />
                                  <img src={`${Image.separatorDate}`} className="ant-picker-img"/>
                                  <DatePicker
                                      disabledDate={disabledEndDate}
                                      value={endValue}
                                      placeholder={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                                      format={dateFormat}
                                      suffixIcon={<img src={`${Image.date}`}/>}
                                      onChange={onEndChange}
                                      open={endOpen}
                                      onOpenChange={handleEndOpenChange}
                                      superNextIcon={<></>}
                                      superPrevIcon={<></>}
                                  />
                              </div>
                          </div>
                      </div>
                      <div className='capSo__content-list capSo__content-search'>
                          <div className='capSo__content-item'>
                              <span>Từ khóa</span>
                              <Input
                                  placeholder="Nhập từ khóa"
                                  // allowClear
                                  onChange={onChange}
                                  style={{ width: 240 }}
                                  suffix={<img src={`${Image.search}`} 
                                  className='capSo__content-input'
                                  />}
                              />
                          </div>
                      </div>
                  </div>
                  <div className='capSo__content-table'>
                    <Table
                        dataSource={capSoList}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 9, itemRender:itemRender }}
                        bordered
                    >
                    </Table>
                  </div>
          </div>
          <div className='capSo__addcapSo' onClick={()=>{
              navigate('/capSo/themCapSo');
          }}>
              <img src={`${Image.create}`}/>
              <span>Cấp số mới</span>
          </div>
      </div>
    )
}
