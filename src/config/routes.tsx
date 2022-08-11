import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import { BaoCao } from '../component/BaoCao/BaoCao';
import { LapBaoCao } from '../component/BaoCao/LapBaoCao';
import { DanhSachVaiTro } from '../component/CaiDatHeThong/VaiTro/DanhSachVaiTro';
import { NhatKyNguoiDung } from '../component/CaiDatHeThong/NguoiDung/NhatKyNguoiDung';
import { QuanLyTaiKhoan } from '../component/CaiDatHeThong/TaiKhoan/QuanLyTaiKhoan';
import { QuanLyVaiTro } from '../component/CaiDatHeThong/VaiTro/QuanLyVaiTro';
import { Capso } from '../component/CapSo/Capso';
import { ChiTietCapSo } from '../component/CapSo/ChiTietCapSo';
import { DanhSachCapSo } from '../component/CapSo/DanhSachCapSo';
import { ThemCapSo } from '../component/CapSo/ThemCapSo';
import { ConfirmEmail } from '../component/ConfirmEmail';
import { Dashboard } from '../component/Dashboard/Dashboard';
import { DashboardDate } from '../component/Dashboard/DashboardDate';
import { DashboardMonth } from '../component/Dashboard/DashboardMonth';
import { DashboardWeek } from '../component/Dashboard/DashboardWeek';
import { CapNhatDichVu } from '../component/DichVu/CapNhatDichVu';
import { ChiTietDichVu } from '../component/DichVu/ChiTietDichVu';
import { DanhSachDichVu } from '../component/DichVu/DanhSachDichVu';
import { Dichvu } from '../component/DichVu/Dichvu';
import { ThemDichVu } from '../component/DichVu/ThemDichVu';
import { Home } from '../component/Home';
import { InnerContext } from '../component/InnerContext';
import { Login } from '../component/Login';
import { Profile } from '../component/Profile';
import { ResetPassword } from '../component/ResetPassword';
import { CapNhatThietBi } from '../component/ThietBi/CapNhatThietBi';
import { ChiTietThietBi } from '../component/ThietBi/ChiTietThietBi';
import { DanhSachThietBi } from '../component/ThietBi/DanhSachThietBi';
import { ThemThietBi } from '../component/ThietBi/ThemThietBi';
import { Thietbi } from '../component/ThietBi/Thietbi';
import { ThemVaiTro } from '../component/CaiDatHeThong/VaiTro/ThemVaiTro';
import { CapNhatVaiTro } from '../component/CaiDatHeThong/VaiTro/CapNhatVaiTro';
import { CapNhattaiKhoan } from '../component/CaiDatHeThong/TaiKhoan/CapNhatTaiKhoan';
import { DanhSachTaiKhoan } from '../component/CaiDatHeThong/TaiKhoan/DanhSachTaiKhoan';
import { ThemTaiKhoan } from '../component/CaiDatHeThong/TaiKhoan/ThemTaiKhoan';

const MainRoutes = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>}>   
            <Route index element={<Dashboard/>}/>         
            <Route path='profile' element={<Profile/>}/> 
            <Route path='dashboard' element={<Dashboard/>}>
              <Route index element={<DashboardDate/>}/>
              <Route path='dashboardMonth' element={<DashboardMonth/>}/>
              <Route path='dashboardWeek' element={<DashboardWeek/>}/>
            </Route>           
            <Route path='thietbi' element={<Thietbi/>}>
              <Route index element={<DanhSachThietBi/>}/>
              <Route path='themThietBi' element={<ThemThietBi/>}/>
              <Route path='chiTietThietBi/:id' element={<ChiTietThietBi/>}/>
              <Route path='capNhatThietBi/:id' element={<CapNhatThietBi/>}/>
            </Route>           
            <Route path='dichvu' element={<Dichvu/>}>
              <Route index element={<DanhSachDichVu/>}/>  
              <Route path='chiTietDichVu/:id' element={<ChiTietDichVu/>}/>  
              <Route path='capNhatDichVu/:id' element={<CapNhatDichVu/>}/>  
              <Route path='themDichVu' element={<ThemDichVu/>}/>  
            </Route>           
            <Route path='capso' element={<Capso/>}>
              <Route index element={<DanhSachCapSo/>}/>
              <Route path='chiTietCapSo/:id' element={<ChiTietCapSo/>}/>
              <Route path='themCapSo' element={<ThemCapSo/>}/>
            </Route>           
            <Route path='baocao' element={<BaoCao/>}>
              <Route index element={<LapBaoCao/>}/>  
            </Route>
            <Route path='qlVaiTro' element={<QuanLyVaiTro/>}>
                <Route index element={<DanhSachVaiTro/>}/>
                <Route path='themVaiTro' element={<ThemVaiTro/>}/>
                <Route path='capNhatVaiTro/:id' element={<CapNhatVaiTro/>}/>
            </Route> 
            <Route path='qlTaiKhoan' element={<QuanLyTaiKhoan/>}>
              <Route index element={<DanhSachTaiKhoan/>}/>
              <Route path='capNhatTaiKhoan/:id' element={<CapNhattaiKhoan/>}/>            
              <Route path='themTaiKhoan' element={<ThemTaiKhoan/>}/>            
            </Route> 
            <Route path='nhatKyNguoiDung' element={<NhatKyNguoiDung/>}/> 
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/confirmEmail' element={<ConfirmEmail/>}/>
          <Route path='/resetPassword/:id' element={<ResetPassword/>}/>
        </Routes>
    </div>
  )
}

export default MainRoutes;
