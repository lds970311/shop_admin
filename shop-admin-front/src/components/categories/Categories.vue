<template>
  <!--商品分类-->
  <div id="category">
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btn">
      <el-button type="success" @click="openAddCategoryDialog" plain
      >添加分类
      </el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      v-loading="table.loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        prop="cat_name"
        label="分类名称"
        align="left"
        width="200"
        tree-key="cat_id"
        parent-key="cat_pid"
        level-key="cat_level"
        :indentSize="20"
      ></el-table-tree-column>
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
    <!--添加分类对话框-->
    <el-dialog title="添加分类" :visible.sync="dialogFaddCategoryFormVisible">
      <el-form :model="addCategoryDialog">
        <el-form-item label="分类名称" label-width="80px">
          <el-input
            v-model="addCategoryDialog.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类层级" label-width="80px">
          <el-select
            v-model="addCategoryDialog.level"
            style="display: block"
            ref="level"
          >
            <el-option label="一级" :value="0"></el-option>
            <el-option label="二级" :value="1"></el-option>
            <el-option label="三级" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="父级名称"
          label-width="80px"
          v-show="addCategoryDialog.level != 0"
        >
          <el-cascader
            v-model="addCategoryDialog.cat_pid_arr"
            :options="options"
            clearable
            style="display: block"
            :props="defalutProps"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFaddCategoryFormVisible = false"
        >取 消
        </el-button
        >
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import Vue from "vue";
import ELTreeGrid from "element-tree-grid";

Vue.component(ELTreeGrid.name, ELTreeGrid);
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
      defalutProps: {
        label: "cat_name",
        value: "cat_id",
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },

        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
    };
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 3 === 0) {
        return "warning-row";
      } else if (rowIndex % 3 === 1) {
        return "success-row";
      }
      return "";
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
    //点击确定按钮提交添加分类数据
    addCategory() {
      if (
        this.addCategoryDialog.cat_name !== "" &&
        this.addCategoryDialog.cat_pid_arr.length !== 0
      ) {
        //添加三级分类
        this.$axios
          .post("categories", {
            cat_pid:
              this.addCategoryDialog.cat_pid_arr[
              this.addCategoryDialog.cat_pid_arr.length - 1
                ],
            cat_name: this.addCategoryDialog.cat_name,
            cat_level: this.addCategoryDialog.cat_pid_arr.length,
          })
          .then((res) => {
            if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
              this.displayInfo(res.data.meta.msg, "success");
              this.dialogFaddCategoryFormVisible = false;
              this.loadCategoryData(this.table.currentPage);
              this.addCategoryDialog.cat_name = "";
              this.addCategoryDialog.cat_pid_arr = [];
              this.addCategoryDialog.level = 0;
            } else {
              this.displayInfo(res.data.meta.msg, "error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (
          this.addCategoryDialog.cat_name !== "" &&
          this.addCategoryDialog.cat_pid_arr.length == 0
        ) {
          this.$axios
            .post("categories", {
              cat_pid: 0,
              cat_name: this.addCategoryDialog.cat_name,
              cat_level: 0,
            })
            .then((res) => {
              if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
                this.displayInfo(res.data.meta.msg, "success");
                this.dialogFaddCategoryFormVisible = false;
                this.loadCategoryData(this.table.currentPage);
                this.addCategoryDialog.cat_name = "";
                this.addCategoryDialog.cat_pid_arr = [];
                this.addCategoryDialog.level = 0;
              } else {
                this.displayInfo(res.data.meta.msg, "error");
              }
            });
        } else {
          this.displayInfo("分类名称和父类名称不能为空!", "error");
          return;
        }
      }
    },
    async loadCategoryData(pagenum = 1) {
      try {
        this.table.loading = true;
        let res = await this.$axios.get("categories", {
          params: {
            type: 3,
            pagesize: this.table.pageSize,
            pagenum: pagenum,
          },
        });
        if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
          this.tableData = res.data.data.result;
          this.table.total = res.data.data.total;
          this.table.currentPage = res.data.data.pagenum + 1;
          this.table.loading = false;
        } else {
          this.displayInfo(res.data.meta.msg, "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    changePage(num) {
      this.loadCategoryData(num);
    },
    //打开添加分类对话框
    openAddCategoryDialog() {
      // this.getCateGoryData1();
      this.dialogFaddCategoryFormVisible = true;
    },
    //获取一二级分类数据
    async getCateGoryData() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 2,
        },
      });
      if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
        this.options = res.data.data;
      } else {
        this.displayInfo(res.data.meta.msg, "error");
      }
    },

    //获取一级分类的数据
    async getCateGoryData1() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 1,
        },
      });
      if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
        this.options = res.data.data;
      } else {
        this.displayInfo(res.data.meta.msg, "error");
      }
    },
  },

  created() {
    this.loadCategoryData();
  },
  mounted() {
    this.getLevelData();
  },
  computed: {
    level() {
      return this.addCategoryDialog.level;
    },
  },
  watch: {
    level: function (val) {
      if (val === 0) {
        this.options.length = 0;
        this.addCategoryDialog.cat_pid_arr.length = 0;
      } else if (val === 1) {
        this.getCateGoryData1();
      } else {
        this.getCateGoryData();
      }
    },
  },
};
</script>

<style scoped lang="less">
#category {
  .btn {
    text-align: left;
  }
}
</style>
