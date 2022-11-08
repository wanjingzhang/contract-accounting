<template>
  <div class="full">
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
import _ from "lodash";
import { Loading } from "element-ui";
import TabComponent from "./Tabs.vue";

import API from "../data/api.js";
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
.no-border {
  :deep(.el-input__inner) {
    border: 0;
    color: var(--light-orange);
    background: unset !important;
    font-size: 24px;
    width: 200px;
  }
}

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
</style>
