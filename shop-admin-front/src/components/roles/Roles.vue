<template>
  <div id="roles">
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btn">
      <el-button type="primary" plain @click="dialogAddRoleFormVisable = true"
      >添加角色
      </el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand" label="详情" width="60px">
        <template slot-scope="props">
          <el-row v-for="item1 in props.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag type="primary" size="mini" plain
              >{{ item1.authName }}<i class="el-icon-arrow-right"></i
              ></el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 第二层 -->
              <el-row v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag type="success" plain size="mini"
                  >{{ item2.authName }}<i class="el-icon-arrow-right"></i
                  ></el-tag>
                </el-col>
                <el-col :span="20">
                  <!--第三层-->
                  <span v-for="item3 in item2.children" :key="item3.id">
                    <el-tag type="warning" plain size="mini">{{
                        item3.authName
                      }}</el-tag>
                  </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        :index="indexMethod"
        align="center"
        label="序号"
        type="index"
        width="60px"
      >
      </el-table-column>
      <el-table-column align="center" label="角色名称" prop="roleName">
      </el-table-column>
      <el-table-column align="center" label="描述" prop="roleDesc">
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
            @click="delRole(scope.row)"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="success"
            @click="openRights(scope.row)"
          >分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分配权限对话框-->
    <el-dialog title="角色授权" :visible.sync="dialogFormVisible">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-expand-all="true"
        ref="tree"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRoles">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加角色对话框-->
    <el-dialog title="添加角色" :visible.sync="dialogAddRoleFormVisable">
      <el-form :model="addRoleForm">
        <el-form-item label="角色名称" label-width="80px">
          <el-input
            v-model="addRoleForm.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述信息" label-width="80px">
          <el-input
            v-model="addRoleForm.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRoleFormVisable = false">取 消</el-button>
        <el-button type="primary" @click="submitRoleMsg">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑角色信息对话框-->
    <el-dialog title="编辑角色" :visible.sync="dialogeditRoleFormVisible">
      <el-form :model="editRoleForm">
        <el-form-item label="角色名称" label-width="80px">
          <el-input
            v-model="editRoleForm.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述信息" label-width="80px">
          <el-input
            v-model="editRoleForm.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditMsg">确 定</el-button>
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
          roleName: "2016-05-02",
          roleDesc: "王小虎",
        },
        {
          roleName: "2016-05-04",
          roleDesc: "王小虎",
        },
        {
          roleName: "2016-05-01",
          roleDesc: "王小虎",
        },
        {
          roleName: "2016-05-03",
          roleDesc: "王小虎",
        },
      ],
      //对话框数据
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      // 添加角色对话框
      dialogAddRoleFormVisable: false,
      addRoleForm: {
        roleName: "",
        roleDesc: "",
      },
      //树的数据
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "authName",
      },
      //用户id
      roleId: "",
      //编辑角色对话框数据
      dialogeditRoleFormVisible: false,
      editRoleForm: {
        editId: "",
        roleName: "",
        roleDesc: "",
      },
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    //获取角色列表
    async getRolesList() {
      try {
        const res = await this.$axios.get("/roles");
        if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
          this.tableData = res.data.data;
        } else {
          this.displayInfo(res.data.meta.msg, "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    //获取选中项
    getSelected(row) {
      const ids = [];
      row.children.forEach((item1) => {
        item1.children.forEach((item2) => {
          item2.children.forEach((item3) => {
            ids.push(item3.id);
          });
        });
      });
      return ids;
    },
    //分配权限
    openRights(row) {
      this.$axios
        .get("/rights/tree")
        .then((res) => {
          if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
            this.treeData = res.data.data;
            this.roleId = row.id;
            this.dialogFormVisible = true;
            this.displayInfo("获取权限列表成功!", "success");
          } else {
            this.displayInfo(res.data.meta.msg, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      const ids = this.getSelected(row);
      this.$nextTick(() => {
        this.$refs["tree"].setCheckedKeys(ids);
      });
    },
    //提交角色信息
    async submitRoles() {
      let ids1 = this.$refs["tree"].getCheckedKeys();
      let ids2 = this.$refs["tree"].getHalfCheckedKeys();
      let idList = [...ids1, ...ids2];
      console.log(idList);
      try {
        let res = await this.$axios.post(`/roles/${this.roleId}/rights`, {
          rids: idList.join(","),
        });
        if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
          this.displayInfo(res.data.meta.msg, "success");
          this.dialogFormVisible = false;
          this.getRolesList();
        } else {
          this.displayInfo(res.data.meta.msg, "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    //提交编辑角色数据
    async submitEditMsg() {
      try {
        let res = await this.$axios.put(`/roles/${this.editRoleForm.editId}`, {
          roleName: this.editRoleForm.roleName,
          roleDesc: this.editRoleForm.roleDesc,
        });
        if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
          this.displayInfo("编辑用户成功", "success");
          this.dialogeditRoleFormVisible = false;
          this.getRolesList();
        } else {
          this.displayInfo(res.data.meta.msg, "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    //删除角色
    delRole(role) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.delete(`/roles/${role.id}`).then((res) => {
            console.log(res);
            if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
              this.displayInfo(res.data.meta.msg, "success");
              this.getRolesList();
            } else {
              this.displayInfo(res.data.meta.msg, "error");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //提交新增角色信息
    submitRoleMsg() {
      if (
        this.addRoleForm.roleName !== "" &&
        this.addRoleForm.roleDesc !== ""
      ) {
        this.$axios
          .post("/roles", {
            roleName: this.addRoleForm.roleName,
            roleDesc: this.addRoleForm.roleDesc,
          })
          .then((res) => {
            if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
              this.displayInfo("添加角色成功!", "success");
              this.dialogAddRoleFormVisable = false;
              //清空输入框
              this.addRoleForm.roleName = "";
              this.addRoleForm.roleDesc = "";
              this.getRolesList();
            } else {
              this.displayInfo(res.data.meta.msg, "error");
            }
          });
      } else {
        this.displayInfo("角色名称和描述信息不能为空!", "error");
        return;
      }
    },
    displayInfo(msg, type) {
      if (type === "error") {
        this.$message.error(msg);
      } else {
        this.$message({
          message: msg,
          type: type,
          duration: 600,
        });
      }
    },
    //打开编辑角色对话框
    openEditDialog(role) {
      this.editRoleForm.editId = role.id;
      this.editRoleForm.roleName = role.roleName;
      this.editRoleForm.roleDesc = role.roleDesc;
      this.dialogeditRoleFormVisible = true;
    },
  },
  created() {
    this.getRolesList();
  },
};
</script>

<style lang="less" scoped>
#roles {
  .el-tag--mini {
    margin: 10px 5px;
  }

  .btn {
    text-align: left;
  }
}
</style>
