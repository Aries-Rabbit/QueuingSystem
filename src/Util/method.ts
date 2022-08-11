export const numberMaxCapSo = (array:any) => {
    let max = array[0].stt;
    for(let i = 1; i < array.length; i++) {
        if(array[i].stt > max) {
            max = array[i].stt;
        }
    }
    console.log(max);
    return max;
}
 
