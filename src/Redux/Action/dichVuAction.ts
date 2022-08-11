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


export type ActionProps = loadDuLieu | CapNhatDuLieu | LayDuLieu ;