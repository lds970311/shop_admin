<template>
  <div>
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="9">
        <!-- 输入框 -->
        <el-input
          v-model="input"
          class="input-with-select"
          placeholder="请输入搜索内容"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="queryUser"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="9" style="text-align: left">
        <el-button type="primary" @click="dialogAddUserVisible = true"
        >添加用户
        </el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      :highlight-current-row="true"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      v-loading="tableLoading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column
        label="姓名"
        prop="username"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        label="邮箱"
        prop="email"
      ></el-table-column>
      <el-table-column
        align="center"
        label="电话"
        prop="mobile"
      ></el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
        align="center"
      ></el-table-column>
      <el-table-column align="center" label="状态" prop="mg_state">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeUserState(scope.row.id, scope.row.mg_state)"
          ></el-switch>
        </template>
        >
      </el-table-column>
      <el-table-column align="center" label="操作" prop="handle">
        <template slot-scope="scope">
          <el-button
            circle
            icon="el-icon-edit"
            plain
            size="mini"
            type="primary"
            @click="editUser(scope.row)"
          ></el-button>
          <el-button
            circle
            icon="el-icon-delete"
            plain
            size="mini"
            type="danger"
            @click="delUser(scope.row)"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="success"
            @click="startAllocate(scope.row)"
          >分配角色
          </el-button>
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
    <!-- 添加用户对话框 -->
    <el-dialog :visible.sync="dialogAddUserVisible" title="添加用户">
      <el-form
        ref="addUserForm"
        :model="addUserform"
        :rules="addUserRules"
        label-width="80px"
      >
        <el-form-item
          :label-width="formLabelWidth"
          label="用户名"
          prop="userName"
        >
          <el-input v-model="addUserform.userName"></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="密码"
          prop="password"
        >
          <el-input v-model="addUserform.password" type="password"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮箱" prop="email">
          <el-input v-model="addUserform.email"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="手机" prop="mobile">
          <el-input v-model="addUserform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleAddUser">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog :visible.sync="dialogEditUserVisible" title="编辑用户">
      <el-form ref="editUserForm" :model="editUserForm" :rules="editUserRules">
        <el-form-item label="用户名" label-width="80px">
          <el-tag>{{ editUserForm.userName }}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditMsg">确 定</el-button>
      </div>
    </el-dialog>

    <!--分配角色对话框-->
    <el-dialog title="分配角色" :visible.sync="dialogallocateRoleVisible">
      <el-form :model="allocateRoleform">
        <el-form-item label="用户名" label-width="80px">
          <el-tag>{{ allocateRoleform.username }}</el-tag>
        </el-form-item>
        <el-form-item label="角色列表" label-width="80px">
          <el-select v-model="allocateRoleform.rid" placeholder="请选择角色">
            <el-option
              v-for="item in allocateRoleform.roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogallocateRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocateRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [
        {
          username: "王小虎",
          email: "123@qq.com",
          mobile: "123123123",
          state: "open",
          handle: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      //表格页数
      table: {
        pageSize: 5,
        total: 0,
        currentPage: 1,
      },
      tableLoading: false,
      input: "",
      //添加用户对话框数据
      dialogAddUserVisible: false,
      addUserform: {
        userName: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加用户对话框数据
      dialogEditUserVisible: false,
      editUserForm: {
        userId: "",
        userName: "",
        email: "",
        mobile: "",
      },

      formLabelWidth: "120px",
      //添加用户的校验规则
      addUserRules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {min: 2, max: 10, message: "长度在3-10个字符"},
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "长度为6-20位",
          },
        ],
        email: [
          {
            pattern:
              /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            required: true,
            message: "请输入正确的邮箱格式",
            tirgger: "blur",
          },
        ],
        mobile: [
          {
            type: "string",
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            required: true,
            trigger: "blur",
            message: "请输入正确格式的手机号",
          },
        ],
      },
      //编辑用户的规则
      editUserRules: {
        email: [
          {
            pattern:
              /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            required: true,
            message: "请输入正确的邮箱格式",
            tirgger: "blur",
          },
        ],
        mobile: [
          {
            type: "string",
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            required: true,
            trigger: "blur",
            message: "请输入正确格式的手机号",
          },
        ],
      },
      //开关状态
      userState: true,
      //分配角色对话框
      dialogallocateRoleVisible: false,
      allocateRoleform: {
        username: "",
        roles: [],
        userId: "",
        rid: "",
      },
    };
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    //请求表格数据
    async getUserData(num = 1, searchText = "") {
      this.tableLoading = true;
      let url = "/users";
      const config = {
        params: {
          query: searchText,
          pagenum: num,
          pagesize: this.table.pageSize,
        },
      };
      try {
        let res = await this.$axios.get(url, config);
        this.tableData = res.data.data.users;
        this.table.total = res.data.data.total;
        this.table.currentPage = res.data.data.pagenum;
        this.tableLoading = false;
      } catch (err) {
        console.log(err);
        this.tableLoading = false;
      }
    },
    changePage(e) {
      this.getUserData(e, this.input);
    },
    //提交新增用户数据
    addUser() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/users", {
              username: this.addUserform.userName,
              password: this.addUserform.password,
              email: this.addUserform.email,
              mobile: this.addUserform.mobile,
            })
            .then((res) => {
              console.log(res);
              if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
                this.displayInfo(res.data.meta.msg, "success");
                this.dialogAddUserVisible = false;
                this.$refs["addUserForm"].resetFields();
                //重新加载表格数据
                this.getUserData(this.table.currentPage);
              } else {
                this.displayInfo(res.data.meta.msg, "error");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("error submit");
        }
      });
    },
    cancleAddUser() {
      this.$refs["addUserForm"].resetFields();
      this.dialogAddUserVisible = false;
    },
    //点击搜索按钮查询用户信息
    queryUser() {
      this.getUserData(1, this.input);
    },
    //点击删除按钮删除用户
    async delUser(row) {
      const {id} = row;
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await this.$axios.delete(`/users/${id}`);
        if (res.data.meta.status >= 200 && res.data.meta.status <= 300) {
          //删除成功
          this.displayInfo(res.data.meta.msg, "success");
          await this.getUserData(this.table.currentPage);
        } else {
          this.displayInfo(res.data.meta.msg, "error");
        }
      } catch (error) {
        this.displayInfo("已取消删除", "warning");
      }
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
    //更改用户状态
    async changeUserState(id, newState) {
      try {
        let result = await this.$axios.put(
          `/users/${id}/state/${newState}`,
          null
        );
        if (result.data.meta.status >= 200 && result.data.meta.status < 300) {
          this.displayInfo(result.data.meta.msg, "success");
        } else {
          this.displayInfo(result.data.meta.msg, "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    //编辑用户
    editUser(user) {
      this.editUserForm.userName = user.username;
      this.editUserForm.email = user.email;
      this.editUserForm.mobile = user.mobile;
      this.editUserForm.userId = user.id;
      this.dialogEditUserVisible = true;
    },

    //提交编辑用户的信息
    submitEditMsg() {
      this.$refs.editUserForm.validate(async (valid) => {
        if (valid) {
          try {
            let res = await this.$axios.put(
              `/users/${this.editUserForm.userId}`,
              {
                email: this.editUserForm.email,
                mobile: this.editUserForm.mobile,
              }
            );
            if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
              this.displayInfo(res.data.meta.msg, "success");
              this.$refs["editUserForm"].resetFields();
              this.editUserForm.userId = "";
              this.dialogEditUserVisible = false;
              this.getUserData(this.table.currentPage);
            } else {
              this.displayInfo(res.data.meta.msg, "error");
            }
          } catch (err) {
            this.displayInfo(err, "error");
          }
        }
      });
    },
    //分配角色
    startAllocate(row) {
      this.allocateRoleform.userId = row.id;
      this.allocateRoleform.username = row.username;
      this.getUserRoles(row);
      // console.log(roleName);
      //根据id查询用户信息
      this.$axios
        .get(`/roles`)
        .then((res) => {
          if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
            this.allocateRoleform.roles = res.data.data;
          } else {
            this.displayInfo(res.data.meta.msg, "error");
          }
        })
        .catch((err) => {
          this.displayInfo(err, "error");
        });
      this.dialogallocateRoleVisible = true;
    },
    //获取用户对应角色
    async getUserRoles(row) {
      const {id} = row;
      //根据用户id获取角色id
      try {
        let res1 = await this.$axios.get(`/users/${id}`);
        const {rid} = res1.data.data;
        this.allocateRoleform.rid = rid == -1 ? "" : rid;
      } catch (err) {
        console.log(err);
      }
    },
    allocateRoles() {
      this.$axios
        .put(`/users/${this.allocateRoleform.userId}/role`, {
          rid: this.allocateRoleform.rid,
        })
        .then((res) => {
          console.log(res);
          if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
            this.displayInfo(res.data.meta.msg, "success");
            this.dialogallocateRoleVisible = false;
            this.getUserData(this.table.currentPage);
          } else {
            this.displayInfo(res.data.meta.msg, "error");
          }
        })
        .catch((err) => {
          this.displayInfo(err, "error");
          console.log(err);
        });
    },
  },
  created() {
    this.getUserData(1);
  },
};
</script>

<style lang="less">
div {
  .el-table {
    .warning-row {
      background-color: oldlace !important;
    }

    .success-row {
      background: #f0f9eb !important;
    }
  }

  .el-pagination {
    margin-top: 20px;
  }

  .el-form-item__content {
    text-align: left;
  }
}
</style>
