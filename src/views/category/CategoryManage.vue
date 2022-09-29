<template>
  <Form
    class="form"
    @submit="handleUpformdate"
    :validation-schema="categoryModal"
  >
    <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
      <div
        class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      >
        <KTPageTitle />
        <div class="d-flex align-items-center">
          <router-link
            to="/category"
            class="btn btn-default font-weight-bold btn-sm px-3 font-size-base"
            >ย้อนกลับ</router-link
          >
          <div class="btn-group ml-2">
            <button
              type="submit"
              class="btn btn-primary font-weight-bold btn-sm px-3 font-size-base"
            >
              บันทึกข้อมูล
            </button>
          </div>
          <!--end::Dropdown-->
        </div>
        <!--end::Toolbar-->
      </div>
    </div>
    <div class="card">
      <!-- {{ $route.params.type }} {{ category }} -->
      <div class="card-header card-header-stretch">
        <div class="card-toolbar">
          <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-5 border-0">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#nav-home"
                >ข้อมูลพื้นฐาน</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-setting"
                >สิทธิการใช้งาน</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel">
            <div class="row">
              <div class="col-xl-2"></div>
              <div class="col-xl-7 my-2">
                <div class="form-group row">
                  <img
                    :src="
                      category.categoryImage
                        ? category.categoryImage
                        : 'media/image/no-image.jpg'
                    "
                    alt=""
                    class="w-100"
                    style="border-radius: 20px"
                  />
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รูปภาพปก</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg"
                      type="file"
                      v-on:change="onFileChange($event)"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ลำดับข้อมูล
                  </label>
                  <div class="col-9">
                    <Field
                      tabindex="1"
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="sequence"
                      min="1"
                      v-model="category.sequenceNo"
                      autocomplete="off"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="sequence" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ชื่อหมวดหมู่</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="category.categoryName"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-setting" role="tabpanel">
            <div class="row">
              <div class="col-xl-2"></div>
              <div class="col-xl-7 my-2">
                <div class="form-group row mb-2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >สถานะ
                  </label>
                  <div class="col-3">
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                      ><input
                        class="form-check-input"
                        type="checkbox"
                        v-model="category.enable"
                      /><span
                        class="form-check-label fw-semobold text-gray-400"
                      >
                        เปิด-ปิดการใช้งาน
                      </span></label
                    >
                  </div>
                  <hr />
                </div>
                <div class="form-group row mb-2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >หมวดหมู่หลัก
                  </label>
                  <div class="col-9" v-if="categoryList != null">
                    <div
                      class="mb-5"
                      v-for="(item, index) in categoryList"
                      :key="index"
                    >
                      <label
                        class="form-check form-check-custom form-check-solid"
                      >
                        <input
                          class="form-check-input"
                          name="rb_category"
                          type="radio"
                          :value="item.categoryCode"
                          v-model="category.parentCategory"
                        />
                        <span class="form-check-label">{{
                          item.categoryName
                        }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import axios from "axios";
import jQuery from "jquery";
const $ = jQuery;
import * as Yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import router from "@/router";
export default {
  name: "UsersManage",
  components: {
    Field,
    Form,
    ErrorMessage,
    KTPageTitle,
  },
  data() {
    return {
      urldata: null,
      category: {
        id: null,
        sequence: "9999",
        categoryName: "",
        categoryImage: null,
        groupId: localStorage.getItem("groupId"),
        parentCategory: "",
        categoryType: this.$route.params.type,
        enable: true,
      },
      file: null,
      categoryList: [],
    };
  },
  async mounted() {
    console.log(this.$route.params.type);
    let groupId = "";
    if (localStorage.getItem("groupId") != null) {
      groupId = localStorage.getItem("groupId");
    }
    if (this.$route.params.id) {
      this.urldata = this.$route.params.id;
      const response = await axios.get(
        process.env.VUE_APP_API_URL +
          "/category" +
          "?categoryCode=" +
          this.$route.params.id,
        {
          headers: { token: localStorage.getItem("id_token") },
        }
      );
      console.log(response.data.data);
      this.category = response.data.data;
      if (
        this.category.categoryImage != null &&
        this.category.categoryImage != ""
      ) {
        if (this.category.categoryImage.indexOf("https") > -1) {
          console.log(this.profile.categoryImage);
        } else {
          this.category.categoryImage =
            process.env.VUE_APP_API_URL_IMAGE + this.category.categoryImage;
        }
      }
    }
    if (this.$route.params.type) {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/category" +
            "?categoryType=" +
            this.category.categoryType +
            "&groupId=" +
            groupId,
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then(({ data }) => {
          this.categoryList = data.data;
          console.log(this.categoryList);
        })
        .catch(({ error }) => {
          console.log(error);
        });
    } else {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/category" +
            "?categoryType=" +
            this.category.categoryType +
            "&groupId=" +
            groupId,
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then(({ data }) => {
          this.categoryList = data.data;
          console.log(this.categoryList);
        })
        .catch(({ error }) => {
          console.log(error);
        });
    }
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      this.category.categoryImage = URL.createObjectURL(this.file);
    },
    handleUpformdate() {
      let formData = new FormData();
      formData.append("sequence", this.category.sequenceNo);
      if (this.file != null) {
        formData.append("categoryImage", this.file);
      }
      formData.append("categoryName", this.category.categoryName);
      formData.append("categoryType", this.category.categoryType);
      formData.append("groupId", this.category.groupId);
      formData.append("parentCategory", this.category.parentCategory);
      formData.append("enable", this.category.enable);
      if (this.category.id != null) {
        formData.append("id", this.category.id);
        axios
          .post(process.env.VUE_APP_API_URL + "/editCategory", formData, {
            headers: { token: localStorage.getItem("id_token") },
          })
          .then((res) => {
            console.log(res.data);
            // this.$store.dispatch(Actions.CLEARCACHE);
            Swal.fire({
              title: "บันทึกรายการสำเร็จ",
              text: "รายการข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "ตกลง!",
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(function () {
              router.go(-1);
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "แจ้งเตือนข้อผิดพลาด",
              text: error.response.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "กรุณาลองใหม่ภายหลัง!",
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          });
      } else {
        axios
          .post(process.env.VUE_APP_API_URL + "/addCategory", formData, {
            headers: { token: localStorage.getItem("id_token") },
          })
          .then((res) => {
            console.log(res.data);
            // this.$store.dispatch(Actions.CLEARCACHE);
            Swal.fire({
              title: "บันทึกรายการสำเร็จ",
              text: "รายการข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "ตกลง!",
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(function () {
              router.go(-1);
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "แจ้งเตือนข้อผิดพลาด",
              text: error.response.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "กรุณาลองใหม่ภายหลัง!",
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          });
      }
    },
  },
  setup() {
    //Create form validation object
    const categoryModal = Yup.object().shape({
      sequence: Yup.string().required().label("sequence"),
      // password: Yup.string().min(4).required().label("Password"),
    });
    return {
      categoryModal,
    };
  },
};
</script>
<style scoped>
.nav-tabs .nav-link:hover,
.nav-tabs .nav-link:focus {
  isolation: isolate;
  border-color: transparent !important;
}
.form-group {
  margin-bottom: 1.75rem;
}
.form-check {
  margin-bottom: 1rem;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: var(--bs-nav-tabs-link-active-color);
  background-color: none;
  border-color: transparent !important;
  border-bottom: 3px solid #3699ff !important;
}
.image-input {
  position: relative;
  display: inline-block;
  border-radius: 0.42rem;
  background-repeat: no-repeat;
  background-size: cover;
}
.image-input [data-action="change"] input {
  width: 0 !important;
  height: 0 !important;
  overflow: hidden;
  opacity: 0;
}
.image-input.image-input-outline .image-input-wrapper {
  border: 3px solid #ffffff;
  -webkit-box-shadow: 0 0.5rem 1.5rem 0.5rem rgb(0 0 0 / 8%);
  box-shadow: 0 0.5rem 1.5rem 0.5rem rgb(0 0 0 / 8%);
}
.image-input .image-input-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 0.42rem;
  background-repeat: no-repeat;
  background-size: cover;
}
.btn.btn-white.btn-shadow {
  -webkit-box-shadow: 0px 9px 16px 0px rgb(24 28 50 / 25%) !important;
  box-shadow: 0px 9px 16px 0px rgb(24 28 50 / 25%) !important;
}
.btn.btn-icon.btn-circle {
  border-radius: 50%;
}
.btn.btn-icon.btn-xs {
  height: 24px;
  width: 24px;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.image-input [data-action="change"] {
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: -10px;
}

.btn.btn-white {
  color: #3f4254;
  background-color: #ffffff;
  border-color: #ffffff;
}
.btn.btn-icon {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 0;
  height: calc(1.5em + 1.3rem + 2px);
  width: calc(1.5em + 1.3rem + 2px);
}
.image-input.image-input-empty [data-action="remove"],
.image-input.image-input-empty [data-action="cancel"] {
  display: none;
}
</style>
