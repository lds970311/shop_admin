<template>
  <!--添加商品页-->
  <div id="goods-add">
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active="active" finish-status="success">
      <el-step
        title="第一步"
        description="基本信息"
        style="text-align: center"
      ></el-step>
      <el-step title="第二步" description="商品图片"></el-step>
      <el-step title="第三部" description="商品内容"></el-step>
    </el-steps>
    <!--标签页-->
    <el-tabs tab-position="left" v-model="tabName" @tab-click="changeStep">
      <el-tab-pane label="基本信息" name="one">
        <el-form
          :model="addGoodsForm"
          status-icon
          ref="addGoodsForm"
          label-width="80px"
        >
          <el-form-item label="商品名称">
            <el-input
              type="text"
              v-model="addGoodsForm.goods_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input
              type="text"
              v-model="addGoodsForm.goods_price"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input
              type="text"
              v-model="addGoodsForm.goods_weight"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input
              type="text"
              v-model="addGoodsForm.goods_number"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              v-model="addGoodsForm.goods_cat"
              :options="options"
              clearable
              :props="defaultProps"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <div class="radio">
              <el-radio v-model="addGoodsForm.isPromote" :label="true"
              >是
              </el-radio
              >
              <el-radio v-model="addGoodsForm.isPromote" :label="false"
              >否
              </el-radio
              >
            </div>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="next(2, 'two')">下一步</el-button>
      </el-tab-pane>

      <!--第二步-->
      <el-tab-pane label="商品图片" name="two">
        <!--图片上传组件-->
        <el-upload
          action="http://192.168.1.123:19788/api/private/v1/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          style="margin-bottom: 20px"
          :on-success="uploadSuccess"
          :on-error="uploadFailed"
          :headers="headers"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt=""/>
        </el-dialog>
        <el-button type="primary" @click="prev(1, 'one')">上一步</el-button>
        <el-button type="primary" @click="next(3, 'three')">下一步</el-button>
      </el-tab-pane>

      <!--第三部-->
      <el-tab-pane label="商品内容" name="three">
        <quill-editor
          v-model="addGoodsForm.goods_introduce"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>

        <el-button type="primary" @click="prev(2, 'two')">上一步</el-button>
        <el-button type="primary" @click="submitGoodsMsg">确定</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import {quillEditor} from "vue-quill-editor";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      active: 1,
      tabName: "one",
      //提交商品表单数据
      addGoodsForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        goods_introduce: "",
        pics: [],
        isPromote: true,
      },
      //级联选择器数据
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
      defaultProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      //图片上传组件数据
      dialogImageUrl: "",
      dialogVisible: false,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      editorOption: {
        // some quill options
        placeholder: "输入商品信息",
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
    changeStep(e) {
      this.active = Number(e.index) + 1;
    },
    //下一步
    next(num, active) {
      this.active = num;
      this.tabName = active;
    },
    //上一步
    prev(num, active) {
      this.active = num;
      this.tabName = active;
    },
    loadCateGory() {
      this.$axios
        .get("categories", {
          params: {
            type: 3,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
            this.options = res.data.data;
          } else {
            this.displayInfo(res.data.meta.msg, "error");
            this.$router.back();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //图片上传组件方法:
    handleRemove(file, fileList) {
      console.log(file);
      this.addGoodsForm.pics.pop();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传成功
    uploadSuccess(response, file, fileLis) {
      console.log(response);
      this.addGoodsForm.pics.push({
        pic: response.data.tmp_path,
      });
    },
    uploadFailed(err, file, fileList) {
      console.log(err);
    },
    onEditorBlur(quill) {
    },
    onEditorFocus(quill) {
    },
    onEditorReady(quill) {
    },
    onEditorChange({quill, html, text}) {
      console.log("editor change!", quill, html, text);
      this.addGoodsForm.goods_introduce = html;
    },
    //添加商品
    async submitGoodsMsg() {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
      } = this.addGoodsForm;
      if (
        goods_name == "" ||
        goods_cat.length == 0 ||
        goods_price == 0 ||
        goods_number == 0 ||
        goods_weight == 0
      ) {
        this.displayInfo("商品名称和分类不能为空,价格数量不能为0!", "error");
        return;
      } else {
        try {
          let res = await this.$axios.post("goods", {
            goods_name,
            goods_cat: goods_cat.join(","),
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
          });
          if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
            this.displayInfo(res.data.meta.msg, "success");
            this.$router.back();
          } else {
            this.displayInfo(res.data.meta.msg, "error");
          }
        } catch (err) {
          this.displayInfo("请求错误", "error");
        }
      }
    },
  },
  mounted() {
    this.loadCateGory();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style scoped>
</style>


<style lang="less">
#goods-add {
  .el-step__head {
    text-align: left;
    margin: 10px;
  }

  .ql-container {
    height: 300px;
    margin-bottom: 20px;
  }

  .el-form {
    padding: 0 20px;

    .el-form-item__content {
      text-align: left;

      .el-cascader {
        width: 40%;
      }
    }
  }

  .el-tabs--left {
    overflow: visible;
  }

  .el-tabs {
    margin: 50px 0;

    .el-tab-pane {
      font-weight: bold;
      font-size: 20px;
    }

    .el-tabs__nav {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .el-tabs__item {
        flex-grow: 1;
      }
    }

    .el-tabs__nav {
      height: 100%;
    }
  }
}
</style>
