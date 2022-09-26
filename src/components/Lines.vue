<template>
  <div class="rightcontainer-item">
    <div class="rightcontainer-item-left">
      <div class="rightcontainer-item-left-title">
        {{ this.title }}
      </div>
      <div class="rightcontainer-item-left-team">
        <!-- 3 icons -->
        <!-- 1. Office -->
        <el-tooltip
          v-if="links.Office !== ''"
          class="item"
          effect="dark"
          content="Office"
          placement="bottom"
        >
          <el-link
            :href="`${links.Office}${this._office}`"
            target="_blank"
            type="primary"
            ><i
              v-if="links.Office !== ''"
              class="el-icon-office-building"
              alt="Office"
            ></i>
          </el-link>
        </el-tooltip>
        <!-- 2. Teams -->
        <el-tooltip
          v-if="links.Teams !== ''"
          class="item"
          effect="dark"
          content="Teams"
          placement="bottom"
        >
          <el-link
            :href="`${links.Teams}${this._office}&teaminfo=${this._office}%20Team%201`"
            target="_blank"
            type="primary"
          >
            <i class="el-icon-user" alt="Teams"></i>
          </el-link>
        </el-tooltip>
        <!-- 3. PO Regist -->
        <el-tooltip
          v-if="links.PORegist !== ''"
          class="item"
          effect="dark"
          content="PO register(Accs only)"
          placement="bottom"
        >
          <el-link
            :href="`${links.PORegist}${this._office}`"
            target="_blank"
            type="primary"
          >
            <i class="el-icon-view" alt="PO register(Accs only)"></i>
          </el-link>
        </el-tooltip>
        <!-- 4. Taipei -->
        <el-tooltip
          v-if="
            links.Taipei !== '' &&
            this.TaipeiIndiaPay.indexOf(this._office) > -1
          "
          class="item"
          effect="dark"
          content="Taipei/India Pay"
          placement="bottom"
        >
          <el-link
            :href="`${links.Taipei}${this._office}`"
            target="_blank"
            type="primary"
          >
            <i class="el-icon-magic-stick" alt="Taipei/India Pay"></i>
          </el-link>
        </el-tooltip>
        <!-- 5. CHN(HK) Pay -->
        <el-tooltip
          v-if="links.CHN !== '' && this.CNHK.indexOf(this._office) > -1"
          class="item"
          effect="dark"
          content="CHN(HK) Pay"
          placement="bottom"
        >
          <el-link
            :href="`${links.CHN}${this._office}`"
            target="_blank"
            type="primary"
          >
            <i class="el-icon-help" alt="CHN(HK) Pay"></i>
          </el-link>
        </el-tooltip>
        <!-- 6. Apply payment -->
        <el-tooltip
          v-if="
            links.ApplyPayment !== '' &&
            this.ApplyPay.indexOf(this._office) > -1
          "
          class="item"
          effect="dark"
          content="Apply payment"
          placement="bottom"
        >
          <el-link
            :href="`${links.ApplyPayment}${this._office}`"
            target="_blank"
            type="primary"
          >
            <i class="el-icon-finished" alt="Apply payment"></i>
          </el-link>
        </el-tooltip>
        <!-- 7. CS Project Info -->
        <el-tooltip
          v-if="links.CSProject !== ''"
          class="item"
          effect="dark"
          content="CS Project Info"
          placement="bottom"
        >
          <el-link :href="`${links.CSProject}`" target="_blank" type="primary">
            <i class="el-icon-finished" alt="CS Project Info"></i>
          </el-link>
        </el-tooltip>
      </div>
    </div>
    <!-- 1. 带有选项的右侧 -->
    <div v-if="type === 'options'" class="rightcontainer-item-right">
      <el-select class="goSelect" v-model="value" placeholder="Select">
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-option-group>
      </el-select>
      <el-button class="gobtn" @click="Goto" type="info">Go</el-button>
    </div>
    <!-- 2. 带有链接的右侧 -->
    <div v-else-if="type === 'supplies'" class="rightcontainer-item-right2">
      <el-link
        v-if="links.RemindList !== ''"
        type="primary"
        :href="`${links.RemindList}${this._office}`"
        target="_blank"
        >Remind list</el-link
      >
      <el-link
        v-if="links.SupplierList !== ''"
        type="primary"
        :href="`${links.SupplierList}${this._office}`"
        target="_blank"
        >Supplier List</el-link
      >
    </div>
    <!-- 3. 空白的右侧 -->
    <div v-else-if="type === 'blank'" class="rightcontainer-item-right3"></div>
    <!-- 4. 带有搜索的右侧 -->
    <div v-else-if="type === 'search'" class="rightcontainer-item-right4">
      <div class="topbar-right-searchbox" title="Update Project Info">
        <el-input
          placeholder="Project name or no."
          v-model="searchStr"
          class="searchinput"
        >
          <el-button
            slot="append"
            icon="el-icon-edit-outline"
            type="info"
            @click="SearchHandler"
          ></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabLineComponent",
  inject: ["office"],
  data: () => {
    return {
      value: "",
      TaipeiIndiaPay: ["Taipei", "Delhi", "Bangalore", "Mumbai", "Hyderabad"],
      CNHK: [
        "Beijing",
        "Chengdu",
        "Guangzhou",
        "Hangzhou",
        "Shanghai",
        "Shenzhen",
        "HongKong",
        "Singapore",
        "Taipei",
      ],
      ApplyPay: ["Taipei"],
      searchStr: "",
    };
  },
  props: {
    title: String,
    links: Object,
    type: String, // options,supplies
    options: Array,
    supplies: Array,
  },
  computed: {
    _office() {
      return this.office();
    },
  },
  watch: {
    _office() {
      this.value = "";
    },
  },
  methods: {
    Goto() {
      // 确定name,type 然后跳转相应的链接
      if (this.value !== "" && this.value.indexOf("https:") < 0) {
        let [name, type] = this.value.split("_");
        let url = `${this.links[type]}${name}&officeid=${this._office}`;
        window.open(url, "_blank");
      } else {
        let url = `${this.value}`;
        window.open(url, "_blank");
      }
    },
    SearchHandler() {
      window.open(
        `https://kc.test.com/invoiceaspx/projectsearchget.aspx?officelocation=${this._office}&optype=operate&strname=${this.searchStr}`,
        "_blank"
      );
    },
  },
};
</script>
<style scoped lang="less">
.rightcontainer-item {
  width: 886px;
  margin: 0 80px;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  padding: 20px 0 10px;
  box-sizing: border-box;
  &-left {
    text-align: left;
    font-size: 18px;
    &-team {
      color: var(--light-blue);
      line-height: 22px;
      i {
        margin: 4px 4px 0;
      }
    }
  }
  &-right {
    display: flex;
  }
  &-right2 {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
  &-right4 {
    .searchinput {
      :deep(.el-input-group__append) {
        background: #909399;
        color: #ffffff;
      }
      width: 322px;
    }
  }
}

.goSelect {
  :deep(.el-input__inner) {
    border-radius: 4px 0 0 4px;
  }
}
.gobtn {
  height: 40px;
  margin-left: -4px;
}
</style>
