import { combineReducers } from "redux";
import capSoReducer from "./capSoReducer";
import dichVuReducer from "./dichVuReducer";
import { nguoiDungReducer } from "./nguoiDungReducer";
import taiKhoanReducer from "./taiKhoanReducer";
import thietBiReducer from "./thietBiReducer";
import vaiTroReducer from "./vaiTroReducer";

const reducers = combineReducers({
    taiKhoan: taiKhoanReducer,
    thietBi: thietBiReducer,
    dichVu: dichVuReducer,
    capSo: capSoReducer,
    nguoiDung: nguoiDungReducer,
    vaiTro: vaiTroReducer,
})

export default reducers;

export type State = ReturnType<typeof reducers>;