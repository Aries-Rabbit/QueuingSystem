import { createReducer } from "@reduxjs/toolkit";
import { ActionProps } from "../Action/dichVuAction";

const initialState = {
    dichVuData: {},
    dichVuInfo: {}
};

const dichVuReducer = (state:any = initialState, action:ActionProps) => {
    switch(action.type) {
        case 'LOAD_DATA': {
            state.dichVuData = action.payload;
            return {...state};
        };
        break;
        case 'LAY_DU_LIEU': {   
            console.log('heelo',state.dichVuData);
            const realData = state.dichVuData.docs.filter((doc:any)=> (doc._document.key.path.segments[6] === action.payload));
            state.dichVuInfo = realData;
            return {...state};
        };
        break;
        default: return state;
    }
}

// const taiKhoanReducer = createReducer(0, {

// })

export default dichVuReducer;