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
        <div class="topbar-right-searchbox">
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
import TabComponent from "./components/Tabs.vue";
import API from "./data/api.js";
let load = false;

export default {
  name: "App",
  data: () => {
    return {
      options: [],
      value: "",
      options2: [],
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
        { label: "Team Leader", options: [] },
        { label: "Project Leader", options: [] },
      ];
      opt2[0].options = [];
      opt2[1].options = [];
      for (var i = 0; i < datas[0].length; i++) {
        opt2[0].options.push({
          value: datas[0][i]["teamleader"] + "_ProjectLeader",
          label: datas[0][i]["teamleader"],
        });
      }
      for (var j = 0; j < datas[1].length; j++) {
        opt2[1].options.push({
          value: datas[1][j]["projectleader"] + "_ProjectDirector",
          label: datas[1][j]["projectleader"],
        });
      }
      return opt2;
    },
    SearchHandler: async function () {
      console.log(this.data);
      let res = await API.Search({
        strname: this.searchStr,
        officelocation: this.value,
        optype: "view",
      });
      console.log(res);
    },
  },
  watch: {
    value: async function () {
      let opt2 = await this.Managers(this.value);
      this.options2 = opt2;
    },
  },
  mounted() {
    this.Offices();
  },
  provide: function () {
    return {
      office: () => this.value,
      options2: () => this.options2,
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
