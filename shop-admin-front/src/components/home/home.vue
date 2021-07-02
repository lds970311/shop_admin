<template>
  <el-container>
    <el-header>
      <el-row>
        <div class="grid-content left-content">
          <h3>电商管理后台</h3>
        </div>
        <div class="grid-content right-content">
          <span>欢迎{{ userName }} | </span>
          <span class="exit" @click="logout">退出</span>
        </div>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          active-text-color="#ffd04b"
          background-color="#7662ff"
          :default-active="handlePath()"
          text-color="#fff"
          @close="handleClose"
          @open="handleOpen"
        >
          <el-submenu
            v-for="item in menuData"
            :key="item.id"
            :index="item.id.toString()"
          >
            <template slot="title">
              <i class="el-icon-user" v-if="item.authName == '用户管理'"></i>
              <i
                class="el-icon-chat-line-round"
                v-else-if="item.authName == '权限管理'"
              ></i>
              <i class="el-icon-goods" v-if="item.authName == '商品管理'"></i>
              <i
                class="el-icon-shopping-cart-full"
                v-if="item.authName == '订单管理'"
              ></i>
              <i
                class="el-icon-discount"
                v-if="item.authName == '数据统计'"
              ></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group v-for="item2 in item.children" :key="item2.id">
              <el-menu-item :index="item2.path"
              >{{ item2.authName }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      //左侧菜单数据
      menuData: [],
    };
  },
  methods: {
    getUser() {
      this.userName = localStorage.getItem("user");
    },
    logout() {
      this.$confirm("是否确定退出该账户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //清空token和user信息
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          this.$router.replace({
            path: "/login",
          });
          this.$message({
            type: "success",
            message: "退出成功!",
            duration: 800,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            duration: 800,
          });
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //获取左侧菜单数据
    async getMenuData() {
      try {
        let res = await this.$axios.get("/menus");
        this.menuData = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    //获取路径
    handlePath() {
      let path = this.$route.path.substr(this.$route.path.indexOf("/") + 1);
      return path;
    },
  },
  created() {
    this.getMenuData();
  },
  mounted() {
    this.getUser();
  },
};
</script>


<style lang='less' scoped>
.el-container {
  height: 100%;

  .el-header {
    padding: 0;

    .el-row {
      height: 100%;

      .left-content {
        background-color: rgb(41, 58, 166);
        height: 100%;
        width: 200px;
        text-align: center;
        line-height: 60px;
        color: aliceblue;
        float: left;
      }

      .right-content {
        height: 60px;
        background-color: rgb(62, 82, 193);
        line-height: 60px;
        text-align: right;
        padding: 0 50px;

        span {
          color: aliceblue;
          font-size: 14px;
        }

        .exit:hover {
          color: green;
        }

        .exit {
          cursor: pointer;
        }
      }
    }

    .el-column {
      height: 60px;
    }
  }

  .el-aside {
    background-color: rgb(245, 245, 245);
    height: 100%;

    .el-menu {
      height: 100%;
      text-align: left;
      border: none;
    }
  }

  .el-main {
    background-color: rgb(255, 255, 255);
    height: 100%;
    overflow: auto;
  }
}
</style>
