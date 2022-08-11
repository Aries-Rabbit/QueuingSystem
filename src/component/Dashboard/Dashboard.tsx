import React, { useState } from 'react'
import { Outlet, useNavigate  } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import { RadialBar } from '@ant-design/plots';
import { Select } from 'antd';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type configCapSoType = {
    annotation: [],
}

const { Option } = Select;

export const Dashboard = () => {

    const [date,setDate] = useState<any>(new Date());

    const [elementChoose, setElementChoose] = useState<string>('DashboardDate');
    
    const navigate = useNavigate();

    function handleChange(value:any) {
       if(value === 'day') {
            navigate('/dashboard');
       }else if (value === 'week') {
            navigate('/dashboard/dashboardWeek');
       }else {
            navigate('/dashboard/dashboardMonth');
       }
    }

    function onPanelChange(value:any, mode:any) {
        console.log(value, mode);
    }

    //Thiết bị
    const [thietBi, setThietBi] = useState<number>(4221)
    const [thietBiHD, setThietBiHD] = useState<number>(3799)
    const [thietBiNHD, setThietBiNHD] = useState<number>(422)

    //Dịch vụ
    const [dichVu, setDichVu] = useState<number>(276)
    const [dichVuHD, setdichVuHD] = useState<number>(210)
    const [dichVuNHD, setDichVuNHD] = useState<number>(66)

    //Cấp số
    const [capSo, setcapSo] = useState<number>(4221)
    const [capSoDaSD, setCapSoDaSD] = useState<number>(3721)
    const [capSoDangCho, setCapSoDangCho] = useState<number>(486)
    const [capSoBoQua, setCapSoBoQua] = useState<number>(32)

    //tính phần trăm thiết bị
    const maxAngleThietBi = (thietBiHD/thietBi)*360;
    const ngungHD = (thietBiNHD/thietBi)*360;
    const maxAngleThietBiPhanTram =  (thietBiHD/thietBi) * 100;

    //Tính phần trăm dịch vụ
    const maxAngleDichVu = (dichVuHD/dichVu)*360;
    const ngungHDDichVu = (dichVuNHD/dichVu)*360;
    const maxAngleDichVuPhanTram =  (dichVuHD/dichVu) * 100;

    //Tính phần trăm cấp số
    const maxAngleCapSo = (capSoDaSD/capSo)*360;
    const dangChoCapSo = (capSoDangCho/capSo)*360;
    const boQuaCapSo = (capSoBoQua/capSo)*360;
    const maxAngleCapSoPhanTram =  (capSoDaSD/capSo) * 100;

    console.log(maxAngleDichVu);
    console.log(ngungHDDichVu);


    const dataThietBi = [
        {
          name: '',
          star: ngungHD,
        },
        {
          name: '2',
          star: maxAngleThietBi,
        },
    ];

    const dataDichVu = [
        {
          name: '',
          star: ngungHDDichVu,
        },
        {
          name: '2',
          star: maxAngleDichVu,
        },
    ];

    const dataCapSo = [
        {
            name: '',
            star: boQuaCapSo + 20,
        },
        {
            name: '2',
            star: dangChoCapSo,
        },
        {
            name: '4',
            star: maxAngleCapSo,
        },
    ];

    const configThietbi:any = {       
        data: dataThietBi,
        xField: 'name',
        yField: 'star',
        width: 60,
        height: 60,
        radius: 1,
        innerRadius: 0.75,
        maxAngle: maxAngleThietBi,
        tooltip: {
            showContent: false
        },
        colorField: 'star',
        color: ({ star}:any) => {
          if (star > 50) {
            return '#FF7506';
          } else if (star < 50) {
            return '#7E7D88';
          }
          return '#FF7506';
        },
        barBackground: {},
        barStyle: {
            cursor: 'pointer',
            lineCap: 'round'
        },
        type: 'round',
        annotations: [
            {
                type: 'text',
                position: ['32%', '50%'],
                content: `${maxAngleThietBiPhanTram.toFixed(0)}%`
            }
        ]
      };

      const configDichVu:any = {
        data: dataDichVu,
        xField: 'name',
        yField: 'star',
        width: 60,
        height: 60,
        radius: 1,
        innerRadius: 0.75,
        maxAngle: maxAngleDichVu,
        tooltip: {
            showContent: false
        },
        colorField: 'star',
        color: ({ star}:any) => {
          if (star > (dichVu/2)) {
            return '#4277FF';
          } else if (star < (dichVu/2)) {
            return '#7E7D88';
          }
    
          return '#4277FF';
        },
        barBackground: {},
        barStyle: {
            cursor: 'pointer',
            lineCap: 'round'
        },
        annotations: [
            {
                type: 'text',
                position: ['32%', '50%'],
                content: `${maxAngleDichVuPhanTram.toFixed(0)}%`
            }
        ]
      };

      const configCapSo:any = {
        data: dataCapSo,
        xField: 'name',
        yField: 'star',
        width: 60,
        height: 60,
        radius: 1,
        innerRadius: 0.6,
        maxAngle: maxAngleCapSo,
        tooltip: {
            showContent: false
        },
        colorField: 'star',
        color: ({ star}:any) => {
          if (star > (dichVu/2)) {
            return '#35C75A';
          } else if (star < (dichVu/2) && star > 30) {
            return '#7E7D88';
          } else if (star < 30){
            return '#F178B6';
          }
          return '#35C75A';
        },
        barBackground: {},
        barStyle: {
            cursor: 'pointer',
            lineCap: 'round'
        },
        annotations: [
            {
                type: 'text',
                position: ['32%', '50%'],
                content: `${maxAngleCapSoPhanTram.toFixed(0)}%`
            }
        ]
      };

      
    return (
        <div className='dashboard'> 
            <div className='dashboard__content'>
                <div className='dashboard__content-left'>
                    <h2 className='dashboard__heading'>Dashboard</h2> 
                    <h5 className='content__heading'>
                        Biểu đồ cấp số
                    </h5>
                    <div className='content__list'>
                        <div className="content__item" onClick={()=> {
                            navigate('/capSo');
                        }}>
                            <div className='content__item-top'>
                                <img src={`${Image.calendar}`}/>
                                <p>Số thứ tự đã cấp</p>
                            </div>
                            <div className='content__item-bottom'>
                                <p className='content__item-number'>{thietBi}</p>
                                <div className='content__item-growth increment'>
                                    <img src={`${Image.increment}`}/>
                                    <span> 32,41%</span>
                                </div>
                            </div>
                        </div>
                        <div className="content__item" onClick={()=> {
                            navigate('/capSo');
                        }}>
                            <div className='content__item-top'>
                                <img src={`${Image.calendarplus}`}/>
                                <p>Số thứ tự đã sử dụng</p>
                            </div>
                            <div className='content__item-bottom'>
                                <p className='content__item-number'>{thietBiHD} </p>
                                <div className='content__item-growth decrement'>
                                    <img src={`${Image.decrement}`}/>
                                    <span> 32,41%</span>
                                </div>
                            </div>
                        </div>
                        <div className="content__item" onClick={()=> {
                            navigate('/capSo');
                        }}>
                            <div className='content__item-top'>
                                <img src={`${Image.hangcho}`}/>
                                <p>Số thứ tự đang chờ</p>
                            </div>
                            <div className='content__item-bottom'>
                                <p className='content__item-number'>468</p>
                                <div className='content__item-growth increment'>
                                    <img src={`${Image.increment}`}/>
                                    <span> 56,41%</span>
                                </div>
                            </div>
                        </div>
                        <div className="content__item" onClick={()=> {
                            navigate('/capSo');
                        }}>
                            <div className='content__item-top'>
                                <img src={`${Image.flag}`}/>
                                <p>Số thứ tự đã bỏ qua</p>
                            </div>
                            <div className='content__item-bottom'>
                                <p className='content__item-number'>4.221</p>
                                <div className='content__item-growth decrement'>
                                    <img src={`${Image.decrement}`}/>
                                    <span>22,41%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content__chart'>
                        <Outlet/>
                        <div className='content__chart-select'>
                            <span className='content__chart-text'>Xem theo</span>
                            <Select defaultValue="Ngày" style={{ width: 120 }} onChange={handleChange} suffixIcon={<img src={Image.select}/>}>
                                <Option value="day">Ngày</Option>
                                <Option value="week">Tuần</Option>
                                <Option value="month">Tháng</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='dashboard__content-right'>
                    <h3 className='content__right-heading'>Tổng quan</h3>
                    <div className='content__right-list'>
                        <div className="content__right-item">
                            <div className='item__left'>
                                <RadialBar  {...configThietbi} />
                                <div className='item__number'>
                                    <p>{thietBi}</p>
                                    <div className='item__text thietbi'>
                                        <img src={`${Image.thietbimau}`}/>
                                        <span>Thiết bị</span>
                                    </div>
                                </div>
                            </div>
                            <div className='item__right'>
                                <div className='item__right-list'>
                                    <div className='item__right-item'>
                                        <div className='item__right-status'>
                                            <img src={`${Image.danghoatdongthietbi}`}/>
                                            <span>Đang hoạt động</span>
                                        </div>
                                        <div className='item__right-number thietbi'>
                                            <span>{thietBiHD}</span>
                                        </div>
                                    </div>
                                    <div className='item__right-item'>
                                        <div className='item__right-status'>
                                            <img src={`${Image.ngunghoatdongthietbi}`}/>
                                            <span>Ngưng hoạt động</span>
                                        </div>
                                        <div className='item__right-number thietbi'>
                                            <span>{thietBiNHD}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content__right-item">
                            <div className='item__left'>
                                <RadialBar {...configDichVu} />
                                <div className='item__number'>
                                    <p>{dichVu}</p>
                                    <div className='item__text dichvu'>
                                        <img src={`${Image.dichvumau}`}/>
                                        <span>Dịch vụ</span>
                                    </div>
                                </div>
                            </div>
                            <div className='item__right'>
                                <div className='item__right-list'>
                                    <div className='item__right-item'>
                                        <div className='item__right-status'>
                                            <img src={`${Image.danghoatdongdichvu}`}/>
                                            <span>Đang hoạt động</span>
                                        </div>
                                        <div className='item__right-number dichvu'>
                                            <span>210</span>
                                        </div>
                                    </div>
                                    <div className='item__right-item'>
                                        <div className='item__right-status'>
                                            <img src={`${Image.ngunghoatdongdichvu}`}/>
                                            <span>Ngưng hoạt động</span>
                                        </div>
                                        <div className='item__right-number dichvu'>
                                            <span>66</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content__right-item">
                            <div className='item__left'>
                                <RadialBar {...configCapSo} />
                                <div className='item__number'>
                                    <p>{capSo}</p>
                                    <div className='item__text capso'>
                                        <img src={`${Image.capsomau}`}/>
                                        <span>Cấp số</span>
                                    </div>
                                </div>
                            </div>
                            <div className='item__right'>
                                <div className='item__right-list'>
                                    <div className='item__right-item'>
                                        <div className='item__right-status'>
                                            <img src={`${Image.dasudungcapso}`}/>
                                            <span>Đã sử dụng</span>
                                        </div>
                                        <div className='item__right-number capso'>
                                            <span>3.721</span>
                                        </div>
                                    </div>
                                    <div className='item__right-item'>
                                        <div className='item__right-status'>
                                            <img src={`${Image.dangchocapso}`}/>
                                            <span>Đang chờ</span>
                                        </div>
                                        <div className='item__right-number capso'>
                                            <span>486</span>
                                        </div>
                                    </div>
                                    <div className='item__right-item'>
                                        <div className='item__right-status'>
                                            <img src={`${Image.boquacapso}`}/>
                                            <span>Bỏ qua</span>
                                        </div>
                                        <div className='item__right-number capso'>
                                            <span>32</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content__right-calendar'>
                        <Calendar onChange={setDate} value={date}/>
                    </div>
                </div>
            </div>      
        </div>
  )
}
