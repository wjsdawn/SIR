from flask import Flask,request
from flask_cors import CORS
import Model
import numpy as np
import json
app = Flask(__name__)
cors = CORS(app, supports_credentials=True,resources={r"/getPredictData": {"origins": "*"}})
dic_predict = {}

@app.route('/getPredictData',methods=['GET','POST'])
def model_pre():
      val = request.get_json()
      print("参数是%s" % (val))

      parames = val['params']
      modelData = val['modelData']

      T = parames['localParames']["days"]
      NS = modelData['N']
      sday = parames['interventionParames']["sday"]

      #获取评估算式
      evalua_p = val['evaluation_p']


      #获取模型参数
      Number_initial = modelData['Number_initial']
      transition = modelData['transition']

      # #获取固有参数
      dic_parameter = {}
      dic_parameter['N'] = parames['localParames']["population"]
      dic_parameter['Beta'] = parames['epidemicParames']["Beta"]
      dic_parameter['Gamma'] = parames['epidemicParames']["Gamma"]
      dic_parameter['Alpha'] = parames['epidemicParames']["Alpha"]
      dic_parameter['maxbed'] = parames['healthParames']["maxbed"]
      dic_parameter['vacRate'] = parames['vaccaineParames']["vacRate"]
      dic_parameter['effecRare'] = parames['vaccaineParames']["effecRare"]

      # #获取用户新增参数
      for i in range(len(parames['localParames']["names1"])):
          dic_parameter[parames['localParames']["names1"][i]] = parames['localParames']["values1"][i]
      for i in range(len(parames['epidemicParames']["names2"])):
          dic_parameter[parames['epidemicParames']["names2"][i]] = parames['epidemicParames']["values2"][i]
      for i in range(len(parames['interventionParames']["names3"])):
          #这里前期只写startDay之前的值，如果要分段，那就后半段再想办法附新值 ！！！
          dic_parameter[parames['interventionParames']["names3"][i]] = parames['interventionParames']["values3_bf"][i]
      for i in range(len(parames['healthParames']["names4"])):
          dic_parameter[parames['healthParames']["names4"][i]] = parames['healthParames']["values4"][i]
      for i in range(len(parames['vaccaineParames']["names5"])):
          dic_parameter[parames['vaccaineParames']["names5"][i]] = parames['vaccaineParames']["values5"][i]
      print("dic_parameter%s" % (dic_parameter))


      #SEIR
      # dic_parameter = {'beta':3.9,'alpha':0.143,'gamma':0.125,'num_all':9000000}
      # T = 32
      # N = 4
      # Number_initial = {'S':8999999,'E':8,'I':1,'R':0}
      # transition = [[0,'beta*S*I/num_all',0,0],[0,0,'alpha*E',0],[0,0,0,'gamma*I'], [0, 0, 0, 0]]

      #SIR
      # T = 32
      # N = 3
      # dic_parameter = {'beta': 1,'gamma': 3,'num_all':9000000}
      # Number_initial = {'S': 10, 'I': 2, 'R': 0}
      # transition = [[0,'beta*S*i',0],[0,0,'gamma*I'],[0,0,0]]

      #改进型SIER
      # dic_parameter = {'beta': 3.9, 'e_s':0.7, 'alpha': 0.143, 'gamma': 0.125,'f_rate':0.03,'r_r':0.007,'r_f':0.105,'num_all': 9000000}
      # T = 32
      # N = 7
      # Number_initial = {'S': 8999999, 'E': 8, 'I': 1, 'R': 0,'F':0,'R_r':0,'R_f':0}
      # transition = [[0, 'beta*S*I/num_all+e_s*S*E/num_all', 0, 0,0,0,0], [0, 0, 'alpha*E', 0,0,0,0],
      #               [0, 0, 0, '(1-f_rate)*gamma*I','f_rate*gamma*I',0,0], [0, 0, 0, 0,0,'r_r*R',0],
      #               [0, 0, 0, 0,0,0,'r_f*F'],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]

      if sday == 0:
          pre = Model.get_predata(transition, T, dic_parameter, Number_initial, NS)
      else:
          #计算分段前后时长
          days_bf = sday-1
          days_af = T-sday+2

          #计算分段前预测值
          pre1 = Model.get_predata(transition, days_bf, dic_parameter, Number_initial, NS)

          #分段后参数赋新值
          for i in range(len(parames['interventionParames']["names3"])):
              dic_parameter[parames['interventionParames']["names3"][i]] = parames['interventionParames']["values3_af"][i]

          #取分段前最后一天的预测值作为分段后初值
          initial2 = pre1.take(days_bf-1,0)

          i = 0
          for k, v in Number_initial.items():
              Number_initial[k] = initial2[i]
              i+=1

          #计算分段后预测值
          pre2 = Model.get_predata(transition, days_af, dic_parameter, Number_initial, NS)

          #分段前后数据拼接起来成为完成周期的数据
          y = np.delete(pre2, 0, 0)
          pre = np.concatenate((pre1, y), axis=0)

      #评估处的数据处理
      index = 0
      for k,v in Number_initial.items():
          globals()[k] = pre.take(index,1)
          index+=1
      evaluation_p = eval(evalua_p)
      print("计算结果%s"%(evaluation_p))

      real = [1, 9, 14, 15, 13, 18, 26, 35, 46, 60,
              83, 107, 167, 192, 222, 260, 277, 299, 312, 331,
              326, 323, 320, 321, 311, 307, 303, 300, 285, 265,
              254, 235]
      #计算评估误差
      MAPE = round(np.mean(np.abs((evaluation_p - real) / real)) * 100,2)


      evaluation_p = evaluation_p.tolist()
      pre = pre.tolist()

      return {'preData':pre,'MAPE':MAPE,'evaluation_p':evaluation_p}

if __name__ == '__main__':
        app.run(host='127.0.0.1', port=5000, debug=True)  # 开发者模式