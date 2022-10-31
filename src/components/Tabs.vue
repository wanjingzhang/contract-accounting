<template>
  <div class="TabBox">
    <div class="Tabs">
      <div class="leftpanel">
        <div
          v-for="(value, i) in menus"
          :class="'item ' + (id == i ? 'active' : '')"
          :key="i"
          @click="changeId(i)"
        >
          <div :ref="'ball' + i" class="item-ball abLT"></div>
          <span class="item-capital">{{ value.charAt(0) }}</span>
          <span class="item-tail">{{ value.substring(1, value.length) }}</span>
        </div>
      </div>
      <div class="rightcontainer">
        <!-- 1. Editing -->
        <div v-show="id === 0" class="rightcontainer-box">
          <!-- Tab 1-1 import project list -->
          <TabLineComponent
            title="XXXXXXX"
            type="cascader"
            animation="0"
            :options="this._options7"
            :links="{
              Office: '',
              RemindList: '',
              SupplierList: '',
              GoList: '',
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
            @syncList="receive"
          />
          <!-- Tab 1-2 updating the project info -->
          <TabLineComponent
            ref="imported"
            title="XXXXXXX"
            type="cascaderlazy"
            animation="1"
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
              ProjectAdministrator: '',
              POCheck: '',
              PORegist: '',
              Taipei: '',
              CHN: '',
              ApplyPayment: '',
              CSProject: '',
              ZSJ: '',
            }"
          />
          <!-- Tab 1-3 Forecast -->
          <TabLineComponent
            title="Forecast"
            type="Forecast"
            animation="2"
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
              ProjectAdministrator: '',
              POCheck: '',
              PORegist: '',
              Taipei: '',
              CHN: '',
              ApplyPayment: '',
              CSProject: '',
              ZSJ: '',
            }"
          />
          <!-- Tab 1-3 Forecast (HK+GZ+SZ team) -->
          <TabLineComponent
            v-if="
              this._office === 'Guangzhou' ||
              this._office === 'Shenzhen' ||
              this._office === 'HongKong'
            "
            title="Forecast (HK+GZ+SZ team)"
            type="options"
            animation="3"
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
              ProjectAdministrator: '',
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
        <div v-show="id === 1" class="rightcontainer-box">
          <!-- Tab 2-1 -->
          <TabLineComponent
            title="Overdue Invoice Issuance"
            type="options"
            animation="0"
            :options="this._options2"
            :links="{
              Office:
                'https://kc.test.com/invoiceaspx/forecast_1.aspx?officeid=',
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
            animation="1"
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
            animation="2"
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
            animation="0"
            :options="this._options2"
            :links="{
              Office:
                'https://kc.test.com/invoiceaspx/pcaccount.aspx?officeid=',
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
            animation="1"
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
            animation="2"
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
          <!-- Tab 1-1 -->
          <TabLineComponent
            title="Contract Accounting with Client Status"
            type="options"
            animation="0"
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
            animation="1"
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
            animation="2"
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
            animation="3"
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
        <div v-show="id === 4" class="rightcontainer-box">
          <!-- Tab 4-1 -->
          <TabLineComponent
            title="PO approval list"
            type="options"
            animation="0"
            :options="this._options3"
            :links="{
              Office: '',
              TeamInfo: '',
              ProjectLeader:
                'https://kc.test.com/invoiceaspx/po_approve_combine/po_ap_1.aspx?person=',
              ProjectDirector:
                'https://kc.test.com/invoiceaspx/po_approve_combine/po_ap_2.aspx?person=',
              ProjectAdministrator:
                'https://kc.test.com/invoiceaspx/po_approve_combine/po_gw.aspx?person=',
              RemindList: '',
              SupplierList: '',
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
            animation="1"
            :options="this._options4"
            :links="{
              Office: '',
              TeamInfo: '',
              ProjectLeader: '',
              ProjectDirector: '',
              RemindList: '',
              SupplierList: '',
              Level1:
                'https://kc.test.com/invoiceaspx/po_approve_combine/po_rq_1.aspx?person=',
              Level2:
                'https://kc.test.com/invoiceaspx/po_approve_combine/po_rq_2.aspx?person=',
              Level3:
                'https://kc.test.com/invoiceaspx/po_approve_combine/po_rq_3.aspx?person=',
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
            animation="2"
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
    "options7",
  ],
  data: () => {
    return {
      visible: false,
      id: 0,
      value2: "",
      menus: [
        "Editing",
        "Reminder",
        "Check List",
        "Reporting",
        "E-approval",
        "Advanced Search",
      ],
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
    _options7() {
      return this.options7();
    },
  },
  methods: {
    // 接受新的office
    updated(city) {
      this.$refs.imported.updated(city);
    },
    // 接受新插入的项目
    receive(name) {
      console.log("p[" + name);
      this.$refs.imported.importedName(name);
    },
    changeId(newId) {
      if (newId !== this.id) {
        this.id = newId;
      }

      if (newId == 5) {
        console.log(newId);
        window.open(
          `https://kcapp.test.com/invoiceaspx/Pro_Finance/default_1.aspx?officeid=${this._office}`,
          "_blank"
        );
      }
    },
  },
  components: {
    TabLineComponent,
  },
};
</script>

<style lang="less" scoped>
.TabBox {
  margin: 0 auto;
  height: 430px;
  width: 800px;

  .Tabs {
    margin: 20px auto;

    .leftpanel {
      width: 210px;
      float: left;
      .item {
        font-size: 28px;
        font-weight: 600;
        position: relative;
        text-align: left;
        height: 60px;
        &-capital {
          color: #ff671f;
          cursor: pointer;
          transition: color 0.2s;
        }
        &-tail {
          color: var(--black);
          font-size: 20px;
          cursor: pointer;
          user-select: none;
        }
        &-ball {
          left: -10px;
          top: -2px;
          background-color: var(--white);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          z-index: -1;
          transition: all 5s;
        }

        &.active {
          .item-capital {
            color: var(--white);
          }
          .item-ball {
            animation: changeStatus 0.4s forwards ease-out;
          }
        }
      }
    }

    .rightcontainer {
      width: 590px;
      float: left;
    }
    .SearchBox {
      right: 24px;
      bottom: -60px;
    }
  }
}
</style>
