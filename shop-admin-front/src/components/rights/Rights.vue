<template>
  <div id="rights">
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        :index="indexMethod"
        align="center"
        label="序号"
        type="index"
        width="60px"
      >
      </el-table-column>
      <el-table-column align="center" label="权限名称" prop="authName">
      </el-table-column>
      <el-table-column align="center" label="路径" prop="path">
      </el-table-column>
      <el-table-column align="center" label="等级" prop="level">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [
        {
          authName: "2016-05-02",
          path: "王小虎",
          level: "上海市普陀区金沙江路 1518 弄",
        },
        {
          authName: "2016-05-04",
          path: "王小虎",
          level: "上海市普陀区金沙江路 1517 弄",
        },
        {
          authName: "2016-05-01",
          path: "王小虎",
          level: "上海市普陀区金沙江路 1519 弄",
        },
        {
          authName: "2016-05-03",
          path: "王小虎",
          level: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    //加载权限列表数据
    loadRightsData() {
      this.$axios
        .get("/rights/list")
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            switch (res.data.data[i].level) {
              case "0":
                res.data.data[i].level = "一级";
                break;
              case "1":
                res.data.data[i].level = "二级";
                break;
              case "2":
                res.data.data[i].level = "三级";
                break;
              default:
                res.data.data[i].length = "四级";
            }
          }
          this.tableData = res.data.data;
          if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
            this.displayInfo(res.data.meta.msg, "success");
          } else this.displayInfo(res.data.meta.msg, "error");
        })
        .catch((err) => {
          console.log(err);
          this.displayInfo(err, "error");
        });
    },
    //获取表头索引
    indexMethod(index) {
      return index + 1;
    },
    displayInfo(msg, type) {
      if (type === "error") {
        this.$message.error(msg);
      } else {
        this.$message({
          message: msg,
          type: type,
          duration: 800,
        });
      }
    },
  },
  created() {
    this.loadRightsData();
  },
};
</script>

<style lang="less" scoped>
#rights {
}
</style>

