import { axiosInstance } from './config';
// 获取banner
export const getPredictDataRequest = (param) => {
    // console.log("测试",param['modelData'])
    return axiosInstance.post('/getPredictData', {
        params: param['parames'],
        modelData: param['modelData']
    });
};
