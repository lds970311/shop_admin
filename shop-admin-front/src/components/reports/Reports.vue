<template>
  <div id="report">
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="goodsCount"></div>
    <div id="goodsCount2"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      options: {
        title: {
          text: "商品销量统计",
        },
        tooltip: {},
        xAxis: {
          data: ["家电", "厨房电器", "电脑办公", "男装", "鞋子", "汽车"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [919, 2120, 1136, 4310, 1110, 920],
          },
        ],
      },
    };
  },
  methods: {
    initChart1() {
      let myChart = echarts.init(document.getElementById("goodsCount"));
      myChart.setOption(this.options);
    },
    getUserTypeData() {
      const options2 = {
        title: {
          text: "用户类型统计",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },

        legend: {
          orient: "vertical",
          top: "5%",
          left: "right",
        },
        series: [
          {
            name: "用户分布统计",
            type: "pie",
            //string 是圆饼的半径,数组的第一项是内半径，第二项是外半径
            radius: "50%",
            //防止标签重叠
            avoidLabelOverlap: false,
            //四周标签文字
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            //注意：饼图和地图 数据格式：[{name:'',value:''},{},{}]
            data: [],
          },
        ],
      };

      this.$axios
        .get("users", {
          params: {
            pagenum: 1,
            pagesize: 1000,
          },
        })
        .then((res) => {
          let userData = res.data.data.users;

          let userObj = {};
          userData.forEach((item) => {
            if (userObj[item.role_name]) {
              userObj[item.role_name]++;
            } else {
              userObj[item.role_name] = 1;
            }
          });

          for (const item in userObj) {
            options2.series[0].data.push({
              value: Number(userObj[item]),
              name: item,
            });
          }
          let myChart = echarts.init(document.getElementById("goodsCount2"));
          myChart.setOption(options2);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initChart2() {
      this.getUserTypeData();
    },
  },
  created() {
  },
  mounted() {
    this.initChart1();
    this.initChart2();
  },
};
</script>

<style lang="less" scoped>
#report {
  width: 100%;
  height: 80%;

  #goodsCount2 {
    width: 500px;
    height: 300px;
    position: relative;
    left: 70%;
    transform: translate(-50%, -50%);
    overflow: visible;
  }

  #goodsCount {
    width: 500px;
    height: 320px;
    position: relative;
    left: 20%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  canvas {
  }
}
</style>
