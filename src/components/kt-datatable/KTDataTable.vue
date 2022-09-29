<template>
  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <TableContent
      @on-items-select="onItemSelect"
      @on-sort="onSort"
      :header="header"
      :data="dataToDisplay"
      :page="nowPage"
      :perpage="itemsInTable"
      :checkboxEnabled="checkboxEnabled"
      :checkboxLabel="checkboxLabel"
      :empty-table-text="emptyTableText"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :loading="loading"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
        <slot :name="name" :row="item" />
      </template>
    </TableContent>
    <TableFooter
      @page-change="pageChange"
      @perpage-change="perPageChange"
      :current-page="currentPage"
      v-model:itemsPerPage="itemsInTable"
      :count="totalItems"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import TableContent from "@/components/kt-datatable/table-partials/table-content/TableContent.vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "kt-datatable",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 25 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    total: { type: Number, required: false },
    loading: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    emptyTableText: { type: String, required: false, default: "No data found" },
    currentPage: { type: Number, required: false, default: 1 },
  },
  emits: [
    "page-change",
    "perpage-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
  ],
  components: {
    TableContent,
    TableFooter,
  },
  setup(props, { emit }) {
     const nowPage = ref<number>(1);
    const currentPage = ref(props.currentPage);
    const itemsInTable = ref<number>(props.itemsPerPage);
    console.log(currentPage);
    watch(() => itemsInTable.value,
      (val) => {
        currentPage.value = 1;
        console.log(val);
        emit("on-items-per-page-change", val);
         emit("page-change", 1);
      }
    );
     watch(() => currentPage.value,
      (val) => {
       return  nowPage.value = val ;
      }
    );
    const perPageChange = (perpage: number) => {
      emit("perpage-change", perpage);
      console.log(perpage);
    };
    const pageChange = (page: number) => {
      currentPage.value = page;
      console.log(page);
      emit("page-change", page);
    };

    const dataToDisplay = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.data;
        } else {
          let sliceFrom = (currentPage.value - 1) * itemsInTable.value;
          return props.data.slice(sliceFrom, sliceFrom + itemsInTable.value);
        }
      }
      return [];
    });

    const totalItems = computed(() => {
      console.log(props.data);
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.data["totalElements"];
        } else {
          return props.data["totalElements"];
        }
      }
      return 0;
    });

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    //eslint-disable-next-line
    const onItemSelect = (selectedItems: any) => {
      emit("on-items-select", selectedItems);
    };

    return {
      pageChange,
      perPageChange,
      dataToDisplay,
      onSort,
      onItemSelect,
      itemsInTable,
      totalItems,
      nowPage,
    };
  },
});
</script>
