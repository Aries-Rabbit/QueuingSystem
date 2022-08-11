import { Breadcrumb, Button, DatePicker, Input, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import XLSX from 'xlsx';

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
        "thoiGianCap": "14:35 - 08/11/2021",
        "hanSuDung": "14:35 - 12/11/2021",
        "trangThai": "Đã sử dụng",
        "nguonCap": "Kiosk"
    },
    {
        "soThuTu": "2010003",
        "tenKhachHang": "Lê Ái Vân",
        "tenDichVu": "Khám răng hàm mặt",
        "thoiGianCap": "14:35 - 09/11/2021",
        "hanSuDung": "14:35 - 12/11/2021",
        "trangThai": "Đang chờ",
        "nguonCap": "Hệ thống"
    },
    {
        "soThuTu": "2010004",
        "tenKhachHang": "Trần Thị Ái Vân",
        "tenDichVu": "Khám tai mũi họng",
        "thoiGianCap": "14:35 - 10/11/2021",
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
        "thoiGianCap": "14:35 - 10/11/2021",
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
        "thoiGianCap": "14:35 - 08/11/2021",
        "hanSuDung": "14:35 - 12/11/2021",
        "trangThai": "Đang chờ",
        "nguonCap": "Hệ thống"
    },
    {
        "soThuTu": "2010009",
        "tenKhachHang": "Lê Huỳnh Ái Vân",
        "tenDichVu": "Khám tim mạch",
        "thoiGianCap": "14:35 - 08/11/2021",
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
        "thoiGianCap": "14:35 - 09/11/2021",
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


export const LapBaoCao = () => {

    const [startValue,setStartValue] = useState<any>(null);
    const [endValue,setEndValue] = useState<any>(null);
    const [endOpen,setEndOpen] = useState<boolean>(false);

    const [dayStart, setDayStart] = useState<string>('');
    const [dayEnd, setDayEnd] = useState<string>('');

    const navigate = useNavigate();
    const location = useLocation();

    const date = new Date();

    const dateFormat = 'DD/MM/YYYY';

    const columns = [
  
        {
          title: 'Số thứ tự',
          dataIndex: 'soThuTu',
          width: 226,
          filters: [
            {
                text: 'Tất cả',
                value: '2010001',
            },
            {
                text: '2010001',
                value: '2010001',
            },
            {
                text: '2010002',
                value: '2010002',
            },
          ],
          onFilter: (value:any, record:any) => record.soThuTu.indexOf(value) === 0,
          filterIcon: (filterd:any) => <img src={Image.arrowRight}/>
        },
        {
          title: 'Tên dịch vụ',
          dataIndex: 'tenDichVu',
          width: 232,
          filters: [
            {
                text: 'Tất cả',
                value: 'all',
            },
            {
                text: 'Khám tim mạch',
                value: 'Khám tim mạch',
            },
            {
                text: 'Khám mắt',
                value: 'Khám mắt',
            },
            {
                text: 'Khám tổng quát',
                value: 'Khám tổng quát',
            },
            {
                text: 'Khám tai mũi họng',
                value: 'Khám tai mũi họng',
            },
            {
                text: 'Khám hô hấp',
                value: 'Khám hô hấp',
            },
          ],
          onFilter: (value:any, record:any) => record.tenDichVu.indexOf(value) === 0,
          filterIcon: (filterd:any) => <img src={Image.arrowRight}/>
        },
        {
          title: 'Thời gian cấp',
          dataIndex: 'thoiGianCap',
          width: 238,
          filters: [
            {
                text: 'Tất cả',
                value: 'all',
            },
            {
                text: '14:35 07/11/2021',
                value: '14:35 - 07/11/2021',
            },
            {
                text: '14:35 08/11/2021',
                value: '14:35 - 08/11/2021',
            },
            {
                text: '14:35 09/11/2021',
                value: '14:35 - 09/11/2021',
            },
            {
                text: '14:35 10/11/2021',
                value: '14:35 - 10/11/2021',
            },
          ],
          onFilter: (value:any, record:any) => record.thoiGianCap.indexOf(value) === 0,
          filterIcon: (filterd:any) => <img src={Image.arrowRight}/>
        },
        {
          title: 'Trạng thái hoạt động',
          dataIndex: 'trangThai',
          width: 216,
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
            
          },
          filters: [
            {
                text: 'Tất cả',
                value: 'all',
            },
            {
                text: 'Đang chờ',
                value: 'Đang chờ',
            },
            {
                text: 'Đã sử dụng',
                value: 'Đã sử dụng',
            },
            {
                text: 'Bỏ qua',
                value: 'Bỏ qua',
            },
          ],
          onFilter: (value:any, record:any) => record.trangThai.indexOf(value) === 0,
          filterIcon: (filterd:any) => <img src={Image.arrowRight}/>
        },
        {
          title: 'Nguồn cấp',
          dataIndex: 'nguonCap',
          width: 196,
          filters: [
            {
                text: 'Tất cả',
                value: 'all',
            },
            {
                text: 'Kiosk',
                value: 'Kiosk',
            },
            {
                text: 'Hệ thống',
                value: 'Hệ thống',
            }
          ],
          onFilter: (value:any, record:any) => record.nguonCap.indexOf(value) === 0,
          filterIcon: (filterd:any) => <img src={Image.arrowRight}/>,
        }
      ];

      function itemRender(current:any, type:any, originalElement:any) {
        if (type === 'prev') {
          return <a><img src={Image.prev}/></a>;
        } else if (type === 'next') {
          return <a><img src={Image.next}/></a>;
        }
        return originalElement;
      }


    const breadCrumbView = () => {
        const {pathname} = location;
        const pathnames = pathname.split('/').filter((item) => item);
        return (
          <div>
            <Breadcrumb separator=''>
              {pathnames.length > 0 ? (
                <>
                  <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>Lập báo cáo</Breadcrumb.Item>
                </>
              ) : (
                <>
                  <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
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
        const test = value._d;
        console.log(test);
        const day = test.getDate();
        const month = test.getMonth() + 1;
        const year = test.getFullYear();
        let dayString = '';
        let monthString = '';
        if(day < 10) {
            dayString = `0${day}`;
        }else {
            dayString = `${day}`
        }
        if(month < 10) {
          monthString = `0${month}`;
        }else {
          monthString = `${month}`
        }
        const date = `${dayString}/${monthString}/${year}`;
        setDayStart(date);
        console.log(date);
      };
    
    const onEndChange = (value:any) => {
        setEndValue(value);
        const test = value._d;
        console.log(test);
        const day = test.getDate();
        const month = test.getMonth() + 1;
        const year = test.getFullYear();
        let dayString = '';
        let monthString = '';
        if(day < 10) {
            dayString = `0${day}`;
        }else {
            dayString = `${day}`
        }
        if(month < 10) {
          monthString = `0${month}`;
        }else {
          monthString = `${month}`
        }
        const date = `${dayString}/${monthString}/${year}`;
        setDayEnd(date);
        console.log(date);
      };
    
    const handleStartOpenChange = (open:any) => {
        if (!open) {
        setEndOpen(true);
        }
      };
    
    const handleEndOpenChange = (open:any) => {
        setEndOpen(open);
    };

    useEffect(()=> {
      console.log('dayStart', dayStart);
    }, [dayStart]);

    useEffect(()=> {
      console.log('dayEnd', dayEnd);
    }, [dayEnd]);
    
    return (
        <div>
            <div className='baoCao__breadcrumb'>
                {breadCrumbView()}
            </div>
            <div className='baoCao__content'>
                <div className='baoCao__content-top'>
                    <h5 className='baoCao__content-top-heading'>
                        Chọn thời gian
                    </h5>
                    <div className='baoCao__content-top-select'>
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
                <div className='baoCao__content-bottom'>
                    <div className='baoCao__content-bottom-table'>
                        <Table
                            dataSource={data}
                            columns={columns}
                            size="small"
                            pagination={{ pageSize: 10, itemRender:itemRender }}
                            bordered
                            id="table"
                        >
                        </Table>
                    </div>
                </div>
            </div>
            <div className='baoCao__download' style={{marginRight:'60px'}} onClick={()=>{
                const downloadExcel = () => {
                    const workSheet = XLSX.utils.json_to_sheet(data);
                    const workBook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workBook, workSheet, "baoCao");
                    //Buffer 
                    let buf = XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'});
                    //Binary string
                    XLSX.write(workBook, {bookType: 'xlsx', type: 'binary'});
                    //Download
                    XLSX.writeFile(workBook, 'baoCaoData.xlsx');
                }
                downloadExcel();
            }}>
                <img src={`${Image.download}`}/>
                <span >Tải về</span>
            </div>
        </div>
    )
}
