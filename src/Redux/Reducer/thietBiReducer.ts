import { ActionProps } from "../Action/thietBiAction";

const initialState = {
    thietBiData: {},
    thietBiInfo: {}
};

const thietBiReducer = (state:any = initialState, action:ActionProps) => {
    switch(action.type) {
        case 'LOAD_DATA': {
            state.thietBiData = action.payload;
            return {...state};
        };
        break;
        case 'LAY_DU_LIEU': {   
            console.log('heelo',state.thietBiData);
            // const realData = state.taiKhoanData.docs.filter((doc:any)=> (doc._document.data.value.mapValue.fields.ID.stringValue === action.payload));
            const realData = state.thietBiData.docs.filter((doc:any)=> (doc._document.key.path.segments[6] === action.payload));
            state.thietBiInfo = realData;
            // console.log('real',realData);
            // console.log(state.taiKhoanInfo);
            return {...state};
        };
        break;
        default: return state;
    }
}

// const taiKhoanReducer = createReducer(0, {

// })

export default thietBiReducer;