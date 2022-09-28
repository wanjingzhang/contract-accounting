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
        <el-tooltip
          effect="dark"
          content="(for project admin/ project account only)"
          placement="bottom"
          ><div class="leftpanel-item-editing">
            <i class="el-icon-edit"></i> Editing
          </div>
        </el-tooltip>
        <i
          class="el-icon-plus"
          style="color: #2c3e50"
          @click.stop="EditInfo"
        ></i>
      </div>
    </div>
    <div class="rightcontainer">
      <div v-show="id === 0" class="rightcontainer-box">
        <!-- Tab 1-1 -->
        <TabLineComponent
          title="Contract Accounting with Client Status"
          type="options"
          :options="this._options2"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/project_account_status.aspx?officeid=',
            TeamInfo:
              'https://kc.test.com/invoiceaspx/project_account_status_teaminfo.aspx?teaminfo=',
            ProjectLeader:
              'https://kc.test.com/invoiceaspx/project_account_status_byteam.aspx?teamleader=',
            ProjectDirector:
              'https://kc.test.com/invoiceaspx/project_account_status_bydirector.aspx?director=',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 1-2 -->
        <TabLineComponent
          title="Contract Accounting with Client/ Vendors Status"
          type="options"
          :options="this._options2"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/Total_OS_ViewbyOffice_1.aspx?officeid=',
            TeamInfo:
              'https://kc.test.com/invoiceaspx/Total_OS_ViewbyOffice_teaminfo.aspx?teaminfo=',
            ProjectLeader:
              'https://kc.test.com/invoiceaspx/Total_OS_ViewbyOffice_byteam.aspx?teamleader=',
            ProjectDirector:
              'https://kc.test.com/invoiceaspx/Total_OS_ViewbyOffice_bydirector.aspx?director=',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 1-3 -->
        <TabLineComponent
          title="Outstanding Accounts Receivable (AR)"
          type="options"
          :options="this._options2"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/Summary_receivebyprojno_1.aspx?officeid=',
            TeamInfo:
              'https://kc.test.com/invoiceaspx/Summary_receivebyprojno_teaminfo.aspx?teaminfo=',
            ProjectLeader:
              'https://kc.test.com/invoiceaspx/Summary_receivebyprojnobyteam.aspx?teamleader=',
            ProjectDirector:
              'https://kc.test.com/invoiceaspx/Summary_receivebyprojnobydirector.aspx?director=',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />

        <!-- Tab 1-4 -->
        <TabLineComponent
          title="Client Aging"
          type="options"
          :options="this._options2"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/ClientAgingReport_byOffice_1.aspx?officeid=',
            TeamInfo:
              'https://kc.test.com/invoiceaspx/Teaminfo_aging_global.aspx?teaminfo=',
            ProjectLeader:
              'https://kc.test.com/invoiceaspx/ClientAgingReport_byteam.aspx?teamleader=',
            ProjectDirector:
              'https://kc.test.com/invoiceaspx/ClientAgingReport_bydirector.aspx?director=',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 5 forecast 预测 暂时不要 -->
      </div>
      <div v-show="id === 1" class="rightcontainer-box">
        <!-- Tab 2-1 -->
        <TabLineComponent
          title="Overdue Invoice Issuance"
          type="options"
          :options="this._options2"
          :links="{
            Office: 'https://kc.test.com/invoiceaspx/forecast_1.aspx?officeid=',
            TeamInfo:
              'https://kc.test.com/invoiceaspx/forecast_teaminfo.aspx?teaminfo=',
            ProjectLeader:
              'https://kc.test.com/invoiceaspx/forecastteam_1.aspx?teamleader=',
            ProjectDirector:
              'https://kc.test.com/invoiceaspx/forecastdirector_1.aspx?director=',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 2-2 -->
        <TabLineComponent
          title="Overdue Accounts Receivable (AR) "
          type="options"
          :options="this._options2"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/OSreceive_1.aspx?officeid=',
            TeamInfo:
              'https://kc.test.com/invoiceaspx/OSreceive_teaminfo.aspx?teaminfo=',
            ProjectLeader:
              'https://kc.test.com/invoiceaspx/OSreceiveteam_1.aspx?teamleader=',
            ProjectDirector:
              'https://kc.test.com/invoiceaspx/OSreceivedirector_1.aspx?director=',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 2-3 -->
        <TabLineComponent
          title="Overdue Contract Financial Status Report"
          type="supplies"
          :options="this._options2"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/overdue_report_sin.aspx?officeid=',
            RemindList:
              'https://kc.test.com/invoiceaspx/t_remind_office.aspx?officeid=',
            SupplierList:
              'https://kc.test.com/invoiceaspx/Supplierlist.aspx?officeid=',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
      </div>
      <div v-show="id === 2" class="rightcontainer-box">
        <!-- Tab 3-1 -->
        <TabLineComponent
          title="Invoice scheduling Check List"
          type="options"
          :options="this._options2"
          :links="{
            Office: 'https://kc.test.com/invoiceaspx/pcaccount.aspx?officeid=',
            TeamInfo:
              'https://kc.test.com/invoiceaspx/PCAccount_teaminfo.aspx?teaminfo=',
            ProjectLeader:
              'https://kc.test.com/invoiceaspx/pcaccount_byteam.aspx?teamleader=',
            ProjectDirector:
              'https://kc.test.com/invoiceaspx/pcaccount_bydirector.aspx?director=',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 3-2 -->
        <TabLineComponent
          title="Refundable Deposits"
          type="blank"
          :options="this._options2"
          :links="{
            Office: 'https://kc.test.com/invoiceaspx/deposit.aspx?officeid=',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 3-3 -->
        <TabLineComponent
          title="No transaction record projects"
          type="blank"
          :options="this._options2"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/notransaction_project.aspx?officeid=',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
      </div>
      <div v-show="id === 3" class="rightcontainer-box">
        <!-- Tab 4-1 -->
        <TabLineComponent
          title="PO approval list"
          type="options"
          :options="this._options3"
          :links="{
            Office: '',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            POAP1:
              'https://kc.test.com/invoiceaspx/po_approve_combine/po_ap_1.aspx?person=',
            POAP2:
              'https://kc.test.com/invoiceaspx/po_approve_combine/po_ap_2.aspx?person=',
            POGW: 'https://kc.test.com/invoiceaspx/po_approve_combine/po_gw.aspx?person=',
            PORegist:
              'https://kc.test.com/invoiceaspx/po_approve_combine/po_register.aspx?officeid=',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 4-2 -->
        <TabLineComponent
          title="Payment request approval list"
          type="options"
          :options="this._options4"
          :links="{
            Office: '',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            POAP1:
              'https://kc.test.com/invoiceaspx/po_approve_combine/po_rq_1.aspx?person=',
            POAP2:
              'https://kc.test.com/invoiceaspx/po_approve_combine/po_rq_2.aspx?person=',
            POGW: 'https://kc.test.com/invoiceaspx/po_approve_combine/po_rq_3.aspx?person=',
            POCheck: '',
            PORegist: '',
            Taipei:
              'https://kc.test.com/invoiceaspx/po_approve_tp/po_rq_2_forpay.aspx?officeid=',
            CHN: 'https://kc.test.com/invoiceaspx/po_approve_combine/po_rq_3_forpay.aspx?officeid=',
            ApplyPayment:
              'https://kc.test.com/invoiceaspx/supplierpo_uploaded_applypayment.aspx?officeid=',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <!-- Tab 4-3 -->
        <TabLineComponent
          title="Supplier uploaded check"
          type="options"
          :options="this._options42"
          :links="{
            Office: '',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            PORegist: '',
            POCheck:
              'https://kc.test.com/invoiceaspx/supplierpo_uploaded_check.aspx?gw=',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
      </div>
      <div v-show="id === 4" class="rightcontainer-box">
        <!-- Tab 4-1 updating the project info -->
        <TabLineComponent
          title="Contract Accounting Document"
          type="search"
          :options="[]"
          :links="{
            Office: '',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            POAP1: '',
            POAP2: '',
            POGW: '',
            POCheck: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <TabLineComponent
          title="Forecast"
          type="options"
          :options="this._options5"
          :links="{
            Office:
              'https://kc.test.com/invoiceaspx/MonthlyForecast/Mostlikely_byoffice.aspx?officeid=',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            POAP1: '',
            POAP2: '',
            POGW: '',
            POCheck: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: '',
            ZSJ: '',
          }"
        />
        <TabLineComponent
          title="Forecast (HK+GZ+SZ team)"
          type="options"
          :options="this._options6"
          :links="{
            Office: '',
            TeamInfo: '',
            ProjectLeader: '',
            ProjectDirector: '',
            RemindList: '',
            SupplierList: '',
            POAP1: '',
            POAP2: '',
            POGW: '',
            POCheck: '',
            PORegist: '',
            Taipei: '',
            CHN: '',
            ApplyPayment: '',
            CSProject: 'https://kc.test.com/invoiceaspx/cs_project_list.aspx',
            ZSJ: 'https://kc.test.com/invoiceaspx/MonthlyForecast/Globalproject_byteaminfo_Down.aspx?itype=teaminfo&iname=',
          }"
        />
      </div>
      <div class="SearchBox abRB">
        <el-link
          :href="`https://kc.test.com/invoiceaspx/Pro_Finance/default_1.aspx?officeid=${this._office}`"
          target="_blank"
          ><el-button type="primary" plain>Advanced search</el-button></el-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import TabLineComponent from "./Lines.vue";
export default {
  name: "TabComponent",
  inject: [
    "office",
    "options2",
    "options3",
    "options4",
    "options42",
    "options5",
    "options6",
  ],
  data: () => {
    return {
      visible: false,
      id: 0,
      value2: "",
    };
  },
  computed: {
    _office() {
      return this.office();
    },
    _options2() {
      return this.options2();
    },
    _options3() {
      return this.options3();
    },
    _options42() {
      return this.options42();
    },
    _options4() {
      return this.options4();
    },
    _options5() {
      return this.options5();
    },
    _options6() {
      return this.options6();
    },
  },
  methods: {
    changeId(newId) {
      if (newId !== this.id) {
        this.id = newId;
      }
    },
    EditInfo: function () {
      window.open(
        `https://kc.test.com/invoiceaspx/Import_Newsflash_from_marketing.aspx?officeid=${this._office}`,
        "_blank"
      );
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
      &:hover {
        background-color: #fff;
        color: var(--light-blue);
      }
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
      &-editing {
        display: inline-block;
      }
    }
  }
  .rightcontainer {
    flex: 0;
    position: relative;
    &-box {
      padding: 20px 0;
    }
  }
  .SearchBox {
    right: 24px;
    bottom: -60px;
  }
}
</style>
