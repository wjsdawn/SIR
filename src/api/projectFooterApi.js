import { axiosInstance } from './config';
// 获取banner
export const getPredictDataRequest = (param) => {
    console.log(param)
    return true
    // return axiosInstance.post('/getPredictData', {
    //     params: param['parames'],
    //     modelData: param['ModelData'],
    //     evaluation_setting : param['evaluation_setting']
    // });
};
