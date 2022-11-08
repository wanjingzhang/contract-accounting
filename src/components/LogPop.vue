<template>
  <div class="logpop">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item label="User Name" prop="testname">
        <el-input
          v-model="ruleForm.testname"
          label-position="top"
          placeholder="please input user name"
          autocomplete="off"
          class="popupinput"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="testpass">
        <el-input
          v-model="ruleForm.testpass"
          label-position="top"
          placeholder="**********"
          type="password"
          class="popupinput"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="8" class="left"
          ><el-checkbox v-model="ruleForm.rememberChecked"
            >Remember Me</el-checkbox
          ></el-col
        >
        <el-col class="line" :span="8"><span>&nbsp;</span></el-col>
        <el-col :span="8" class="right"
          ><el-link>Forgot Password</el-link></el-col
        >
      </el-form-item>
      <el-form-item class="btns">
        <el-button class="full" plain @click="resetForm('ruleForm')"
          >Reset</el-button
        >
        <el-button class="full" type="primary" @click="submitForm('ruleForm')"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
.logpop {
  background-color: rgba(255, 255, 255, 0.6);
  padding: 14px 40px 20px;
  border-radius: 6px;
  box-sizing: border-box;
  width: 480px;
  top: 44%;
  .popupinput {
    :deep(.el-input__inner) {
      border: 0;
      border-bottom: 1px solid #cccccc;
      color: var(--light-orange);
      background: unset !important;
      font-size: 24px;
    }
  }

  .btns {
    :deep(.el-form-item__content) {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-around;
    }
    .left {
      width: 49%;
    }
    .right {
      width: 49%;
    }
  }
  :deep(.el-form-item) {
    margin-bottom: 10px;
  }
}
</style>
<script>
import {
  setCookie,
  getCookie,
  clearCookie,
  isSupportLocalCookie,
} from "../utils/tools.js";
import API from "../data/api.js";
var isSupportCookie = isSupportLocalCookie();
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Please input user name!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Please input password!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        testname: "",
        testpass: "",
        rememberChecked: true,
      },
      rules: {
        testname: [{ validator: validateName, trigger: "blur" }],
        testpass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { testname, testpass } = this.ruleForm;
          // 数据提交API
          if (this.ruleForm.rememberChecked) {
            setCookie("testname", testname, 7); //保存7天
            setCookie("testpass", testpass, 7); //保存7天
          } else {
            clearCookie("testname");
            clearCookie("testpass");
          }
          API.Login({ loginname: testname, loginpass: testpass }, (res) => {
            console.log(res);
            scroll;
            let { code, message, accessToken } = res;
            if (code == 200) {
              // 写入token
              setCookie("accessToken", accessToken, 1);
              this.$message.info(message);
              this.$emit("login", true, accessToken);
              API.setToken();
            } else {
              this.$message.error(message);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    // 读取cookie
    if (isSupportCookie) {
      this.ruleForm.testname = getCookie("testname");
      this.ruleForm.testpass = getCookie("testpass");
    }
  },
};
</script>
