import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import { Select } from 'antd';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import * as Data from '../../data/ThietBiData.json';
 
type ItemProps = {
  maThietBi: string,
  tenThietBi: string,
  diaChi: string,
  trangThaiHD: string,
  trangThaiKN: string,
  dichVu: string,
}

const data = [
  {
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
      "key": 0
  },
  {
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
      "key": 1,
  },
  {
      "key": 2,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    "key": 3,
    "maThietBi": "KIO_01",
    "tenThietBi": "Kiosk",
    "diaChi": "192.168.1.10",
    "trangThaiHD": "Ngưng hoạt động",
    "trangThaiKN": "Kết nối",
    "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
  },
  {
    "key": 4,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 5,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 6,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 7,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 8,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {    
    "key": 9,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {    
    "key": 10,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {    
    "key": 11,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
      "key": 0
  },
  {
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát",
      "key": 1,
  },
  {
      "key": 2,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 3,
    "maThietBi": "KIO_01",
    "tenThietBi": "Kiosk",
    "diaChi": "192.168.1.10",
    "trangThaiHD": "Ngưng hoạt động",
    "trangThaiKN": "Kết nối",
    "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 4,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 5,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 6,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 7,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {
    "key": 8,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
  {    
    "key": 9,
      "maThietBi": "KIO_01",
      "tenThietBi": "Kiosk",
      "diaChi": "192.168.1.10",
      "trangThaiHD": "Ngưng hoạt động",
      "trangThaiKN": "Mất kết nối",
      "dichVu": "Khám tim mạch, Khám Sản - Phụ Khoa, Khám răng hàm mặt. Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
  },
];
const { Option } = Select;

const { Search } = Input;

export const Thietbi = () => {

  return (
    <div className='thietBi'>
      <Outlet/>
    </div>
  )
}
