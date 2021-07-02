<template>
  <div id="params">
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="table.loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="50px"
        align="center"
      ></el-table-column>
      <el-table-column prop="cat_name" label="分类参数" align="center">
      </el-table-column>
      <el-table-column prop="name" label="是否有效" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cat_deleted ? "否" : "是" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="层级" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-else-if="scope.row.cat_level == 1">二级</span>
          <span v-else-if="scope.row.cat_level == 2">三级</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="table.currentPage"
      :page-size="table.pageSize"
      :total="table.total"
      background
      layout="prev, pager, next"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          cat_name: "2016-05-02",
          name: "王小虎",
          cat_level: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      table: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        loading: false,
      },
      dialogFaddCategoryFormVisible: false,
      addCategoryDialog: {
        cat_name: "",
        level: 0,
        cat_pid_arr: [],
      },
    };
  },
  methods: {
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
    getParamsData(pagenum = 1) {
      this.table.loading = true;
      this.$axios
        .get("categories", {
          params: {
            type: 1,
            pagenum: pagenum,
            pagesize: this.table.pageSize,
          },
        })
        .then((res) => {
          this.tableData = res.data.data.result;
          this.table.total = res.data.data.total;
          this.table.currentPage = res.data.data.pagenum + 1;
          this.table.loading = false;
        })
        .catch((err) => console.log(err));
    },
    changePage(num) {
      this.getParamsData(num);
    },
    indexMethod(index) {
      return (this.table.currentPage - 1) * this.table.pageSize + index + 1;
    },
  },
  created() {
    this.getParamsData();
  },
};
</script>

<style lang="less" scoped>
</style>
