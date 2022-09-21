<template>
  <div class="rightcontainer-item">
    <div class="rightcontainer-item-left">
      <div class="rightcontainer-item-left-title">
        {{ this.title }}
      </div>
      <div class="rightcontainer-item-left-team">
        Team <i class="el-icon-warning-outline"></i>
      </div>
    </div>
    <div v-if="options.length" class="rightcontainer-item-right">
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
      <el-button class="gobtn" @click="drawer = true" type="info">Go</el-button>
    </div>
    <div v-else-if="supplies.length" class="rightcontainer-item-right">
      {{ this._office }}
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
    };
  },
  props: {
    title: String,
    links: String,
    options: Array,
    supplies: Array,
  },
  computed: {
    _office() {
      return this.office();
    },
  },
  mounted() {
    console.log(this.office); // undefined
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
    }
  }
  &-right {
    display: flex;
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
