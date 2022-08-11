import { Breadcrumb, Select, DatePicker, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dichVuCreator, State } from '../../Redux';
import { MyParams } from '../../config/paramType';
import { array } from 'yup/lib/locale';

const { Option } = Select;

const data = [
  {    
     "key": 9,
      "soThuTu": "2010001",
      "trangThaiHD": "Đã hoàn thành",

  },
  {    
    "key": 9,
     "soThuTu": "2010003",
     "trangThaiHD": "Đã hoàn thành",

 },
 {    
    "key": 9,
    "soThuTu": "2010006",
    "trangThaiHD": "Đang thực hiện",

  },
  {    
    "key": 9,
    "soThuTu": "2010005",
    "trangThaiHD": "Vắng",

  },
  {    
    "key": 9,
    "soThuTu": "2010004",
    "trangThaiHD": "Đã hoàn thành",

  },
  {    
    "key": 9,
    "soThuTu": "2010006",
    "trangThaiHD": "Đang thực hiện",

  },
  {    
    "key": 9,
    "soThuTu": "2010009",
    "trangThaiHD": "Vắng",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Đã hoàn thành",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Ngưng hoạt động",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Ngưng hoạt động",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Đã hoàn thành",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Đã hoàn thành",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Vắng",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Đã hoàn thành",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Vắng",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Đang thực hiện",

  },
  {    
    "key": 9,
     "soThuTu": "2010003",
     "trangThaiHD": "Đã hoàn thành",

 },
 {    
    "key": 9,
    "soThuTu": "2010006",
    "trangThaiHD": "Đang thực hiện",

  },
  {    
    "key": 9,
    "soThuTu": "2010005",
    "trangThaiHD": "Vắng",

  },
  {    
    "key": 9,
    "soThuTu": "2010004",
    "trangThaiHD": "Đã hoàn thành",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Ngưng hoạt động",

  },
  {    
    "key": 9,
    "soThuTu": "2010001",
    "trangThaiHD": "Vắng",

  },
  {    
    "key": 9,
    "soThuTu": "2010044",
    "trangThaiHD": "Ngưng hoạt động",

  },
  {    
    "key": 9,
    "soThuTu": "2010045",
    "trangThaiHD": "Đang thực hiện",

  },
  {    
    "key": 9,
    "soThuTu": "2010046",
    "trangThaiHD": "Đang thực hiện",

  },
  {    
    "key": 9,
    "soThuTu": "2010047",
    "trangThaiHD": "Vắng",

  },

];


export const ChiTietDichVu = () => {

    const [infoDichVu, setInfoDichVu] = useState<any>({
        maDichVu: '',
        tenDichVu: '',
        moTa: '',
        listCapSo: [],
    });

    const navigate = useNavigate();

    const location = useLocation();

    const [startValue,setStartValue] = useState<any>(null);
    const [endValue,setEndValue] = useState<any>(null);
    const [endOpen,setEndOpen] = useState<boolean>(false);

    const {id} = useParams<keyof MyParams>() as MyParams;

    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(dichVuCreator, dispatch);

    useEffect(()=> {
      LayDuLieu(id);
    }, []);

    const dichVuInfo = useSelector((state: State) => state.dichVu);

    useEffect(()=> {
        console.log(dichVuInfo);
          const dichVuDoc =  dichVuInfo.dichVuInfo[0]._document.data.value.mapValue.fields;
          console.log('Dịch vụ Doc', dichVuDoc);
          const listCapSo = dichVuDoc.listCapSo.arrayValue.values;
          let stateCapSo:any = [];
          console.log('listCapSo', listCapSo);
          for(let i in listCapSo) {
              console.log(listCapSo[i]);
              // stateCapSo.push(listCapSo[item].mapValue.fields);
              const itemTemp = {
                  stt: '',
                  trangThai: ''
              };
              itemTemp.stt = listCapSo[i].mapValue.fields.stt.stringValue;
              itemTemp.trangThai = listCapSo[i].mapValue.fields.trangThai.stringValue;
              stateCapSo.push(itemTemp);
          }
          console.log('stateCapSo', stateCapSo);
          setInfoDichVu({
              maDichVu: `${dichVuDoc.maDichVu.stringValue}`,
              tenDichVu: `${dichVuDoc.tenDichVu.stringValue}`,
              moTa: `${dichVuDoc.moTa.stringValue}`,
              listCapSo: stateCapSo
          })
          console.log('infoDichVu',infoDichVu); 
    }, [dichVuInfo])
    
    const date = new Date();

    const dateFormat = 'DD/MM/YYYY';

    const columns = [
  
      {
        title: 'Số thứ tự',
        dataIndex: 'stt',
        width: 334,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'trangThai',
        width: 334,
        render: (dataIndex:string) => {
    
            if(dataIndex === 'Đã hoàn thành') {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                  <img src={`${Image.hoatdong}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                  {dataIndex}
                </div>
            }
            else if(dataIndex === 'Đang thực hiện') {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                  <img src={`${Image.dangthuchien}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                  {dataIndex}
                </div>
            } else {
                return <div className='d-flex align-items-center' style={{fontSize: '14px'}}>
                    <img src={`${Image.vang}`} style={{marginRight: '4px', transform: 'translateY(-1px)'}}/>
                    {dataIndex}
                </div>
            }
          
        }
      },
    
    ];

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
                    <span>Chi tiết</span>
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
        } else if (!startValue) {
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
    
    const onChange = (value:any) => console.log(value.target.value);

    function onOk(value:any) {
        console.log('onOk: ', value);
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
        <div className='dichVu__breadcrumb'>
            {breadCrumbView()}
        </div>
        <div className='dichVu__content'>
            <h3 className='dichVu__content-heading'>
            Quản lý dịch vụ
            </h3>
            <div className='dichVu__content-detail'>
                <div className='content__detail-left'>
                    <div className='detail__item'>
                        <h5>Thông tin dịch vụ</h5>
                        <div className='detail__info'>
                            <div className='detail__info-item'>
                                <p className='detail__info-left'>Mã dịch vụ: </p>
                                <span className='detail__info-right'>{infoDichVu.maDichVu}</span>
                            </div>
                            <div className='detail__info-item'>
                                <p className='detail__info-left'>Tên dịch vụ: </p>
                                <span className='detail__info-right'>{infoDichVu.tenDichVu}</span>
                            </div>
                            <div className='detail__info-item'>
                                <p className='detail__info-left'>Mô tả: </p>
                                <span className='detail__info-right'>{infoDichVu.moTa}</span>
                            </div>
                        </div>
                    </div>
                    <div className='detail__item'>
                        <h5>Quy tắc cấp số</h5>
                        <div className='detail__info'>
                            <div className='detail__info-item'>
                                <p className='detail__info-left'>Tăng tự động: </p>
                                <div className='detail__info-right'>
                                    <div className='detail__info-number'>0001</div>
                                    <span>đến</span>
                                    <div className='detail__info-number'>9999</div>
                                </div>
                            </div>
                            <div className='detail__info-item'>
                                <p className='detail__info-left'>Prefix: </p>
                                <div className='detail__info-right'>
                                    <div className='detail__info-number'>0001</div>
                                </div>
                            </div>
                            <div className='detail__info-item'>
                                <p className='detail__info-left'>Reset mỗi ngày: </p>
                            </div>
                            <div className='detail__info-item'>
                                <p className='detail__info-left' style={{fontWeight: '400'}}>
                                    Ví dụ: 201-2001
                                </p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content__detail-right'>
                    <div className='dichVu__content-menu detail'>
                        <div className='dichVu__content-list dichVu__content-option'>
                            <div className='dichVu__content-item'>
                                <span>Trạng thái</span>
                                <Select defaultValue="Tất cả" style={{ width: 160}} onChange={handleChangeSelect} className='dichVu__content-select' autoFocus={false} suffixIcon={<img src={Image.select}/>}>
                                    <Option value="Tất cả">Tất cả</Option>
                                    <Option value="Hoạt động">Hoạt động</Option>
                                    <Option value="Ngưng hoạt động">Ngưng hoạt động</Option>
                                </Select>
                            </div>
                            <div className='dichVu__content-item'>
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
                                        style={{width: '130px'}}
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
                                        style={{width: '130px'}}
                                    />
                                </div>
                            </div>
                            <div className='dichVu__content-item'>
                                <div className='dichVu__content-item'>
                                    <span>Từ khóa</span>
                                    <Input
                                        placeholder="Nhập từ khóa"
                                        // allowClear
                                        onChange={onChange}
                                        style={{ width: 206 }}
                                        suffix={<img src={`${Image.search}`} 
                                        className='dichVu__content-input'
                                        />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dichVu__content-table detail'>
                      <Table
                        dataSource={infoDichVu.listCapSo}
                        columns={columns}
                        size="small"
                        pagination={{ pageSize: 8, itemRender:itemRender }}
                        bordered
                      >
                      </Table>
                    </div>
                </div>
            </div>
        </div>
        <div className='dichVu__capNhat' onClick={()=> {
            navigate(`/dichVu/capNhatDichVu/${id}`);
        }}>
            <img src={`${Image.edit}`}/>
            <span>Cập nhật danh sách</span>
        </div>
        <div className='dichVu__return' onClick={()=> {
            navigate('/dichVu');
        }}>
            <img src={`${Image.returnImage}`}/>
            <span>Quay lại</span>
        </div>
    </div>
  )
}
