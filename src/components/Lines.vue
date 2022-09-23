<template>
  <div class="rightcontainer-item">
    <div class="rightcontainer-item-left">
      <div class="rightcontainer-item-left-title">
        {{ this.title }}
      </div>
      <div class="rightcontainer-item-left-team">
        <!-- 2 icons -->
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
  </div>
</template>

<script>
export default {
  name: "TabLineComponent",
  inject: ["office"],
  data: () => {
    return {
      value: "",
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
      if (this.value !== "") {
        let [name, type] = this.value.split("_");
        console.log(type);
        window.open(
          `${this.links[type]}${name}&officeid=${this._office}`,
          "_blank"
        );
      }
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
