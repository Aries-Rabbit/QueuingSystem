import { createReducer } from "@reduxjs/toolkit";
import { ActionProps } from "../Action/capSoAction";

const initialState = {
    capSoData: {},
    capSoInfo: {}
};

const capSoReducer = (state:any = initialState, action:ActionProps) => {
    switch(action.type) {
        case 'LOAD_DATA': {
            state.capSoData = action.payload;
            return {...state};
        };
        break;
        case 'LAY_DU_LIEU': {   
            console.log('heelo',state.capSoData);
            const realData = state.capSoData.docs.filter((doc:any)=> (doc._document.key.path.segments[6] === action.payload));
            state.capSoInfo = realData;
            return {...state};
        };
        break;
        default: return state;
    }
}

// const taiKhoanReducer = createReducer(0, {

// })

export default capSoReducer;