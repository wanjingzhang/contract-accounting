<template>
  <div :class="'rightcontainer-item animation' + this.animation">
    <div class="rightcontainer-item-left">
      <div v-if="this.title.length > 0" class="rightcontainer-item-left-title">
        {{ this.title }}
      </div>
      <div v-if="this.type == 'cascader'">
        <el-button
          class="rightcontainer-item-left-button"
          type="warning"
          plain
          @click="importProject"
          >Add</el-button
        >
      </div>
      <div v-if="this.type == 'cascaderlazy'">
        <el-button
          class="rightcontainer-item-left-button"
          type="warning"
          plain
          @click="projectDetail"
          >Search</el-button
        >
      </div>
      <div class="rightcontainer-item-left-team">
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
      <el-cascader
        class="goSelect"
        placeholder="Select"
        v-model="value"
        :options="options"
      ></el-cascader>

      <el-button class="gobtn" @click="Goto" type="info">Go</el-button>
    </div>
    <!-- 2. 带有链接的右侧 -->
    <div v-else-if="type === 'supplies'" class="rightcontainer-item-right2">
      <el-link
        v-if="links.RemindList !== ''"
        type="primary"
        :href="`${links.RemindList}${this._office}`"
        target="_blank"
        >Remind List</el-link
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
    <!-- 5. 级联搜索 -->
    <div v-else-if="type === 'cascader'" class="rightcontainer-item-right4">
      <el-cascader
        ref="cascader"
        :options="_optionsImported"
        placeholder="Searching by name or no."
        :props="{ checkStrictly: true }"
        v-model="selectedProjectNo"
        filterable
        clearable
        @change="close"
      ></el-cascader>
    </div>
    <!-- layzy load -->
    <div v-else-if="type === 'cascaderlazy'" class="rightcontainer-item-right4">
      <el-cascader
        ref="cascaderlazy"
        placeholder="Searching by name or no."
        :options="hasProjectList"
        v-model="hasProjectNo"
        filterable
        clearable
        @change="close2"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import API from "../data/api.js";
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
      selectedProjectNo: "",
      importedProjectList: [],
      hasProjectNo: "",
      hasProjectList: [],
    };
  },
  props: {
    title: String,
    links: Object,
    type: String, // options,supplies
    options: Array,
    supplies: Array,
    animation: String, // 动画
  },
  computed: {
    _office() {
      return this.office();
    },
    _optionsImported() {
      // 剔除已经import的数据再重绘
      let ary = this.options;
      let hasary = [],
        id = 0;
      for (let i in this.importedProjectList) {
        hasary = ary.filter((item, index) => {
          if (item.value == this.importedProjectList[i]) {
            id = index;
            return item;
          }
        });
        if (hasary.length > 0) {
          let obj = ary.splice(id, 1);
          console.log(obj);
        }
      }
      return ary;
    },
  },
  watch: {
    _office() {
      this.value = "";
    },
  },
  mounted() {
    if (this.type == "cascaderlazy") {
      setTimeout(() => {
        this.getImportedProject();
      }, 1000);
    }
  },
  methods: {
    getImportedProject() {
      API.ProjectList(this._office, (res) => {
        let name,
          filt = [];
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            let { projectname, projectno } = res[i];
            name = String(projectno).trim() + ":" + String(projectname).trim();
            filt = this.hasProjectList.filter((item) => item.value == name);

            // 是否存在，在现有列表里，
            if (filt.length === 0) {
              this.hasProjectList.push({ label: name, value: projectname });
            }
          }
        }
      });
    },
    close() {
      this.$refs.cascader.dropDownVisible = false; //监听值发生变化就关闭它
    },
    close2() {
      this.$refs.cascaderlazy.dropDownVisible = false; //监听值发生变化就关闭它
    },
    Goto: _.throttle(function () {
      // 确定name,type 然后跳转相应的链接
      if (this.value[1] !== "" && this.value[1].indexOf("https:") < 0) {
        let [name, type] = this.value[1].split("_");
        let url = `${this.links[type]}${name}&officeid=${this._office}`;
        window.open(url, "_blank");
      } else {
        let url = `${this.value[1]}`;
        window.open(url, "_blank");
      }
    }, 1000),
    SearchHandler: _.throttle(function () {
      window.open(
        `https://kc.test.com/invoiceaspx/projectsearchget.aspx?officelocation=${this._office}&optype=operate&strname=${this.searchStr}`,
        "_blank"
      );
    }, 1000),
    projectDetail: _.throttle(function () {
      if (this.hasProjectNo.length == 0) {
        this.$message.error("Please select a select project first.");
        return;
      } else {
        window.open(
          `https://kc.test.com/invoiceaspx/projectsearchget.aspx?officelocation=${this._office}&optype=view&strname=${this.hasProjectNo}`,
          "_blank"
        );
        this.hasProjectNo = "";
      }
    }),
    importProject: _.throttle(function () {
      // 获取选中的value， 导入id
      // console.log(this.selectedProjectNo);
      let str = this.selectedProjectNo[0];
      if (str == "" || str == undefined) {
        this.$message.error("Please select an import project first.");
        return;
      } else {
        this.selectedProjectNo = "";
        API.ImportProjectAction(str, (res) => {
          if (res.code == 200 && res.message != "-1") {
            this.importedProjectList.push(str);
            this.$message({
              message: "Imported successfully!",
            });
            let ary = this.options.filter((item) => {
              if (item.value == str) {
                return item;
              }
            });

            // 通知外部组件更新列表
            this.$emit("syncList", ary[0].label);
          }
        });
      }
    }),
    // 导入项目名称
    importedName(name) {
      console.log("come on");
      this.hasProjectList.unshift({ label: name, value: name.split(":")[1] });
    },
    // 更新city
    updated() {
      if (this.type == "cascaderlazy") {
        setTimeout(() => {
          this.hasProjectList = [];
          this.getImportedProject();
        }, 1000);
      }
    },
  },
};
</script>
<style scoped lang="less">
@keyframes move {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.animation0 {
  animation: move 0.5s forwards;
}
.animation1 {
  animation: move 0.5s forwards 0.1s;
}
.animation2 {
  animation: move 0.5s forwards 0.2s;
}
.animation3 {
  animation: move 0.5s forwards 0.3s;
}
.animation4 {
  animation: move 0.5s forwards 0.4s;
}
.animation5 {
  animation: move 0.5s forwards 0.5s;
}
.animation6 {
  animation: move 0.5s forwards 0.6s;
}
.rightcontainer-item {
  &:hover {
    background-color: rgba(255, 255, 255, 0.62);
  }
  opacity: 0;
  transform: translateX(100px);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  box-sizing: border-box;
  font-size: 16px;
  transition: background-color 0.5s linear;
  border-radius: 4px;
  margin: 2px 0;
  &-left {
    text-align: left;
    font-size: 16px;
    width: 240px;
    &-team {
      color: var(--light-orange);
      line-height: 22px;
      i {
        margin: 4px 4px 0;
      }
    }
    &-button {
      width: 140px;
    }
    &-title {
      user-select: none;
    }
  }
  &-right {
    .goSelect {
      width: 203px;
      :deep(.el-input) {
        input {
          height: 38px;
        }
      }
    }
    .gobtn {
      height: 38px;
      line-height: 38px;
      padding: 0 12px;
      font-size: 12px;
    }
  }
  &-right2 {
    display: flex;
    justify-content: space-between;
    width: 200px;
    :deep(.el-link) {
      font-size: 16px;
    }
  }
  &-right22 {
    display: flex;
    justify-content: right;
    width: 200px;
    :deep(.el-link) {
      font-size: 16px;
    }
  }
  &-right4 {
    .searchinput {
      :deep(input) {
        height: 38px;
      }
      :deep(.el-input-group__append) {
        background: #909399;
        color: #ffffff;
        padding: 0 12px;
      }
      height: 38px;
      width: 260px;
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
