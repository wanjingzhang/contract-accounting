<template>
  <div class="logpop">
    <div class="clsBtn abRT" v-if="ca_firstlogon == 'N'" @click="backNormal">
      <i class="el-icon-close"></i>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item label="Password" prop="testpass">
        <el-input
          v-model="ruleForm.testpass"
          label-position="top"
          placeholder="**********"
          type="password"
          class="popupinput"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="Repeat Password" prop="testpass2">
        <el-input
          v-model="ruleForm.testpass2"
          label-position="top"
          placeholder="**********"
          type="password"
          class="popupinput"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button class="full" plain @click="resetForm('ruleForm')"
          >Reset</el-button
        >
        <el-button class="full" type="primary" @click="submitForm('ruleForm')"
          >Change</el-button
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

  .clsBtn {
    padding: 10px;
    cursor: pointer;
  }
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
    margin-top: 32px;
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
import _ from "lodash";
import { getLocalStorage, setLocalStorage } from "../utils/tools.js";
import API from "../data/api.js";
var testPassword =
  /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,15}$/;

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Please input password!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Please input password again!"));
      } else if (value != this.ruleForm.testpass) {
        callback(new Error("Please input the same password!"));
      } else if (value.length < 6) {
        callback(new Error("Password must be at least 6 characters!"));
      } else if (testPassword.test(value) == false) {
        callback(
          new Error(
            "Password must has 3 types of Upper case letters, Lower case letters, Numbers and Special characters!"
          )
        );
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
        testpass: [{ validator: validatePass, trigger: "blur" }],
        testpass2: [{ validator: validatePass2, trigger: "blur" }],
      },
      ca_firstlogon: "Y",
    };
  },
  methods: {
    submitForm: _.debounce(function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { testpass } = this.ruleForm;
          let user = JSON.parse(getLocalStorage("testuser"));
          let { rowguid } = user;
          // 修改密码
          API.Updatepassword(rowguid, testpass, (res) => {
            let { code, message } = res;
            if (code == 200) {
              user.ca_firstlogon = "N";
              setLocalStorage("testuser", JSON.stringify(user));
              this.$emit("changedpwd");
              this.$message.info("Change password successfully!");
            } else {
              this.$message.error(message);
            }
          });
        } else {
          return false;
        }
      });
    }, 500),
    resetForm: _.debounce(function (formName) {
      this.$refs[formName].resetFields();
    }, 500),
    backNormal: _.debounce(function () {
      this.$emit("backnormal");
    }, 500),
  },
  mounted() {
    let user = JSON.parse(getLocalStorage("testuser"));
    let { ca_firstlogon } = user;
    this.ca_firstlogon = ca_firstlogon;
  },
};
</script>
