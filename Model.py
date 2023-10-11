from scipy.integrate import odeint  # 导入 scipy.integrate 模块
import numpy as np  # 导入 numpy包
def get_predata(transition,T,dic_parameter,Number_initial,NS):

    NumberN = list(Number_initial.keys())
    NumberV = list(Number_initial.values())
    t = np.arange(0.0,T,1)

    #构造公式
    formulas = []
    for i in range(0,NS):
        formulas.append('')
        for j in range(0, NS):
            #对角线
            if i == j and transition[i][j] != 0:
                formulas[i] += '+' + '('+ transition[i][j] + ')'
            #非对角线
            else:
                if transition[i][j] != 0:
                   formulas[i] += '-' + '('+transition[i][j] + ')'
                if transition[j][i] != 0:
                   formulas[i] += '+' + '('+transition[j][i] + ')'
    print ("公式%s"%(formulas))

    #数值解容器
    formulass = []
    for i in range(0, NS):
        formulass.append('')

    #微分方程函数
    def model_all(NumberV,t,dic_parameter,NumberN,formulas,NS,formulass):
        #动态构造参数变量
        for k,v in dic_parameter.items():
            globals()[k] = v
        for i in range(len(NumberV)):
            globals()[NumberN[i]] = NumberV[i]

        #计算
        for i in range(0,NS):
            formulass[i] = eval(formulas[i])

        #SEIR模型
        # ds = - (S * beta * I / num_all)
        # de = S * beta * I / num_all - alpha * E
        # di = alpha * E - gamma * I
        # dr = gamma * I

        #SIR模型
        # ds = - (S * beta * I)
        # di = (beta * S * I) - gamma * I
        # dr = gamma * I

        # 改进SEIR模型
        # ds = -beta*S*I/num_all - e_s*S*E/num_all
        # de = beta*S*I/num_all + e_s*S*E/num_all - alpha*E
        # di = alpha * E - gamma * I
        # dr = (1-f_rate)*gamma*I-r_r*R
        # df = f_rate*gamma*I-r_f*F
        # dr_r = r_r*R
        # dr_f = r_f*F
        return formulass
        # return np.array([ds,de,di,dr,df,dr_r,dr_f])
    #odient  scipy库中一个数值求解微分方程的函数。需要至少三个变量，第一个是微分方程函数，第二个是微分方程初值，第三个是微分的自变量。
    predata = odeint(model_all,NumberV,t,args=(dic_parameter,NumberN,formulas,NS,formulass))
    # print (predata)
    return predata