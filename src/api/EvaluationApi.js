import { axiosInstance } from './config';
// 获取banner
export const getEvaluationPredictDataRequest = (param) => {
    var dateString = param["evaluation_setting"].StartDay;
    var date = new Date(dateString);
    // 提取年份
    var year = date.getFullYear();
    // 提取月份并添加前导零（如果月份小于10）
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    // 提取日期并添加前导零（如果日期小于10）
    var day = ('0' + date.getDate()).slice(-2);
    param["evaluation_setting"].StartDay = year + "-" + month + "-" + day;
    return axiosInstance.post('/getEvaluationPredictData', {
        evaluation_setting : param['evaluation_setting']
    });
};
