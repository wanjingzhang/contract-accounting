<template>
  <div id="app">
    <!-- 背景 -->
    <div class="bg abLT"></div>
    <!-- 标题部分 -->
    <div class="topbar">
      <img class="topbar-logo pc" alt="test" src="./assets/logo_color.svg" />
      <img class="topbar-logo mob" alt="test" src="./assets/logo.svg" />
    </div>
    <!-- cases -->
    <div class="cases abLB">
      <div v-for="i in projectLength" :key="i" class="cases-item">
        <img :src="imgs[i - 1]" />
      </div>
    </div>

    <!-- 修改密码 -->
    <ChangePop
      v-if="cgPop"
      class="abCC"
      @changedpwd="ChangePwdHandler"
      @backnormal="BacknormalHandler"
    />

    <!-- Login 登录 -->
    <LoginPop
      ref="pop"
      v-if="cgPop == false && token.length == 0"
      class="abCC"
      @poploginHandler="poploginHandler"
    />
    <!-- Index 首页 -->
    <IndexPgVue
      ref="indx"
      :token="token"
      :officeid="office"
      v-show="cgPop == false && token.length > 0"
      @needLogin="goLoginHandler"
    />

    <!-- 按钮组 -->
    <div class="btnsGroup abRC" v-if="firstLogin == false && token.length > 0">
      <div class="full bgc abLT"></div>
      <div class="icon icon1" @click="showChangePwdHandler">
        <div class="item"></div>
        <span class="text">Change password</span>
      </div>
      <div class="icon icon2" @click="quitHandler">
        <div class="item"></div>
        <span class="text">Quick Logout</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import _ from "lodash";
import API from "./data/api";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "./utils/tools.js";
import IndexPgVue from "./components/IndexPg.vue";
import LoginPop from "./components/LogPop.vue";
import ChangePop from "./components/changePop.vue";

import img1 from "./assets/btns/1.jpg";
import img2 from "./assets/btns/2.jpg";
import img3 from "./assets/btns/3.jpg";
import img4 from "./assets/btns/4.jpg";
import img5 from "./assets/btns/5.jpg";
const imgs = [img1, img2, img3, img4, img5];

// 声明变量，用来存储Loading组件的实例对象
let loadingInstance = null;
loadingInstance = Loading.service({
  fullscreen: true,
  background: "transparent",
});

export default {
  name: "App",
  data: () => {
    return {
      token: "",
      office: "",
      imgs: imgs,
      projectLength: 5,
      cgPop: false,
      firstLogin: false,
    };
  },
  methods: {
    // 弹窗完成后回调
    poploginHandler(flag, token, office) {
      if (flag) {
        this.successLogin(token, office);
      }
    },
    // 打开修改密码弹框
    showChangePwdHandler: _.debounce(function () {
      this.cgPop = true;
    }, 500),
    // 已经修改好了密码
    ChangePwdHandler() {
      this.firstLogin = false;
      this.cgPop = false;
      this.token = getLocalStorage("accessToken");
    },
    // 不想修改密码了
    BacknormalHandler() {
      this.firstLogin = false;
      this.cgPop = false;
    },
    goLoginHandler() {
      this.token = "";
      this.office = "";
      clearLocalStorage();
    },
    successLogin(token, office) {
      API.setToken();
      this.Offices(office, token);
    },
    quitHandler: _.debounce(function () {
      API.Logout((res) => {
        if (res.code == 200) {
          setLocalStorage("testLogin", false);

          this.$message.info(res.message);
          this.goLoginHandler();
          this.BacknormalHandler();
        }
      });
    }, 500),
    // 获取全球办公室列表
    async Offices(office, token) {
      let data = await API.Offices(token);
      // 如果没有的话，就是未登录
      if (data == "") {
        this.token = "";
      } else {
        // 判断是否初次登录，需要修改密码
        let { ca_firstlogon } = JSON.parse(getLocalStorage("testuser"));
        if (ca_firstlogon == "Y") {
          // 需要修改密码
          this.cgPop = true;
          this.firstLogin = true;
          this.$message("Please reset your password, before you are use it!");
        } else {
          this.firstLogin = false;
          this.token = token;
          // 等待更新office
          setTimeout(() => {
            this.office = office;
            setLocalStorage("testLogin", true);
          }, 600);
        }
      }
    },
  },

  async mounted() {
    // get storage
    let accessToken = getLocalStorage("accessToken");
    let office = getLocalStorage("testoffice");

    // if has token， verify the token
    if (accessToken?.length > 0 && office.length > 0) {
      // 测试API调用
      this.Offices(office, accessToken);
    }

    loadingInstance.close();
  },
  unmounted() {
    if (!getLocalStorage("testrember")) {
      setLocalStorage("testLogin", false);
    }
  },
  components: {
    IndexPgVue,
    LoginPop,
    ChangePop,
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  opacity: 0;
  animation: show 1s 0.5s forwards;

  letter-spacing: 0.5px;
  position: relative;
  perspective: 500px;

  .bg {
    z-index: -1;
    width: 100%;
    height: 100%;
    background: url("./assets/bg.svg") no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .topbar {
    height: 80px;
    user-select: none;
    pointer-events: none;
    &-logo {
      max-width: 280px;
      min-width: 150px;
      height: 26px;
      float: right;
      margin: 20px 20px 0 0;
      &.mob {
        height: 30px;
        display: none;
      }
      &.pc {
        display: block;
      }
    }
  }

  .cases {
    display: flex;
    width: 760px;
    justify-content: space-around;
    margin-left: 32px;
    bottom: 60px;
    left: 20px;
    &-item {
      width: 120px;
      height: 120px;
      position: relative;
      transition: all 0.4s ease 0.1s;
      filter: brightness(0.9);
      transform: scale(1);
      border: 4px solid #ffffff;
      border-radius: 50%;
      img {
        width: 124px;
        height: 124px;
        margin: -2px 0 0 -2px;
        border-radius: 50%;
      }
    }
  }

  .btnsGroup {
    width: 210px;
    height: 100px;
    &::after {
      content: " ";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #e7e7e7;
      position: absolute;
      left: 0;
      top: 50px;
    }
    transition: transform 0.6s;
    transform: translateX(157px);

    &:hover {
      transform: translateX(0);
    }
    .bgc {
      width: 100%;
      height: 100%;
      border-radius: 10px 0 0 10px;
      background-color: rgba(255, 255, 255, 0.6);
      z-index: -1;
    }
    .icon {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      user-select: none;
      .item {
        width: 30px;
        height: 30px;
        background-size: contain;
      }
      .text {
        line-height: 50px;
        margin-right: 10px;
      }

      &:hover {
        .text {
          color: #ff671f;
        }
      }
    }

    .icon1 {
      .item {
        margin: 10px 6px 10px 16px;
        background: url(./assets/icons.svg) no-repeat;
        background-position: 0 0;
      }
      &:hover {
        .item {
          background-position: -30px 0;
        }
      }
    }

    .icon2 {
      .item {
        margin: 11px 10px 0 13px;
        background: url(./assets/icons.svg) no-repeat;
        background-position: 0px -30px;
      }
      &:hover {
        .item {
          background-position: -30px -30px;
        }
      }
    }
  }
}
</style>
<style lang="less">
// 720P的分辨率为1280x720像素
@media screen and (min-width: 0) and (max-width: 768px) {
  #app {
    min-height: 600px;
    .bg {
      top: 40px;
      z-index: -1;
      width: 100% !important;
      height: 100% !important;
      background: url("./assets/bg_m.svg") no-repeat !important;
      background-size: cover !important;
      background-position: center center !important;
    }
    .mobMenu {
      display: block !important;
      z-index: 5;

      &.show {
        .line1 {
          transform-origin: right center;
          transform: rotate(-45deg);
          top: 12px !important;
        }
        .line3 {
          transform-origin: right center;
          transform: rotate(45deg);
          top: 28px !important;
        }
      }
    }
    .topbar {
      height: 60px !important;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      &-logo {
        width: 80% !important;
        margin: 4px 10% !important;
        &.mob {
          display: block !important;
          float: right;
          margin: 4px 10px !important;
        }
        &.pc {
          display: none !important;
        }
      }
    }

    .content {
      width: 100% !important;
      min-height: 600px !important;
      top: calc(50% + 40px) !important;
      overflow: auto;
      &.show {
        position: absolute;
        height: 100%;
      }
      .subtitle {
        width: 100% !important;
        height: auto !important;
        margin: 20px auto 0 auto !important;
        h2 {
          font-size: 1.4rem !important;
        }
        &-office {
          font-size: 0.8rem !important;
        }
        .el-input__icon {
          font-size: 0.8rem !important;
        }
      }
    }
    .cases {
      margin-left: 0 !important;
      left: 0 !important;
      width: 100% !important;
      min-width: 300px;
      .cases-item {
        width: 50px;
        height: 50px;
        border: 2px solid #ffffff;
        img {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      }
    }

    .TabBox {
      width: 100% !important;

      .Tabs {
        margin: 0;
        position: relative;
      }
      .leftpanel {
        width: 20% !important;
        padding: 10px 0;
        overflow: hidden;
        display: none;

        &.show {
          position: fixed;
          top: 0;
          left: 0;
          width: 100% !important;
          display: block;
          animation: heightAni 0.5s forwards;

          background: #ffffff;
          z-index: 2;
          .item {
            opacity: 0;
          }
          .item0 {
            animation: showToBtm 0.2s forwards 0.2s;
          }
          .item1 {
            animation: showToBtm 0.2s forwards 0.3s;
          }
          .item2 {
            animation: showToBtm 0.2s forwards 0.4s;
          }
          .item3 {
            animation: showToBtm 0.2s forwards 0.5s;
          }
          .item4 {
            animation: showToBtm 0.2s forwards 0.6s;
          }
          .item5 {
            animation: showToBtm 0.2s forwards 0.8s;
          }
        }
        .item {
          padding: 0 2px;
          &-capital {
            font-size: 1.2rem;
            width: 94%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: break-word;
            display: inline-block;
            text-align: center;
            padding: 0 20px;
          }
          &-ball {
            width: 95%;
            margin-left: 5%;
            height: 1.6rem;
            left: -4px;
            border-radius: 4px;
          }

          &.active {
            .item-ball {
              animation: changeStatus 0.3s forwards ease-out;
            }
          }
        }
      }

      .rightcontainer {
        width: 100% !important;
        transform: none !important;
        &-item-left {
          width: 50% !important;
          &-title {
            font-size: 1rem;
            font-weight: 500;
          }
        }
        .mob-tips {
          display: block;
          font-size: 0.8rem;
          line-height: 1rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 24px;
        }
      }

      .rightcontainer-item-right2 {
        justify-content: right;
        padding-right: 10px;
        .forecastLink {
          font-size: 0.8rem;
        }
      }
      .rightcontainer-item-right {
        width: 50% !important;
        height: 40px;
        box-sizing: border-box;
        .gobtn {
          height: 100%;
          box-sizing: border-box;
          width: 40px !important;
        }
        .goSelect {
          height: 100%;
          box-sizing: border-box;
          width: calc(100% - 50px) !important;
        }
      }
      .rightcontainer-item-right5 {
        flex-direction: column;
        align-items: end;
        padding-right: 10px;
        width: 50%;
        .leftLink {
          margin-right: 0;
          margin-bottom: 4px;
        }
        .forecastLink {
          width: 120px;
        }
      }
      .rightcontainer-item-right2 {
        justify-content: right;
      }
    }
    .rightcontainer-item {
      padding: 8px 0 8px 10px;
    }
    .no-border {
      .el-input__inner {
        font-size: 0.8rem;
        width: 148px;
      }
    }

    .logpop {
      width: 90% !important;
      padding: 10px 16px;
      .el-form-item__label {
        font-size: 12px;
      }
      .popupinput {
        .el-input__inner {
          font-size: 12px;
          line-height: 20px;
          border-radius: 0 !important;
        }
      }
      .el-form-item__content {
        line-height: 26px;
        .el-link--inner,
        .el-checkbox__label {
          font-size: 12px;
        }
        button {
          line-height: 5px;
          span {
            font-size: 12px;
          }
        }
      }
    }
    .btnsGroup {
      top: 10%;
      z-index: 6;
      width: 200px !important;
      height: 80px !important;
      &:hover {
        transform: translateX(157px) !important;
      }
      .icon {
        height: 40px !important;
      }
      .icon1 {
        .item {
          margin: 5px 4px 10px 13px !important;
        }
      }
      .icon2 {
        .item {
          margin: 5px 4px 10px 8px !important;
        }
      }
      &:after {
        top: 38px !important;
        background-color: #a3a3a3 !important;
      }
    }
  }
  .myCascader {
    max-width: 97% !important;
    margin-left: 1% !important;
  }
}
:deep(.el-select-dropdown__item.selected) {
  color: var(--light-orange) !important;
}

@media screen and (min-width: 768px) and (max-width: 1280px) {
  #app {
    min-height: 750px;
    .content {
      min-height: 600px !important;
      .TabBox .Tabs .leftpanel .item-capital {
        font-size: 16px;
      }
    }
  }
}
// 1080P的分辨率为1920*1080像素

// 2k的分辨率为2560*1440像素

// 4k的分辨率为3840*2160像素

// 8K的分辨率为7680×4320像素

@media screen and (min-width: 1280px) and (max-width: 3840px) {
  #app {
    min-height: 750px;
  }
  #app .content {
    width: 920px !important;
    min-height: 600px !important;
    .subtitle {
      height: 160px !important;
    }
    .TabBox {
      width: 100% !important;
      .Tabs {
        display: flex;
        justify-content: space-around;
        .leftpanel {
          width: 24% !important;
        }
        .rightcontainer {
          width: 74% !important;
          &-item-left {
            width: 60% !important;
          }
          &-item-left-title {
            width: 100% !important;
          }
        }
      }
    }
  }
}
</style>
