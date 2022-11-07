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

    <!-- 内容部分 -->
    <div :class="'content abCC' + showClass">
      <!-- 中间subtitle部分 -->
      <div class="subtitle">
        <h2>Contract Accounting</h2>
        <div class="subtitle-office">
          <el-select
            type="warning"
            class="no-border"
            v-model="value"
            filterable
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span>office</span>
        </div>
      </div>

      <TabComponent ref="tabs" @hideMenu="hideMenu" />
    </div>
    <!-- 展开菜单按钮 -->
    <div :class="'mobMenu ' + showClass" @click="showTabs">
      <div class="line line1"></div>
      <div class="line line3"></div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import TabComponent from "./components/Tabs.vue";
import API from "./data/api.js";
import _ from "lodash";
import img1 from "./assets/btns/1.jpg";
import img2 from "./assets/btns/2.jpg";
import img3 from "./assets/btns/3.jpg";
import img4 from "./assets/btns/4.jpg";
import img5 from "./assets/btns/5.jpg";
const imgs = [img1, img2, img3, img4, img5];
// 声明变量，用来存储Loading组件的实例对象
let loadingInstance = null;

export default {
  name: "App",
  data: () => {
    return {
      options: [],
      value: "",
      options2: [], // Project Director & Director
      options3: [], // E approval PO 1 & PO 2 & GW
      options4: [], // E approval Payment PO 1 & PO 2 & GW
      options42: [], // check
      options5: [], // forecast
      options6: [], // ZSJ
      options7: [], // ImportList

      searchStr: "",
      itemId: -1,
      projectLength: 5,
      imgs: imgs,
      show: false,
      showClass: "",
    };
  },
  methods: {
    // mobile show tabs
    showTabs() {
      if (!this.show) {
        this.showClass = " show";
      } else {
        this.showClass = "";
      }
      this.show = !this.show;
      this.$refs.tabs.showMenu(this.show);
    },
    hideMenu(flag) {
      this.showClass = flag;
      this.show = false;
    },
    addActive(id) {
      this.itemId = id;
    },
    // 获取全球办公室列表
    async Offices() {
      let data = await API.Offices();
      let opts = [];
      for (let i = 0; i < data.length; i++) {
        opts.push({
          value: data[i].officeid,
          label: data[i].officeid,
        });
      }
      this.value = "Shanghai";
      this.options = opts;
    },
    async Managers(str) {
      let datas = await API.Managers(str);
      let opt2 = [
        { label: "Team Info", value: "Team Info", children: [] },
        { label: "Project Leader", value: "Project Leader", children: [] },
        { label: "Project Director", value: "Project Director", children: [] },
      ];
      for (var k = 0; k < datas[0].length; k++) {
        opt2[0].children.push({
          value: datas[0][k]["Teaminfo"] + "_TeamInfo",
          label: datas[0][k]["Teaminfo"],
        });
      }
      for (var i = 0; i < datas[1].length; i++) {
        opt2[1].children.push({
          value: datas[1][i]["teamleader"] + "_ProjectLeader",
          label: datas[1][i]["teamleader"],
        });
      }
      for (var j = 0; j < datas[2].length; j++) {
        opt2[2].children.push({
          value: datas[2][j]["projectleader"] + "_ProjectDirector",
          label: datas[2][j]["projectleader"],
        });
      }
      return opt2;
    },
    Eapproval(str) {
      API.Eapproval(str, (datas) => {
        let opt3 = [
          { label: "First approver", value: "First approver", children: [] },
          {
            label: "Second approver",
            value: "Second approver",
            children: [],
          },
          {
            label: "Project Administrator",
            value: "Project Administrator",
            children: [],
          },
        ];
        for (var i = 0; i < datas[0].length; i++) {
          opt3[0].children.push({
            value: datas[0][i]["po_ap_1"] + "_ProjectLeader",
            label: datas[0][i]["po_ap_1"],
          });
        }
        for (var j = 0; j < datas[1].length; j++) {
          opt3[1].children.push({
            value: datas[1][j]["po_ap_2"] + "_ProjectDirector",
            label: datas[1][j]["po_ap_2"],
          });
        }
        for (var k = 0; k < datas[2].length; k++) {
          opt3[2].children.push({
            value: datas[2][k]["po_gw_1"] + "_ProjectAdministrator",
            label: datas[2][k]["po_gw_1"],
          });
        }
        this.options3 = opt3;
      });
    },
    Payment(str) {
      API.Payment(str, (datas) => {
        let opt4 = [
          { label: "First approver", value: "First approver", children: [] },
          { label: "Second approver", value: "Second approver", children: [] },
          { label: "Third approver", value: "Third approver", children: [] },
        ];
        let opt42 = [{ label: "PO Check", value: "PO Check", children: [] }];
        for (var i = 0; i < datas[0].length; i++) {
          opt4[0].children.push({
            value: datas[0][i]["po_ap_1"] + "_Level1",
            label: datas[0][i]["po_ap_1"],
          });
        }
        for (var j = 0; j < datas[1].length; j++) {
          opt4[1].children.push({
            value: datas[1][j]["po_ap_2"] + "_Level2",
            label: datas[1][j]["po_ap_2"],
          });
        }
        for (var k = 0; k < datas[2].length; k++) {
          opt4[2].children.push({
            value: datas[2][k]["po_ap_3"] + "_Level3",
            label: datas[2][k]["po_ap_3"],
          });
        }

        for (var l = 0; l < datas[3].length; l++) {
          opt42[0].children.push({
            value: datas[3][l]["po_gw_1"] + "_POCheck",
            label: datas[3][l]["po_gw_1"],
          });
        }
        this.options4 = opt4;
        this.options42 = opt42;
      });
    },
    ForecastList: function () {
      let str = "";
      let forecastObj = {
        Shanghai: "https://kc.test.com/invoiceaspx/Teaminfo_list.aspx",
        Beijing: "https://kc.test.com/invoiceaspx/Teaminfobj_list.aspx",
        Taipei: "https://kc.test.com/invoiceaspx/Teaminfotp_list.aspx",
        Singapore: "https://kc.test.com/invoiceaspx/Teaminfosg_list.aspx",
        India: "https://kc.test.com/invoiceaspx/Teaminfoindia_list.aspx",
        Toronto: "https://kc.test.com/invoiceaspx/Teaminfotoronto_list.aspx",
        Vancouver: "https://kc.test.com/invoiceaspx/Teaminfovan_list.aspx",
        Raleigh: "https://kc.test.com/invoiceaspx/TeaminfoRaleigh_list.aspx",
        Denver: "https://kc.test.com/invoiceaspx/TeaminfoDenver_list.aspx",
        SanFrancisco: "https://kc.test.com/invoiceaspx/TeaminfoSF_list.aspx",
      };

      // is check the india
      if (
        this.value == "Delhi" ||
        this.value == "Bangalore" ||
        this.value == "Mumbai" ||
        this.value == "Hyderabad"
      ) {
        str = forecastObj["India"];
        this.options5 = ["India", str];
      } else {
        // filter the data
        str = forecastObj[this.value];
        this.options5 = [this.value, str];
        if (str == undefined || str.length == 0) {
          str = "";
          this.options5 = [];
        }
      }
    },
    TeaminfoZSJ: function () {
      API.TeaminfoZSJ((res) => {
        let opt6 = [
          {
            label: "By Project Director",
            value: "By Project Director",
            children: [],
          },
        ];
        for (let i = 0; i < res.length; i++) {
          opt6[0].children.push({
            label: res[i]["Teaminfo"],
            value: res[i]["Teaminfo"] + "_ZSJ",
          });
        }
        this.options6 = opt6;
      });
    },
    ImportList: function (str) {
      API.ImportProjectList(str, (res) => {
        let opt7 = [],
          lab = "";
        for (let i = 0; i < res.length; i++) {
          lab = `${res[i]["ProjectNo"]}:${res[i]["Projectname"]}`;
          opt7.push({
            label: lab,
            value: String(res[i]["id"]).trim(),
          });
        }
        this.options7 = opt7;
      });
    },
    SearchHandler: function () {
      window.open(
        `https://kc.test.com/invoiceaspx/projectsearchget.aspx?officelocation=${this.value}&optype=view&strname=${this.searchStr}`,
        "_blank"
      );
    },
    // H5 plus事件处理
    plusReady: function () {
      // 设置系统状态栏背景为红色
      var type =
        navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/) ||
        navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
      if (type == "iOS") {
        navigator.setStatusBarBackground("#368CBD");
      } else {
        navigator.setStatusBarBackground("#ddd");
      }
    },
  },
  watch: {
    value: _.throttle(async function () {
      loadingInstance = Loading.service({
        fullscreen: true,
        background: "transparent",
      });
      // 6. 获取添加列表
      this.ImportList(this.value);

      // 1. 获取管理员列表
      let opt2 = await this.Managers(this.value);
      this.options2 = opt2;
      loadingInstance.close();

      // 2. 获取E-approval
      this.Eapproval(this.value);
      // 3. 获取E-approval
      this.Payment(this.value);

      // 4. 获取options
      this.ForecastList();

      // 5. 获取珠三角Teaminfo
      this.TeaminfoZSJ();

      // 6. office 修改时，需要向下传递到组件
      this.$refs.tabs.updated(this.value);
    }, 1000),
  },
  mounted() {
    this.Offices();
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", this.plusReady, false);
    }
  },
  provide: function () {
    return {
      office: () => this.value,
      options2: () => this.options2,
      options3: () => this.options3,
      options4: () => this.options4,
      options42: () => this.options42,
      options5: () => this.options5,
      options6: () => this.options6,
      options7: () => this.options7,
    };
  },
  components: {
    TabComponent,
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
  animation: show 1s 1s forwards;

  letter-spacing: 0.5px;
  position: relative;
  perspective: 500px;

  .mobMenu {
    display: none;
    position: fixed;
    top: 0;
    left: 2px;
    background-color: transparent;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    user-select: none;
    .line {
      width: 22px;
      height: 2px;
      background-color: #000;
      position: absolute;
      left: 9px;

      &.line1 {
        top: 12px;
        transition: all 0.3s;
      }
      &.line3 {
        top: 24px;
        transition: all 0.3s;
      }
    }
  }

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

  .content {
    top: 40%;
    width: 1280px;
    position: relative;
    .subtitle {
      width: 800px;
      height: 100px;
      margin: 0 auto;
      user-select: none;
      :deep(.el-input__icon) {
        color: #ff671f;
        font-size: 24px;
        line-height: 28px;
      }
      h2 {
        font-size: 44px;
        color: #000000;
      }
      &-office {
        font-size: 24px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        user-select: none;
        color: #000000;
        &-select {
          width: 200px;
        }
      }
    }
  }
}
:deep(.el-input__inner) {
  font-size: 16px;
}

.no-border {
  :deep(.el-input__inner) {
    border: 0;
    color: var(--light-orange);
    background: transparent !important;
    font-size: 24px;
    width: 200px;
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
      background: url("./assets/bg_m2.jpg") no-repeat !important;
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
