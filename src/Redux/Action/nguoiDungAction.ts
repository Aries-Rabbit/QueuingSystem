type LoadDuLieu = {
    type: 'LOAD_DATA',
    payload: any
}

type LayDuLieu = {
    type: 'LAY_DU_LIEU',
    payload: any
}

export type ActionProps = LoadDuLieu | LayDuLieu;