import { axiosInstance } from './config';
// 获取banner
export const getSimulationPredictDataRequest = (param) => {
    console.log(param)
    return axiosInstance.post('/getSimulationPredictData', {
        params: param['parames'],
        modelData: param['ModelData'],
    });
};
