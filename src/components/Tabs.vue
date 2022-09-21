<template>
  <div class="Tabs">
    <div class="leftpanel">
      <div
        :class="(id === 0 ? 'active ' : '') + 'leftpanel-item'"
        @click="changeId(0)"
      >
        <i class="el-icon-message"></i> Reporting
      </div>
      <div
        :class="(id === 1 ? 'active ' : '') + 'leftpanel-item'"
        @click="changeId(1)"
      >
        <i class="el-icon-magic-stick"></i> Reminder
      </div>
      <div
        :class="(id === 2 ? 'active ' : '') + 'leftpanel-item'"
        @click="changeId(2)"
      >
        <i class="el-icon-notebook-2"></i> Check List
      </div>
      <div
        :class="(id === 3 ? 'active ' : '') + 'leftpanel-item'"
        @click="changeId(3)"
      >
        <i class="el-icon-finished"></i> E-approval
      </div>
      <div
        :class="(id === 4 ? 'active ' : '') + 'leftpanel-item'"
        @click="changeId(4)"
      >
        <i class="el-icon-edit"></i> Editing
      </div>
    </div>
    <div class="rightcontainer">
      <div v-show="id === 0" class="rightcontainer-box">
        <TabLineComponent
          title="Contract Accounting with Client Status"
          :options="options2"
        />
        <TabLineComponent
          title="Contract Accounting with Client/ Vendors Status"
          :options="options2"
        />
        <TabLineComponent
          title="Outstanding Accounts Receivable (AR)"
          :options="options2"
        />
        <TabLineComponent title="Client Aging" :options="options2" />
      </div>
      <div v-show="id === 1" class="rightcontainer-box">
        <TabLineComponent
          title="Overdue Invoice Issuance"
          :options="options2"
        />
        <TabLineComponent
          title="Overdue Accounts Receivable (AR) "
          :options="options2"
        />
        <TabLineComponent
          title="Overdue Accounts Receivable (AR) "
          :options="[]"
          :supplies="['', '']"
        />
      </div>
      <div v-show="id === 2" class="rightcontainer-box">tab2</div>
      <div v-show="id === 3" class="rightcontainer-box">tab3</div>
      <div v-show="id === 4" class="rightcontainer-box">tab4</div>
    </div>
  </div>
</template>

<script>
import TabLineComponent from "./Lines.vue";
export default {
  name: "TabComponent",
  data: () => {
    return {
      visible: false,
      id: 0,
      options2: [
        {
          label: "Popular cities",
          options: [
            {
              value: "Shanghai",
              label: "Shanghai",
            },
            {
              value: "Beijing",
              label: "Beijing",
            },
          ],
        },
        {
          label: "City name",
          options: [
            {
              value: "Chengdu",
              label: "Chengdu",
            },
            {
              value: "Shenzhen",
              label: "Shenzhen",
            },
            {
              value: "Guangzhou",
              label: "Guangzhou",
            },
            {
              value: "Dalian",
              label: "Dalian",
            },
          ],
        },
      ],
      value2: "",
    };
  },
  methods: {
    changeId(newId) {
      if (newId !== this.id) {
        this.id = newId;
      }
    },
  },
  components: {
    TabLineComponent,
  },
};
</script>

<style lang="less" scoped>
.Tabs {
  margin-top: 60px;
  display: flex;
  background-color: #f8f8f8;
  .leftpanel {
    width: 180px;
    &-item {
      cursor: pointer;
      user-select: none;
      background-color: #f2f2f2;
      width: 180px;
      height: 80px;
      line-height: 80px;
      &.active {
        background-color: #ffffff;
        color: var(--light-blue);
      }
    }
  }
  .rightcontainer {
    flex: 0;
    &-box {
      padding: 20px 0;
    }
  }
}
</style>
