import { Breadcrumb, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { State, vaiTroCreator } from '../../../Redux';
import { Image } from '../../../Util/variableImage';

const data = [
    {
        "tenVaiTro": "Kế toán",
        "soNguoiDung": 6,
        "moTa": "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu"
    },
    {
        "tenVaiTro": "Bác sĩ",
        "soNguoiDung": 6,
        "moTa": "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu"
    },
    {
        "tenVaiTro": "Lễ tân",
        "soNguoiDung": 6,
        "moTa": "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu"
    },
    {
        "tenVaiTro": "Quản lý",
        "soNguoiDung": 6,
        "moTa": "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu"
    },
    {
        "tenVaiTro": "Admin",
        "soNguoiDung": 6,
        "moTa": "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu"
    },
    {
        "tenVaiTro": "Superadmin",
        "soNguoiDung": 6,
        "moTa": "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu"
    },
  ];

export const DanhSachVaiTro = () => {

  const dispatch = useDispatch();

  const [vaiTro, setVaiTro] = useState<any>([]);

  const {LoadDuLieu} = bindActionCreators(vaiTroCreator, dispatch);

  useEffect(()=> {
    LoadDuLieu();
  }, []);

  const vaiTroData = useSelector((state: State) => state.vaiTro);

  useEffect(()=> {
    // console.log('nhật kí',nhatKyData);
    const vaiTroDoc = vaiTroData.vaiTroData;
    const getVaiTro = async () => {
      setVaiTro(vaiTroDoc.docs.map((doc:any)=> ({...doc.data(), id: doc.id})));
    }
    getVaiTro();
  }, [vaiTroData]);

    const location = useLocation();

    const navigate = useNavigate();

    const columns = [
  
        {
            title: 'Tên vai trò',
            dataIndex: 'tenVaiTro',
            width: 224,
        },
        {
            title: 'Số người dùng',
            dataIndex: 'soNguoiDung',
            width: 224,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: 537,
        },
            {
            title: ' ',
            dataIndex: 'id',
            width: 125,
            render: (dataIndex: string) => {
                return (
                <button onClick={()=> {
                    navigate(`/qlVaiTro/capNhatVaiTro/${dataIndex}`);
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
                  <Breadcrumb.Item>Quản lý vai trò</Breadcrumb.Item>
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
    
    return (
        <div>
            <div className='vaiTro__breadcrumb'>
                {breadCrumbView()}
            </div>
            <div className='vaiTro__content'>
                <h3 className='vaiTro__content-heading'>
                Danh sách vai trò
                </h3>
                <div className='vaiTro__content-table'>
                    <Table
                        dataSource={vaiTro}
                        columns={columns}
                        size="small"
                        // pagination={{ pageSize: 6, itemRender:itemRender }}
                        pagination={false}
                        bordered
                    >
                    </Table>
                </div>
            </div>
            <div className='vaiTro__addVaiTro' onClick={()=>{
                navigate('/qlVaiTro/themVaiTro');
            }}>
                <img src={`${Image.create}`}/>
                <span>Thêm vai trò</span>
            </div>
        </div>
    )
}
