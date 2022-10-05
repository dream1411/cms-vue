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
      </div>
      <div class="card-toolbar">
      </div>
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
                tableData.imageBanner != null
                  ? checkImage(tableData.imageBanner)
                  : 'media/image/no-image.jpg'
              "
              @error="setAltImg"
              alt=""
            />
          </div>
        </template>
        <template v-slot:title="{ row: tableData }">
          {{ tableData.name1 ? tableData.name1 : " - " + tableData.name1 }}
          <br />
          {{ tableData.name2 ? tableData.name2 : " - " + tableData.name2 }}
        </template>
        <template v-slot:address="{ row: tableData }">
          {{ tableData.address }}
        </template>
        <template v-slot:updateDate="{ row: tableData }">
          <div class="badge badge-light fw-bold">
            {{ getTime(tableData.updateDate) }}
          </div>
        </template>
        <template v-slot:qrcode="{ row: tableData }">
          <img
            :src="
              'https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=' +
              tableData.id +
              '&choe=UTF-8'
            "
            alt=""
            height="80"
          /><br />
          <a
            :href="
              'https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=' +
              tableData.id +
              '&choe=UTF-8'
            "
            target="_blank"
            >ดาวน์โหลด QR Code</a
          >
        </template>

        <template v-slot:date="{ row: tableData }">
          {{ formatDateTime(tableData.createDate) }}
        </template>
        <template v-slot:updateBy="{ row: tableData }">
          {{ tableData.editBy }}
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
                  :to="'/contact/manage/' + tableData.id"
                  class="dropdown-item"
                  >แก้ไข</router-link
                >
              </li>
            </ul>
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";
import axios from "axios";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import { useRouter } from "vue-router";
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
const router = useRouter();

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
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
        columnName: "รูปภาพ",
        columnLabel: "image",
        sortEnabled: true,
      },
      {
        columnName: "หัวข้อ",
        columnLabel: "title",
        sortEnabled: true,
      },
      {
        columnName: "ที่อยู่",
        columnLabel: "address",
        sortEnabled: true,
      },
      {
        columnName: "อัปเดตข้อมูลล่าสุด",
        columnLabel: "updateDate",
        sortEnabled: true,
      },
      {
        columnName: "QR Code",
        columnLabel: "qrcode",
        className: "text-center",
        sortEnabled: true,
      },
      {
        columnName: "ผู้อัปเดต",
        columnLabel: "updateBy",
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

    const deleteFewTable = () => {
      selectedIds.value.forEach((item) => {
        deleteTable(item);
      });
      selectedIds.value.length = 0;
    };

    const deleteTable = (id) => {
      for (let i = 0; i < tableData.value.length; i++) {
      
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
    });
    const filter = () => {
      loading.value = true;
      getDataTable();
    };
    const getDataTable = () => {
      let groupId = localStorage.getItem("groupId");
      axios
        .get(process.env.VUE_APP_API_URL + "/getContact?groupId=" + groupId, {
          headers: { token: localStorage.getItem("id_token") },
        })
        .then((response) => {
          loading.value = false;
          console.log(response);
          let data: any = [];
          data.push(response.data.data);
          tableData.value = data;
          tableData.value["totalElements"] = tableData.value.length;
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
      deleteTable,
      search,
      searchItems,
      selectedIds,
      deleteFewTable,
      sort,
      onItemSelect,
      pageChange,
      perPageChange,
      filter,
      formData,
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
    getCategory(data) {
      let txt = "";
      for (let index = 0; index < data.categoryProfile.length; index++) {
        const loopCate = data.categoryProfile[index];
        if (index != data.categoryProfile.length - 1) {
          txt += loopCate + ", ";
        } else {
          txt += loopCate;
        }
      }
      return txt;
    },
  },
});
</script>
