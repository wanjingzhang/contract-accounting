<template>
  <div id="app">
    <div class="topbar">
      <div class="topbar-left">
        <img class="topbar-left-logo" alt="Vue logo" src="./assets/logo.svg" />
        <div class="topbar-left-title">Contract Accounting</div>
      </div>
      <div class="topbar-right">
        <div class="topbar-right-office">
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
            v-model="input3"
            class="searchinput"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <TabComponent />
  </div>
</template>

<script>
import TabComponent from "./components/Tabs.vue";

export default {
  name: "App",
  data: () => {
    return {
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
      ],
      value: "a",
      input3: "",
    };
  },
  provide: function () {
    return {
      office: () => this.value,
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
  max-width: 1200px;
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
