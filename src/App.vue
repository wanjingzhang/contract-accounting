<template>
  <div id="app">
    <!-- 背景 -->
    <div class="bg abLT"></div>
    <!-- 标题部分 -->
    <div class="topbar">
      <img class="topbar-logo" alt="test" src="./assets/logo_color.svg" />
    </div>
    <!-- cases -->
    <div class="cases abLB">
      <div v-for="i in projectLength" :key="i" class="cases-item">
        <img :src="imgs[i - 1]" />
      </div>
    </div>

    <!-- 内容部分 -->
    <div class="content abCC">
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

      <TabComponent ref="tabs" />
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
    };
  },
  methods: {
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
        let opt7 = [];
        for (let i = 0; i < res.length; i++) {
          opt7.push({
            label: res[i]["ProjectNo"] + ":" + res[i]["Projectname"],
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
      loadingInstance = Loading.service({ fullscreen: true });
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
  .bg {
    z-index: -1;
    width: 100%;
    height: 100%;
    background: url("./assets/bg.jpg") no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .topbar {
    height: 80px;
    &-logo {
      max-width: 360px;
      min-width: 150px;
      height: 26px;
      float: right;
      margin: 20px 20px 0 0;
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
      img {
        width: 124px;
        height: 124px;
        margin: -2px 0 0 -2px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #ffffff;
      }
    }
  }

  .content {
    top: 40%;
    width: 1280px;
    position: relative;
    .subtitle {
      width: 800px;
      height: 70px;
      margin: 0 auto;
      user-select: none;
      :deep(.el-input__icon) {
        color: #ff671f;
        font-size: 24px;
        line-height: 28px;
      }
      h2 {
        font-size: 32px;
        color: #000000;
      }
      &-office {
        font-size: 24px;
        font-weight: 600;
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
    font-weight: 600;
    width: 200px;
  }
}
</style>
<style lang="less">
:deep(.el-select-dropdown__item.selected) {
  color: var(--light-orange) !important;
}

@media screen and (min-width: 0) and (max-width: 768px) {
  .myCascader {
    width: 90% !important;
    left: 5% !important;
  }

  #app .topbar {
    height: 60px !important;
    .topbar-logo {
      width: 80% !important;
      margin: 4px 10% !important;
    }
  }

  #app .rightcontainer-item {
    padding: 5px 0 4px 10px;
  }

  #app .content {
    width: 100% !important;
    overflow: auto;
  }
  #app .no-border {
    .el-input__inner {
      font-size: 0.8rem;
      width: 148px;
    }
  }
  #app .content .subtitle {
    width: 100% !important;
    h2 {
      font-size: 1.2rem !important;
    }
    &-office {
      font-size: 0.8rem !important;
    }
    .el-input__icon {
      font-size: 0.8rem !important;
    }
  }
  #app .cases {
    width: 98% !important;
    bottom: -40px !important;
    margin-left: 0 !important;
    left: 0 !important;
    .cases-item {
      width: 16%;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  #app .TabBox {
    width: 100% !important;
    .Tabs {
      margin: 0;
    }
    .leftpanel {
      width: 20% !important;
      overflow: hidden;
      padding: 10px 0;
      .item {
        font-size: 1.8rem;
        padding: 0 2px;
        height: auto;
        margin: 0 0 20px 0;
      }
      .item-tail {
        font-size: 0.6rem;
        width: 34px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: break-word;
        display: inline-block;
      }
      .item-ball {
        width: 95%;
        margin-left: 5%;
        height: 2.6rem;
        left: -4px;
        border-radius: 4px;
      }

      .item.active {
        .item-ball {
          animation: changeStatus 0.3s forwards ease-out;
        }
      }
    }

    .rightcontainer {
      width: 80% !important;
    }
    .rightcontainer-item-left {
      width: 50% !important;
      &-title {
        font-size: 0.8rem;
      }
    }

    .rightcontainer-item-right2 {
      justify-content: right;
      padding-right: 8px;
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
  }
}
</style>
