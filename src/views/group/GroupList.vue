<template>
  <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div
      class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
    >
      <KTPageTitle />
    </div>
  </div>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!-- {{ selectedIds }} -->
      <div class="card-title">
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
          <!-- <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
            </span>
            ดาวน์โหลด
          </button> -->
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link to="/group/create" class="btn btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            เพิ่มกลุ่ม
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
            ลบกลุ่ม
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
       <template v-slot:image="{ row: tableData }">
            <div
            class="cursor-pointer symbol w-100 h-auto p-5"
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
          >
            <img
              class="w-auto h-100px"
              :src="
                tableData.icon != null
                  ? checkImage(tableData.icon)
                  : 'media/image/no-image.jpg'
              "
              @error="setAltImg"
              alt=""
            />
          </div>
        </template>
        <template v-slot:nane="{ row: tableData }">
          {{ tableData.name  }}
        </template>
        <template v-slot:updateDate="{ row: tableData }">
          <div class="badge badge-light fw-bold">
            {{ getTime(tableData.updateDate) }}
          </div>
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
                  :to="'/group/manage/' + tableData.id"
                  class="dropdown-item"
                  >แก้ไข</router-link
                >
              </li>
              <li>
                <a @click="deleteCustomer(tableData.id)" class="dropdown-item"
                  >ลบ</a
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
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import arraySort from "array-sort";
import axios from "axios";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import store from "@/store";
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
        columnName: "ไอคอน",
        columnLabel: "image",
        sortEnabled: true,
      },
      {
        columnName: "ชื่อกลุ่ม",
        columnLabel: "nane",
        sortEnabled: true,
      },
      {
        columnName: "อัปเดตข้อมูลล่าสุด",
        columnLabel: "updateDate",
        sortEnabled: true,
      },
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
      const router = useRouter();
      const response = axios
        .get(
          process.env.VUE_APP_API_URL + "/getGroup"
          // {
          //   headers: { token: localStorage.getItem("id_token") },
          // }
        )
        .then((response) => {
          tableData.value = response.data.data;
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
        if (tableData.value[i]["id"] === id) {
          let formData = new FormData();
          formData.append("id", id);
          formData.append("name", "banner");
          axios
            .post(process.env.VUE_APP_API_URL + "/deletePost", formData, {
              headers: { token: localStorage.getItem("id_token") },
            })
            .then((res) => {
              tableData.value.splice(i, 1);
              store.dispatch(Actions.CLEARCACHE);
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        }
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
    checkImage(imageProfile) {
      console.log(imageProfile);
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
