<template>
  <el-row align="middle" justify="center" type="flex">
    <el-col :span="8" class="main-form">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        class="demo-ruleForm"
      >
        <h2>电商后台管理系统</h2>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain type="success" @click="login('loginForm')"
          >登录
          </el-button
          >
          <el-button plain type="primary" @click="reset('loginForm')"
          >重置
          </el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
      },
      rules: {
        //校验用户名
        userName: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        //校验密码
        password: [
          {required: true, message: "请填写密码", trigger: "blur"},
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
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
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {

        } else {
          //发送请求开始登录
          axios
            .post("/login", {
              username: this.loginForm.userName,
              password: this.loginForm.password,
            })
            .then((res) => {
              console.log(res);
              if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
                //登录成功
                this.displayInfo(res.data.meta.msg, "success");
                //获取token并保存
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("user", this.loginForm.userName);
                this.$router.push({
                  path: "/home",
                });
              } else {
                this.displayInfo(res.data.meta.msg, "error");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style lang="less" scoped>
.el-row {
  height: 100%;
  background: url("../../assets/imgs/bg.jpg");
  background-size: cover;

  .main-form {
    background: #fff;
    padding: 20px 30px;
    border-radius: 16px;

    h2 {
      margin: 10px 0;
    }
  }
}
</style>
