<template>
  <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div
      class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
    >
      <KTPageTitle></KTPageTitle>
    </div>
  </div>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!-- {{ selectedIds }} -->
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
            data-bs-target="#kt_filter_modal"
          >
            <span class="svg-icon svg-icon-6 svg-icon-muted me-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            ตัวกรอง
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
            >รายการ
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFewCustomers()"
          >
            ลบสมาชิก
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
            >รายการ
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            ลบสมาชิก
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
        @page-change="pageChange"
        @perpage-change="perPageChange"
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
                    ? checkImage(tableData.imageProfile)
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
        </template>
      </Datatable>
    </div>
  </div>
  <div class="modal fade" id="kt_filter_modal" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">ตัวกรอง</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_filter_modal_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <!--begin::Form-->
          <el-form @submit.prevent="filter()" :model="formData">
            <!--begin::Input group-->
            <div class="fv-row mb-10">
              <!--begin::Label-->
              <label class="fs-5 fw-semobold form-label mb-5"
                >วันที่สร้างเริ่มต้น - สิ้นสุด:</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="name">
                <el-date-picker
                  type="daterange"
                  v-model="formData.dateRange"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
                >
                </el-date-picker>
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="fv-row mb-10">
              <!--begin::Label-->
              <label class="fs-5 fw-semobold form-label mb-5"
                >สิทธิการใช้งาน:</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <select class="form-control" v-model="formData.role">
                <option value="1" key="admin" label="admin" />
                <option value="2" key="user" label="user" />
              </select>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="reset"
                data-bs-dismiss="modal"
                class="btn btn-light me-3"
              >
                ปิด
              </button>
              <!--begin::Button-->
              <button
                :data-kt-indicator="loading ? 'on' : null"
                type="submit"
                class="btn btn-lg btn-primary"
              >
                <span v-if="!loading" class="indicator-label">
                  ค้นหา
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span v-if="loading" class="indicator-progress">
                  กรุณารอสักครู่...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <!--end::Button-->
            </div>
            <!--end::Actions-->
          </el-form>
          <!--end::Form-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- <ExportCustomerModal></ExportCustomerModal> -->
  <!-- <AddCustomerModal></AddCustomerModal> -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { Sort } from "@/components/kt-datatable//table-partials/models";
// import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
// import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import arraySort from "array-sort";
import axios from "axios";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import jQuery from "jquery";
const $ = jQuery;
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import router from "@/router";
export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    // ExportCustomerModal,
    // AddCustomerModal,
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
    const pages = ref();
     const perpages = ref();
    const tableData = ref([]);
    const initCustomers = ref([]);

    onMounted(() => {
      /* eslint-disable */
      getDataTable();
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
        if (tableData.value[i]["id"] === id) {
          axios
            .delete(process.env.VUE_APP_API_URL + "/deleteUser?id=" + id, {
              headers: { token: localStorage.getItem("id_token") },
            })
            .then((res) => {
              tableData.value.splice(i, 1);
              store.dispatch(Actions.CLEARCACHE);
            })
            .catch((error) => {});
        }
      }
    };
    const search = ref<string>("");
    const searchItems = () => {
      if (search.value !== "") {
        console.log(search.value);
         getDataTable();
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
    const pageChange = (page: number) => {
      pages.value = page;
      getDataTable();
    };
    const perPageChange = (perpage: number) => {
      perpages.value = perpage;
      getDataTable();
    };
    const loading = ref<boolean>(false);
    const formData = ref({
      dateRange: [],
      role: "",
    });
    const filter = () => {
      loading.value = true;
      getDataTable();
    };
    const getDataTable = () => {
      let sizeContents = 25;
      let keyWord = "";
      let page = 0;
      let startDate = "";
      let endDate = "";
      let role = "";
      if (pages.value != undefined) {
        page = pages.value-1
      }
      if (perpages.value != undefined) {
        sizeContents = perpages.value
      }
        if (search.value != undefined) {
        keyWord = search.value
      }
      if (
        formData.value.dateRange != null &&
        formData.value.dateRange.length > 0
      ) {
        startDate = new Date(formData.value.dateRange[0]).getTime() + "";
        endDate = new Date(formData.value.dateRange[1]).getTime() + "";
      }
      const response = axios
        .get(
          process.env.VUE_APP_API_URL +
            "/getUserAll?sizeContents=" +
            sizeContents +
            "&page=" +
            page +
            "&role=" +
            "&startDate=" +
            startDate +
            "&endDate=" +
            endDate +
            "&role=" +
            formData.value.role +
            "&keyWord=" + keyWord,
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then((response) => {
          loading.value = false;
          tableData.value = response.data.data.content;
          tableData.value["totalElements"] = response.data.data.totalElements;
          initCustomers.value.splice(
            0,
            tableData.value.length,
            ...tableData.value
          );
        })
        .catch((error) => {
          console.log(error);
          router.push({ name: "sign-in" });
        });
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
      pageChange,
      perPageChange,
      formData,
      filter,
      loading,
    };
  },
  methods: {
    checkImage(imageProfile) {
      if (imageProfile.indexOf("http") > -1) {
        return imageProfile;
      } else {
        return this.imageUrl + imageProfile;
      }
    },
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
    modalClose() {
      $("#kt_filter_modal_close").modal("hide");
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
<style scoped>
.el-date-editor--daterange.el-input__inner {
  width: 100%;
}
</style>
