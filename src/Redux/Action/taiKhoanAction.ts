type loadDuLieu = {
    type: 'LOAD_DATA',
    payload: any
}

type CapNhatDuLieu = {
    type: 'LOAD_DATA',
    payload: any
}

type LayDuLieu = {
    type: 'LAY_DU_LIEU',
    payload: string
}

type dangNhap = {
    type: 'DANG_NHAP',
    payload: {
        tenDangNhap: string,
        matKhau: string
    }
}

type KiemTraEmail = {
    type: 'KIEM_TRA_EMAIL',
    payload: string
}

export type ActionProps = loadDuLieu | CapNhatDuLieu | LayDuLieu | dangNhap | KiemTraEmail;