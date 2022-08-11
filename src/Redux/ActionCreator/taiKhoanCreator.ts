import { collection, getDocs } from "firebase/firestore";
import { Action, Dispatch } from "redux";
import { ActionProps } from "../Action/taiKhoanAction";
import {db} from '../../firebase/firebase.config';
import { useState } from "react";
import Swal from "sweetalert2";

//Load dữ liệu
export const LoadDuLieu = () => async (dispatch: Dispatch<ActionProps>) => {

    // const [account, setAccount] = useState<any>([]);

    try {
        const accountCollectionRef = collection(db, 'taiKhoan');    
        const data1 = await getDocs(accountCollectionRef);
        console.log(data1);
        dispatch({
            type: 'LOAD_DATA',
            payload: data1
        })
    }
    catch(error:any) {
        console.log('Lỗi rồi!')
    }
}


//Lấy dữ liệu   
export const LayDuLieu = (ID:string) => async (dispatch: Dispatch<ActionProps>) => {
    try {
        dispatch({
            type: 'LAY_DU_LIEU',
            payload: `${ID}`
        })
    }
    catch(error:any) {
        console.log('Lỗi rồi!')
    }
}

// Đăng nhập 
export const DangNhap = (tenDangNhap: string, matKhau: string) => async (dispatch: Dispatch<ActionProps>) => {
    try {
        dispatch({
            type: 'DANG_NHAP',
            payload: {
                tenDangNhap: `${tenDangNhap}`,
                matKhau: `${matKhau}`
            }
        })
    }
    catch(error) {
        console.log('Lỗi rồi!');

    }
}

// Kiểm tra email 
export const KiemTraEmail = (email: string) => async (dispatch: Dispatch<ActionProps>) => {
    try {
        dispatch({
            type: 'KIEM_TRA_EMAIL',
            payload: `${email}`
        })
    }
    catch(error) {
        console.log('Lỗi rồi!');
        alert('Email không chính xác!');
    }
}