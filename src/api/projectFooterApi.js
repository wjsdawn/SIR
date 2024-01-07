import { axiosInstance } from './config';
// 获取banner
export const getSimulationPredictDataRequest = (param) => {
    return axiosInstance.post('/getSimulationPredictData', {
        modelData: param['ModelData'],
        params: param['parames']
    });
};
