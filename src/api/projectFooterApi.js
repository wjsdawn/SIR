import { axiosInstance } from './config';
// 获取banner
export const getPredictDataRequest = (param) => {
    return axiosInstance.post('/getPredictData', {
        params: param['parames'],
        modelData: param['ModelData'],
        evaluation_p : param['evaluation_p']
    });
};
