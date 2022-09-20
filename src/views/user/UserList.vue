<template>
  <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div
      class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
    >
      <!--begin::Details-->
      <KTPageTitle />
      <!-- <div class="d-flex align-items-center flex-wrap mr-2">
									<h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Edit User</h5>
									<div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
									<div class="d-flex align-items-center" id="kt_subheader_search">
										<span class="text-dark-50 font-weight-bold" id="kt_subheader_total">Alex Stone</span>
									</div>
								</div> -->
      <!--end::Details-->
      <!--begin::Toolbar-->
      <!-- <div class="d-flex align-items-center">
									<a href="/metronic/demo1/#.html" class="btn btn-default font-weight-bold btn-sm px-3 font-size-base">Back</a>
									<div class="btn-group ml-2">
										<button type="button" class="btn btn-primary font-weight-bold btn-sm px-3 font-size-base">Save Changes</button>
										<button type="button" class="btn btn-primary font-weight-bold btn-sm px-3 font-size-base dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
										<div class="dropdown-menu dropdown-menu-sm p-0 m-0 dropdown-menu-right">
											<ul class="navi py-5">
												<li class="navi-item">
													<a href="#" class="navi-link">
														<span class="navi-icon">
															<i class="flaticon2-writing"></i>
														</span>
														<span class="navi-text">Save &amp; continue</span>
													</a>
												</li>
												<li class="navi-item">
													<a href="#" class="navi-link">
														<span class="navi-icon">
															<i class="flaticon2-medical-records"></i>
														</span>
														<span class="navi-text">Save &amp; add new</span>
													</a>
												</li>
												<li class="navi-item">
													<a href="#" class="navi-link">
														<span class="navi-icon">
															<i class="flaticon2-hourglass-1"></i>
														</span>
														<span class="navi-text">Save &amp; exit</span>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div> -->
      <!--end::Toolbar-->
    </div>
  </div>
  <div class="card">
    <div class="card-header border-0 pt-6">
      {{selectedIds}}
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="ค้นหาสมาชิก"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->
          <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
            </span>
            ดาวน์โหลด
          </button>
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="/users/create" class="btn btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            เพิ่มสมาชิก
          </router-link>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFewCustomers()"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        checkbox-label="id"
      >
        <template v-slot:userinfo="{ row: tableData }">
          <div class="d-flex">
            <div
              class="cursor-pointer symbol symbol-35px symbol-md-40px p-5"
              data-kt-menu-trigger="click"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              <img
                :src="
                  tableData.imageProfile != null
                    ? imageUrl + tableData.imageProfile
                    : 'media/avatars/blank.png'
                "
                @error="setAltImg"
                alt=""
              />
            </div>
            <div class="p-2">
              {{ tableData.firstName ? tableData.firstName : "ไม่พบข้อมูล" }}
              {{ tableData.lastName ? tableData.lastName : "ไม่พบข้อมูล"
              }}<br />
              {{ tableData.userName ? tableData.userName : "ไม่พบข้อมูล"
              }}<br />
              {{ tableData.email ? tableData.email : "ไม่พบข้อมูล" }}
            </div>
          </div>
        </template>
        <template v-slot:role="{ row: tableData }">
          {{ getRole(tableData) }}
        </template>
        <template v-slot:updateDate="{ row: tableData }">
          <div class="badge badge-light fw-bold">
            {{ getTime(tableData.updateDate) }}
          </div>
        </template>
        <!-- <template v-slot:lastName="{ row: tableData }">
          {{ tableData.lastName ? tableData.lastName : "ไม่พบข้อมูล"}}
        </template> -->
        <template v-slot:userName="{ row: tableData }">
          {{ tableData.userName ? tableData.userName : "ไม่พบข้อมูล" }}<br />{{
            tableData.email ? tableData.email : "ไม่พบข้อมูล"
          }}
          <!-- <img :src="tableData.payment.icon" class="w-35px me-3" alt="" />{{
            tableData.payment.ccnumber
          }} -->
        </template>
        <template v-slot:date="{ row: tableData }">
          {{ formatDateTime(tableData.createDate) }}
        </template>
        <template v-slot:status="{ row: tableData }">
          <div
            v-if="tableData.enable == true"
            class="badge badge-light-success fw-bold"
          >
            เปิดใช้งาน
          </div>
          <div v-else class="badge badge-light-danger fw-bold">ปิดใช้งาน</div>
        </template>
        <template v-slot:actions="{ row: tableData }">
          <!--begin::Accordion-->
          <div class="dropdown">
            <button
              class="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              :id="'dropdownMenuButton' + tableData.id"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              จัดการ
            </button>
            <ul
              class="dropdown-menu"
              :aria-labelledby="'dropdownMenuButton' + tableData.id"
            >
              <li>
                <router-link
                  :to="'/users/manage/' + tableData.id"
                  class="dropdown-item"
                  >แก้ไขสมาชิก</router-link
                >
              </li>
              <li>
                <a @click="deleteCustomer(tableData.id)" class="dropdown-item"
                  >ลบสมาชิก</a
                >
              </li>
            </ul>
          </div>
          <!--end::Accordion-->
          <!-- <a href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >Actions
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <div class="menu-item px-3">
              <router-link
                to="/apps/customers/customer-details"
                class="menu-link px-3"
                >View</router-link >
            </div>
       
            <div class="menu-item px-3">
                {{tableData.id}}
              <a @click="deleteCustomer(tableData.id)" class="menu-link px-3"
                >Delete</a
              >
            </div>
          </div> -->
        </template>
      </Datatable>
    </div>
  </div>

  <ExportCustomerModal></ExportCustomerModal>
  <AddCustomerModal></AddCustomerModal>
</template>

<script lang="ts">
import { MenuComponent } from "@/assets/ts/components";
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import arraySort from "array-sort";
import axios from "axios";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal,
    KTPageTitle,
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_API_URL_IMAGE,
    };
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "ผู้ใช้งาน",
        columnLabel: "userinfo",
        sortEnabled: true,
      },
      {
        columnName: "สิทธิการใช้งาน",
        columnLabel: "role",
        sortEnabled: true,
      },
      {
        columnName: "อัปเดตข้อมูลล่าสุด",
        columnLabel: "updateDate",
        sortEnabled: true,
      },
      // {
      //   columnName: "อีเมล/บัญขีผู้ใช้งาน",
      //   columnLabel: "userName",
      //   sortEnabled: true,
      //   columnWidth: 175,
      // },
      {
        columnName: "วันที่สร้าง",
        columnLabel: "date",
        sortEnabled: true,
      },
      {
        columnName: "สถานะ",
        columnLabel: "status",
        sortEnabled: true,
      },
      {
        columnName: "จัดการ",
        columnLabel: "actions",
        sortEnabled: false,
      },
    ]);
    const selectedIds = ref<Array<number>>([]);

    const tableData = ref([]);
    const initCustomers = ref([]);

    onMounted(() => {
      /* eslint-disable */
      const response = axios
        .get(
          process.env.VUE_APP_API_URL +
            "/getUserAll" +
            "?sizeContents=9999&page=0&role=",
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then((response) => {
          tableData.value = response.data.data.content;
          console.log(tableData);
          initCustomers.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        })
        .catch((error) => {
          console.log(error);
        });
      //   console.log(response["data"]["data"]["content"]);

      /* eslint-disable */
    });

    const deleteFewCustomers = () => {
      selectedIds.value.forEach((item) => {
        deleteCustomer(item);
      });
      selectedIds.value.length = 0;
    };

    const deleteCustomer = (id) => {
      for (let i = 0; i < tableData.value.length; i++) {
        // if (tableData.value[i].id === id) {
        //   tableData.value.splice(i, 1);
        // }
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

    const searchingFunc = (obj, value): boolean => {
      for (let key in obj) {
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          !(typeof obj[key] === "boolean")
        ) {
          if (obj[key] != null && obj[key] != undefined) {
            console.log(obj[key]);
            if (obj[key].indexOf(value) != -1) {
              return true;
            }
          }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
    };
  },
  methods: {
    formatDateTime(date) {
      const event = new Date(date);
      return event.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },

    getRole(role) {
      let returnText = "";
      if (role.superAdmin === true) {
        returnText = "ผู้ดูแลระบบ";
      } else {
        returnText = role.userType ? role.userType.name : "ผู้ใช้ทั่วไป";
      }
      return returnText;
    },
    getTime(date) {
      var startDate = new Date(date);
      var endDate = new Date();
      let difference = endDate.getTime() - startDate.getTime();
      console.log(difference);
      // let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      // console.log(TotalDays + " วัน");
      let time = Math.abs(difference);
      // Define humanTime and units
      var humanTime, units;

      // If there are years
      if (time > 1000 * 60 * 60 * 24 * 365) {
        humanTime = time / (1000 * 60 * 60 * 24 * 365);
        units = "ปีที่แล้ว";
      }

      // If there are months
      else if (time > 1000 * 60 * 60 * 24 * 30) {
        humanTime = time / (1000 * 60 * 60 * 24 * 30);
        units = "เดือนที่แล้ว";
      }

      // If there are weeks
      else if (time > 1000 * 60 * 60 * 24 * 7) {
        humanTime = time / (1000 * 60 * 60 * 24 * 7);
        units = "สัปดาห์ที่แล้ว";
      }

      // If there are days
      else if (time > 1000 * 60 * 60 * 24) {
        humanTime = time / (1000 * 60 * 60 * 24);
        units = "วันที่แล้ว";
      }

      // If there are hours
      else if (time > 1000 * 60 * 60) {
        humanTime = time / (1000 * 60 * 60);
        units = "ชั่วโมงที่แล้ว";
      }

      // If there are minutes
      else if (time > 1000 * 60) {
        humanTime = time / (1000 * 60);
        units = "นาทีที่แล้ว";
      }

      // Otherwise, use seconds
      else {
        humanTime = time / 1000;
        units = "วินาทีที่แล้ว";
      }

      return parseFloat(humanTime).toFixed(0) + " " + units;
    },
    setAltImg(event) {
      event.target.src = "media/avatars/blank.png";
    },
  },
});
</script>
