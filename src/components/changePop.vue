<template>
  <div class="logpop">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item label="Password" prop="testpass">
        <el-input
          v-model="ruleForm.testpass"
          label-position="top"
          placeholder="**********"
          type="password"
          class="popupinput"
        ></el-input>
      </el-form-item>
      <el-form-item label="Repeat Password" prop="testpass2">
        <el-input
          v-model="ruleForm.testpass"
          label-position="top"
          placeholder="**********"
          type="password"
          class="popupinput"
        ></el-input>
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
      color: #000000;
      background: unset !important;
      font-size: 26px;
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
import { setCookie, getCookie, isSupportLocalCookie } from "../utils/tools.js";
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
          API.Login({ loginname: testname, loginpass: testpass }, (res) => {
            let { code, message, accessToken } = res;
            if (code == 200) {
              let { officeid } = message[0];
              if (this.ruleForm.rememberChecked) {
                // 写入token
                setCookie("accessToken", accessToken, 1);
                let { officeid } = message[0];
                console.log("testoffice", officeid, 7); //保存7天
              }

              this.$message.info("Login successfully!");
              this.$emit("login", true, accessToken, officeid);
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
    }
  },
};
</script>
