<template>
  <div>
    <el-row>
      <el-card>

        <el-col :span="12">
          测试
          <div id="main" style=" width: 500px;height: 400px"></div>
        </el-col>
        <el-col :span="12">
          测试
          <div id="pie" style=" width: 500px;height: 400px"></div>
        </el-col>
      </el-card>
    </el-row>


  </div>
</template>


<script>

import * as echarts from 'echarts'

export default {
  name: "Home",
  data() {
    return {}
  },
  mounted() { //页面元素渲染之后触发
    //折线图
    option = {
      title: {
        text: '各季度干员新增统计',
        subtext: '新增图',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ["第一季度", "第二季度", "第三季度", "第四季度"]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        },
        {
          data: [],
          type: 'bar'
        }
      ]
    };
    var option;
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    this.request.get("echarts/members").then(res=>{
      //填入内容
      //option.xAxis.data=res.data.x;
      option.series[0].data=res.data;
      option.series[1].data=res.data;
      //数据准备完，在set
      myChart.setOption(option);

    })


    // 饼图

    var pieOption = {
      title: {
        text: '各季度干员数量统计',
        subtext: '比例图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          label:{            //饼图图形上的文本标签
            normal:{
              show:true,
              position:'inner', //标签的位置
              textStyle : {
                fontWeight : 300 ,
                fontSize : 14,    //文字的字体大小
                color: "#fff"
              },
              formatter:'{d}%'
            }
          },
          data: [],  // 填空
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    var pieDom = document.getElementById('pie');
    var pieChart = echarts.init(pieDom);
    this.request.get("/echarts/members").then(res => {
      pieOption.series[0].data = [
        {name: "第一季度", value: res.data[0]},
        {name: "第二季度", value: res.data[1]},
        {name: "第三季度", value: res.data[2]},
        {name: "第四季度", value: res.data[3]},
      ]
      pieChart.setOption(pieOption)
    })

  }
}


</script>

<style scoped>

</style>
