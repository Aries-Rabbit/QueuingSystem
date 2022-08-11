import { createReducer } from "@reduxjs/toolkit";
import { ActionProps } from "../Action/vaiTroAction";

const initialState = {
    vaiTroData: {},
    vaiTroInfo: {}
};

const vaiTroReducer = (state:any = initialState, action:ActionProps) => {
    switch(action.type) {
        case 'LOAD_DATA': {
            state.vaiTroData = action.payload;
            return {...state};
        };
        break;
        case 'LAY_DU_LIEU': {   
            console.log('heelo',state.vaiTroData);
            const realData = state.vaiTroData.docs.filter((doc:any)=> (doc._document.key.path.segments[6] === action.payload));
            state.vaiTroInfo = realData;
            return {...state};
        };
        break;
        default: return state;
    }
}

// const taiKhoanReducer = createReducer(0, {

// })

export default vaiTroReducer;