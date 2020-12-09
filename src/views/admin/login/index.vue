<template>
  <div class="box-card-container">
    <el-card class="box-card">
      <div class="login-title">校园活动管理平台</div>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-form
            label-position="left"
            label-width="60px"
            :model="formLogin"
            :rules="rules"
            ref="formLogin"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formLogin.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLogin.password" show-password></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetForm">取消</el-button>
          </div>
          <div class="to-register">
            <router-link to="/register">
              <el-button type="text"
                >没有账号，立即注册<i
                  class="el-icon-arrow-right el-icon--right"
                ></i
              ></el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from "vuex";
import md5 from "md5";

export default {
  data() {
    let checkUserName = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("账户不能为空!"));
      } else {
        cb();
      }
    };
    let checkPassword = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("密码不能为空!"));
      } else {
        cb();
      }
    };
    return {
      formLogin: {
        email: "",
        password: "",
      },
      rules: {
        email: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    ...mapActions("admin", ["adminLogin"]),
    // 向登录接口发起请求
    login() {
      // 表单验证
      this.$refs["formLogin"].validate((valid) => {
        if (valid) {
          // 通过验证之后才请求登录接口
          this.adminLogin({
            reqJson: {
              ...this.formLogin,
              password: md5(this.formLogin.password),
            },
            context: this,
          })
            .then((res) => {
              this.$message.success("登录成功");
              this.$router.push("/admin/index");
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          this.$message.error("表单验证失败!");
          return false;
        }
      });
    },
    // 表单重置
    resetForm() {
      this.$refs["formLogin"].resetFields();
    },
  },
};
</script>

<style>
.box-card-container {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-title {
  font-size: 22px;
  line-height: 24px;
  margin: 0 0 24px 0;
}
.box-card {
  min-width: 500px;
}
.to-register {
  padding-top: 8px;
}
</style>

