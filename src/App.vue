<template>
  <div id="app">
    <div class="topbar">
      <div class="topbar-left">
        <img class="topbar-left-logo" alt="Vue logo" src="./assets/logo.svg" />
        <div class="topbar-left-title">Contract Accounting</div>
      </div>
      <div class="topbar-right">
        <div class="topbar-right-office">
          <el-tooltip
            class="item"
            effect="dark"
            content="project status checking"
            placement="left"
          >
            <el-link
              href="https://kc.test.com/invoiceaspx/australia_search.aspx"
              target="_blank"
              type="primary"
              ><i class="el-icon-suitcase" alt="Office"></i>
            </el-link>
          </el-tooltip>

          <el-select
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
          <span>Office</span>
        </div>
        <div class="topbar-right-searchbox" title="Search Input">
          <el-link
            class="advanced"
            :href="`https://kc.test.com/invoiceaspx/Pro_Finance/default_1.aspx?officeid=${this.value}`"
            target="_blank"
          >
            Advanced search
            <i class="el-icon-search" alt="Taipei/India Pay"></i>
          </el-link>
          <el-input
            placeholder="Project name or no."
            v-model="searchStr"
            class="searchinput"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="SearchHandler"
            ></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <TabComponent />
  </div>
</template>

<script>
import { Loading } from "element-ui";
import TabComponent from "./components/Tabs.vue";
import API from "./data/api.js";
import _ from "lodash";
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
      searchStr: "",
    };
  },
  methods: {
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
      let opt5 = [{ label: "By Team", value: "By Team", children: [] }];
      let array = [
        {
          label: "SHA",
          value: "https://kc.test.com/invoiceaspx/Teaminfo_list.aspx",
        },
        {
          label: "BJG",
          value: "https://kc.test.com/invoiceaspx/Teaminfobj_list.aspx",
        },
        {
          label: "TPE",
          value: "https://kc.test.com/invoiceaspx/Teaminfotp_list.aspx",
        },
        {
          label: "SIN",
          value: "https://kc.test.com/invoiceaspx/Teaminfosg_list.aspx",
        },
        {
          label: "India",
          value: "https://kc.test.com/invoiceaspx/Teaminfoindia_list.aspx",
        },
        {
          label: "Toronto",
          value: "https://kc.test.com/invoiceaspx/Teaminfotoronto_list.aspx",
        },
        {
          label: "Vancouver",
          value: "https://kc.test.com/invoiceaspx/Teaminfovan_list.aspx",
        },
        {
          label: "Raleigh",
          value: "https://kc.test.com/invoiceaspx/TeaminfoRaleigh_list.aspx",
        },
        {
          label: "Denver",
          value: "https://kc.test.com/invoiceaspx/TeaminfoDenver_list.aspx",
        },
        {
          label: "SF",
          value: "https://kc.test.com/invoiceaspx/TeaminfoSF_list.aspx",
        },
      ];
      for (let i = 0; i < array.length; i++) {
        opt5[0].children.push(array[i]);
      }
      this.options5 = opt5;
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
    SearchHandler: function () {
      window.open(
        `https://kc.test.com/invoiceaspx/projectsearchget.aspx?officelocation=${this.value}&optype=view&strname=${this.searchStr}`,
        "_blank"
      );
    },
  },
  watch: {
    value: _.throttle(async function () {
      loadingInstance = Loading.service({ fullscreen: true });
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
    }, 1000),
  },
  mounted() {
    this.Offices();
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
  margin: 50px auto;
  letter-spacing: 0.5px;
  display: flex;
  flex-direction: column;
  .topbar {
    height: 80px;
    display: flex;
    justify-content: space-between;

    &-left {
      &-logo {
        max-width: 360px;
        min-width: 150px;
        height: 26px;
      }
      &-title {
        font-size: 20px;
        line-height: 50px;
        text-align: left;
        cursor: pointer;
        color: var(--light-blue);
      }
    }
    &-right {
      font-size: 16px;
      text-align: right;
      margin-top: -10px;
      &-office {
        margin-right: 10px;
        cursor: pointer;
      }
      &-searchbox {
        width: 520px;
        display: flex;

        justify-content: space-between;
        .advanced {
          width: auto;
          font-size: 16px;
          span {
            width: 100px;
            height: 32px;
          }
        }
        .searchinput {
          width: 300px;
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
    color: var(--light-blue);
    width: 140px;
  }
}
</style>
<style lang="less">
:deep(.el-select-dropdown__item) {
  color: var(--light-blue);
}

@media screen and (min-width: 10px) and (max-width: 1280px) {
  #app {
    width: 100%;
    display: block;
    .topbar-left-logo {
      width: 100%;
    }
    .topbar-left-title {
      font-size: 0.9rem !important;
      line-height: 1.2rem !important;
    }
    .rightcontainer-item {
      margin-left: 20px;
      width: calc(100% - 20px);
    }
    .topbar-right-searchbox {
      width: 50%;
    }
    .topbar-right-searchbox {
      width: 100% !important;
      flex-direction: column !important;
      align-items: end;
    }
    .Tabs .leftpanel-item {
      min-width: 120px;
      width: auto;
      padding: 0 4px;
    }
    .rightcontainer-item-right4 .searchinput {
      width: 50%;
      min-width: 100px;
    }
    .rightcontainer-item-right .goSelect {
      width: 60%;
      min-width: 100px;
    }
    .topbar-right-searchbox .advanced {
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>
