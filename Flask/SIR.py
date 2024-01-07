import base64
import json

from flask import Flask, request
from flask_cors import CORS
import pandas as pd
import random

app = Flask(__name__)
cors = CORS(app, supports_credentials=True,
            resources={r"/getEvaluationPredictData": {"origins": "*"}, r"/getSimulationPredictData": {"origins": "*"}})


# 随机一个指定长度的列表
def generate_random_list(length):
    random_list = []
    for _ in range(length):
        random_list.append(random.randint(0, 50))
    return random_list


# 定义全局变量days
days = 0


@app.route('/getSimulationPredictData', methods=['GET', 'POST'])
def my():
    global days
    val = request.get_json()
    # 获取预测天数
    days = val['params']['localParames']['days']
    # 状态名列表
    name = list(val['modelData']['Number_initial'].keys())
    result = {}
    for key in name:
        result[key] = generate_random_list(days)
    print(val)
    with open("./result.json", "r", encoding="utf-8") as fp:
        data = json.load(fp)
        params = json.dumps(val['params'])
        # 用于检查是否有重复字典
        flag = True
        if len(data) != 0:
            for item in data:
                if json.dumps(item['ModelData']) == json.dumps(val['modelData']) and json.dumps(
                        item['params']) == json.dumps(val['params']):
                    flag = False
                    break

        if flag:
            data.append({"ModelData": val['modelData'], "params": val['params'], "SimulationData": result})
        json.dump(data, open('./result.json', 'w', encoding='utf-8'), indent=4, ensure_ascii=False)
    return result


@app.route('/getEvaluationPredictData', methods=['GET', 'POST'])
def evaluation_pre():
    global days
    val = request.get_json()
    # upload是否为true 来判断是否有文件上传 如果没有文件上传就用选择的字段 易感者或感染者来使用本地数据
    if val["evaluation_setting"]["TruthData"]["upload"]:
        prefix = val["evaluation_setting"]["TruthData"]["file"]
        data = prefix.split(',')[1]
        with open("temp.csv", mode="wb") as f:
            # 对base64编码进行解码
            f.write(base64.b64decode(data))
        data1 = pd.read_csv("temp.csv")
        # 打印上传的csv文件
        print(data1)
        print(val)
    else:
        print(val)
        print(val["evaluation_setting"]["Metrics"])
    # 返回两个值 一个真实值数组，一个预测值数组
    # 可以添加字段 比如参数面板的数据 或者 MAPE字段等
    result = {
        'data_T': generate_random_list(days),
        'data_P': generate_random_list(days),
        'MAPE': {
            'flag': val["evaluation_setting"]["Metrics"]["MAPE"],
            'value': random.randint(0, 50)
        },
        'RMSE': {
            'flag': val["evaluation_setting"]["Metrics"]["RMSE"],
            'value': random.randint(0, 50)
        },
    }
    print(result)
    return result


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)  # 开发者模式
