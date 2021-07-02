<template>
  <!--商品列表-->
  <div id="goods">
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btn">
      <el-row>
        <el-col :span="9">
          <el-input
            v-model="goodsSearch"
            class="input-with-select"
            placeholder="请输入搜索商品"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryGoods"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="success" plain @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        :index="indexMethod"
        align="center"
        label="序号"
        type="index"
        width="60px"
      >
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格" align="center">
      </el-table-column>
      <el-table-column prop="goods_number" label="商品数量" align="center">
      </el-table-column>
      <el-table-column prop="add_time" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | myDateFilter("YYYY-MM-DD") }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            circle
            icon="el-icon-edit"
            plain
            size="mini"
            type="primary"
            @click="openEditDialog(scope.row)"
          ></el-button>
          <el-button
            circle
            icon="el-icon-delete"
            plain
            size="mini"
            type="danger"
            @click="delGoods(scope.row)"
          ></el-button>
          <!-- <el-button
            plain
            size="mini"
            type="success"
            @click="openRights(scope.row)"
            >分配权限
          </el-button> -->
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
import moment from "moment";

export default {
  data() {
    return {
      //商品搜索表单
      goodsSearch: "",
      tableData: [
        {
          goods_name: "asfdsd",
          goods_price: 1,
          goods_number: 1,
          add_time: 1512954923,
        },
      ],
      table: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
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
    openEditDialog(row) {
    },
    delGoods(row) {
    },
    async loadGoodsData(num = 1, info = "") {
      try {
        let res = await this.$axios.get("goods", {
          params: {
            query: info,
            pagenum: num,
            pagesize: this.table.pageSize,
          },
        });
        if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
          //请求成功
          this.tableData = res.data.data.goods;
          this.table.total = res.data.data.total;
          this.table.currentPage = Number(res.data.data.pagenum);
        } else {
          this.displayInfo(res.data.meta.msg, "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    changePage(e) {
      this.loadGoodsData(e, this.goodsSearch);
    },
    indexMethod(index) {
      return (this.table.currentPage - 1) * this.table.pageSize + index + 1;
    },
    addGoods() {
      this.$router.push({
        path: "goods-add",
      });
    },
    queryGoods() {
      this.loadGoodsData(1, this.goodsSearch);
    },
  },
  filters: {
    myDateFilter(res, formatter) {
      return moment(res).format(formatter);
    },
  },
  created() {
    this.loadGoodsData();
  },
};
</script>

<style lang="less" scoped>
#goods {
  .btn {
    text-align: left;
  }
}
</style>
