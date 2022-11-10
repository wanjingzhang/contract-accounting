<template>
  <div class="logpop">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item label="User Name" prop="testname">
        <el-input
          v-model="ruleForm.testname"
          label-position="top"
          placeholder="Please input user name"
          autoComplete="off"
          class="popupinput"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="testpass">
        <el-input
          v-model="ruleForm.testpass"
          label-position="top"
          placeholder="**********"
          class="popupinput"
          auto-complete="new-password"
          show-password
          @keyup.enter.native="submitForm('ruleForm')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="8" class="left"
          ><el-checkbox v-model="ruleForm.rememberChecked"
            >Remember Me</el-checkbox
          ></el-col
        >
        <el-col class="line" :span="7"><span>&nbsp;</span></el-col>
        <el-col :span="9" class="right"
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
  padding: 8px 30px 16px;
  border-radius: 6px;
  box-sizing: border-box;
  width: 420px;
  top: 44%;
  .popupinput {
    :deep(.el-input__inner) {
      border: 0;
      border-bottom: 1px solid #cccccc;
      color: #000000;
      background: unset !important;
      font-size: 26px;
      border-radius: 0;
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
import { setLocalStorage } from "../utils/tools.js";
import API from "../data/api.js";
import _ from "lodash";
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
    submitForm: _.debounce(function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { testname, testpass } = this.ruleForm;
          // 数据提交API
          API.Login({ loginname: testname, loginpass: testpass }, (res) => {
            let { code, message, accessToken } = res;
            if (code == 200) {
              let { officeid } = message[0];
              if (this.ruleForm.rememberChecked) {
                // 写入token
                let { officeid } = message[0];
                setLocalStorage("accessToken", accessToken);
                // message[0].ca_firstlogon = "Y";
                setLocalStorage("testoffice", officeid); //保存7天
                setLocalStorage("testrember", true);
              }
              setLocalStorage("testuser", JSON.stringify(message[0]));
              setLocalStorage("testLogin", true);

              this.$message.info("Login successfully!");
              this.$emit("poploginHandler", true, accessToken, officeid);
            } else {
              this.$message.error(message);
            }
          });
        } else {
          return false;
        }
      });
    }, 1000),
    resetForm: _.debounce(function (formName) {
      this.$refs[formName].resetFields();
    }, 1000),
  },
};
</script>
