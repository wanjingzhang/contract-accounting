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
let load = false;
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
      options5: [], // forecast
      options6: [], // ZSJ
      searchStr: "",
    };
  },
  methods: {
    // 获取全球办公室列表
    async Offices() {
      if (load) return;
      load = true;
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
        { label: "Project Leader", value: "Project Leader", children: [] },
        { label: "Project Director", value: "Project Director", children: [] },
      ];
      for (var i = 0; i < datas[0].length; i++) {
        opt2[0].children.push({
          value: datas[0][i]["teamleader"] + "_ProjectLeader",
          label: datas[0][i]["teamleader"],
        });
      }
      for (var j = 0; j < datas[1].length; j++) {
        opt2[1].children.push({
          value: datas[1][j]["projectleader"] + "_ProjectDirector",
          label: datas[1][j]["projectleader"],
        });
      }
      return opt2;
    },
    Eapproval(str) {
      API.Eapproval(str, (datas) => {
        let opt3 = [
          { label: "PO AP1", value: "PO AP1", children: [] },
          { label: "PO AP2", value: "PO AP2", children: [] },
          { label: "PO GW", value: "PO GW", children: [] },
        ];
        for (var i = 0; i < datas[0].length; i++) {
          opt3[0].children.push({
            value: datas[0][i]["po_ap_1"] + "_POAP1",
            label: datas[0][i]["po_ap_1"],
          });
        }
        for (var j = 0; j < datas[1].length; j++) {
          opt3[1].children.push({
            value: datas[1][j]["po_ap_2"] + "_POAP2",
            label: datas[1][j]["po_ap_2"],
          });
        }
        for (var k = 0; k < datas[2].length; k++) {
          opt3[2].children.push({
            value: datas[2][k]["po_gw_1"] + "_POGW",
            label: datas[2][k]["po_gw_1"],
          });
        }
        this.options3 = opt3;
      });
    },
    Payment(str) {
      API.Payment(str, (datas) => {
        let opt4 = [
          { label: "PO AP1", value: "PO AP1", children: [] },
          { label: "PO AP2", value: "PO AP2", children: [] },
          { label: "PO GW", value: "PO GW", children: [] },
          { label: "PO Check", value: "PO Check", children: [] },
        ];
        for (var i = 0; i < datas[0].length; i++) {
          opt4[0].children.push({
            value: datas[0][i]["po_ap_1"] + "_POAP1",
            label: datas[0][i]["po_ap_1"],
          });
        }
        for (var j = 0; j < datas[1].length; j++) {
          opt4[1].children.push({
            value: datas[1][j]["po_ap_2"] + "_POAP2",
            label: datas[1][j]["po_ap_2"],
          });
        }
        for (var k = 0; k < datas[2].length; k++) {
          opt4[2].children.push({
            value: datas[2][k]["po_ap_3"] + "_POGW",
            label: datas[2][k]["po_ap_3"],
          });
        }
        for (var l = 0; l < datas[3].length; l++) {
          opt4[3].children.push({
            value: datas[3][l]["po_gw_1"] + "_POCheck",
            label: datas[3][l]["po_gw_1"],
          });
        }
        this.options4 = opt4;
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
    value: async function () {
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
    },
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
  width: 1200px;
  .topbar {
    height: 80px;
    display: flex;
    justify-content: space-between;
    &-left {
      &-logo {
        width: 360px;
        height: 26px;
      }
      &-title {
        font-size: 22px;
        line-height: 50px;
        text-align: left;
        color: var(--light-blue);
      }
    }
    &-right {
      font-size: 18px;
      text-align: right;
      margin-top: -10px;
      &-office {
        margin-right: 10px;
      }
      &-searchbox {
        width: 422px;
      }
    }
  }
}

:deep(.el-input__inner) {
  font-size: 18px;
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
</style>
