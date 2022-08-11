import { ActionProps } from "../Action/nguoiDungAction";

const initialState = {
    nhatKyData: [],
    nhatKyInfo: {}
}

export const nguoiDungReducer = (state:any = initialState, action: ActionProps) => {
    switch(action.type) {
        case 'LOAD_DATA': {
            state.nhatKyData = action.payload;
            return {...state};
        }
        break;
        
        case 'LAY_DU_LIEU': {
            return {...state};
        }
        break;

        default: return state;
    }
}