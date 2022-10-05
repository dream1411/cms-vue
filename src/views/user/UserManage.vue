<!-- eslint-disable no-undef -->
<template>
  <form class="form" @submit.prevent="handleUpformdate">
    <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
      <div
        class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      >
        <KTPageTitle />
        <div class="d-flex align-items-center">
          <router-link
            to="/users"
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
      <div class="card-header card-header-stretch">
        <div class="card-toolbar">
          <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-5 border-0">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="#nav-home"
                >ข้อมูลส่วนตัว</a
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
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รุูปโปรไฟล์</label
                  >
                  <div class="col-9">
                    <div
                      class="image-input image-input-empty image-input-outline"
                      id="kt_user_edit_avatar"
                      :style="{
                        'background-image': `url(${
                          profile.imageProfile
                            ? profile.imageProfile
                            : 'media/avatars/blank.png'
                        })`,
                      }"
                    >
                      <div class="image-input-wrapper"></div>
                      <label
                        class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="change"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Change avatar"
                      >
                        <i class="fa fa-pen icon-sm text-muted"></i>
                        <input
                          type="file"
                          name="profile_avatar"
                          v-on:change="onFileChange($event)"
                          accept=".png, .jpg, .jpeg"
                        />
                        <input
                          type="hidden"
                          name="profile_avatar_remove"
                          v-model="file"
                        />
                      </label>
                      <span
                        class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="cancel"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Cancel avatar"
                      >
                        <i class="ki ki-bold-close icon-xs text-muted"></i>
                      </span>
                      <span
                        class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="remove"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Remove avatar"
                      >
                        <i class="ki ki-bold-close icon-xs text-muted"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >บัญชีผู้ใช้งาน
                  </label>
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="profile.userName"
                    />
                  </div>
                </div>
                <div class="form-group row" v-if="!urldata">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รหัสผ่าน</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="password"
                      v-model="profile.password"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ชื่อ</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="profile.firstName"
                      placeholder="ชื่อ"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >นามสกุล</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <input
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        v-model="profile.lastName"
                        placeholder="นามสกุล"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >หมายเลขโทรศัพท์</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <div class="input-group-prepend">
                        <span class="input-group-text h-100">
                          <i class="la la-phone"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        v-model="profile.phoneNumber"
                        placeholder="หมายเลขโทรศัพท์"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >อีเมล</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <div class="input-group-prepend">
                        <span class="input-group-text h-100">
                          <i class="la la-envelope"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        v-model="profile.email"
                        placeholder="อีเมล"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >สมาชิกกลุ่ม</label
                  >
                  <div class="col-9">
                    <Multiselect
                      v-model="dataGroup.value"
                      v-bind="dataGroup"
                      @change="groupChange"
                    >
                      <template
                        v-slot:tag="{ option, handleTagRemove, disabled }"
                      >
                        <div class="multiselect-tag is-user">
                          <img :src="option.image" />
                          {{ option.name }}
                          <i
                            v-if="!disabled"
                            @click.prevent
                            @mousedown.prevent.stop="
                              handleTagRemove(option, $event)
                            "
                          ></i>
                        </div>
                      </template>

                      <template v-slot:option="{ option }">
                        <img class="user-image" :src="option.image" />
                        {{ option.name }}
                      </template>
                    </Multiselect>
                    <!-- my: {{ myGroup }} add:{{ addGroup }} remove:{{
                      removeGroup
                    }} -->
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
                        v-model="profile.enable"
                      /><span
                        class="form-check-label fw-semobold text-gray-400"
                      >
                        เปิด-ปิดการใช้งาน
                      </span></label
                    >
                  </div>
                </div>
                <div class="form-group row mb-2">
                  <hr />
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ผู้ดูแลกลุ่ม
                  </label>
                  <div class="col-3">
                    <div
                      class="mb-5"
                      v-for="(item, index) in groupList"
                      :key="index"
                    >
                      <div
                        class="form-check form-check-custom form-check-solid"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          :value="item.id"
                          v-model="profile.admingroup"
                          name="cb_group"
                          :id="'flexRadioChecked' + index"
                        />
                        <label
                          class="form-check-label"
                          :for="'flexRadioChecked' + index"
                          >{{ item.name }}</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <hr />
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >การเข้าถึงเมนูใช้งาน</label
                  >
                  <div class="col-9" v-if="Menu != undefined">
                    <label
                      v-for="(item, index) in Menu"
                      :key="index"
                      class="form-check form-check-custom form-check-solid me-10"
                      ><input
                        class="form-check-input h-20px w-20px"
                        type="checkbox"
                        name="cb_permissionMenu"
                        :value="item.route"
                        @change="getPermissionMenu"
                      />
                      <span class="form-check-label fw-semobold">
                        {{ item.heading }}
                      </span></label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import axios from "axios";
import jQuery from "jquery";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
const $ = jQuery;
const Menu = MainMenuConfig;
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import router from "@/router";
const addGroup = ref([]);
const myGroup = ref([]);
const removeGroup = ref([]);
const dataGroup = ref({
  mode: "tags",
  value: [],
  placeholder: "กรุณาเลือกกลุ่ม",
  search: true,
  trackBy: "name",
  label: "name",
  options: [],
  searchable: true,
});
export default {
  components: {
    Multiselect,
    KTPageTitle,
  },
  name: "UsersManage",
  data() {
    return {
      province: null,
      district: null,
      subDistrict: null,
      userType: null,
      urldata: this.$route.params.id,
      groupList: [],
      profile: {
        userName: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        admingroup: "",
      },
      // addressProfile: {
      //   address: "",
      //   provinceCode: "",
      //   districtCode: "",
      //   subDistrictCode: "",
      //   postCode: "",
      // },
      api: Object,
      Menu: {
        pages: Object,
      },
      file: null,
    };
  },
  setup() {
    // const route = useRoute();
    // watch(
    //   () => route.path,
    //   () => {
    //     if (route.params.id == localStorage.getItem("u_id")) {
    //     this.profile = []
    //     }
    //   }
    // );
    return {
      dataGroup,
      addGroup,
      removeGroup,
      myGroup,
    };
  },
  watch: {
    $route(to, from) {
      if (to.params && to.params.id) {
        this.getProfile(to.params.id);
      }
    },
  },
  async mounted() {
    this.Menu = Menu[0].pages;
    dataGroup.value.options=[]
    const group = await axios.get(process.env.VUE_APP_API_URL + "/getGroup");
    this.groupList = group.data.data;
    if (this.groupList.length > 0) {
      for (const loopdata of this.groupList) {
        dataGroup.value.options.push({
          value: loopdata.id,
          name: loopdata.name,
          image:
            loopdata.icon != ""
              ? process.env.VUE_APP_API_URL_IMAGE + loopdata.icon
              : "media/image/no-image.jpg",
        });
      }
    }
    if (this.urldata != null) {
      this.getProfile(this.urldata);
    }
    // const getProvince = await axios.get(
    //   process.env.VUE_APP_API_URL + "/getProvince"
    // );
    // console.log(getProvince.data);
    // this.province = getProvince.data.data;
    // if (this.profile.addressProfile != null) {
    //   this.callDistrict(this.profile.addressProfile.province_code);
    //   this.callSubDistrict(this.profile.addressProfile.district_code);
    //   this.callPost(this.profile.addressProfile.subDistrict_code);
    // }
  },
  methods: {
    async getProfile(id) {
      const response = await axios.get(
        process.env.VUE_APP_API_URL + "/getProfile" + "?id=" + id,
        {
          headers: { token: localStorage.getItem("id_token") },
        }
      );
      this.profile = response.data.data;
      if (this.profile.role != null) {
        this.profile.admingroup = this.profile.role.adminGroups[0];
      }
      if (this.profile.imageProfile != null) {
        if (this.profile.imageProfile.indexOf("https") > -1) {
          console.log(this.profile.imageProfile);
        } else {
          this.profile.imageProfile =
            process.env.VUE_APP_API_URL_IMAGE + this.profile.imageProfile;
        }
      }
      this.setPermissionMenu(this.profile.permissionMenu);
      if (this.profile.readGroups.length > 0) {
        let readGroups = [];
        for (const loopdata of this.profile.readGroups) {
          readGroups.push(loopdata.groupId);
        }
        myGroup.value = readGroups;
        dataGroup.value.value = readGroups;
      }
    },
    async callDistrict(event) {
      const getDistrict = await axios.get(
        process.env.VUE_APP_API_URL + "/getDistrict" + "?provinceCode=" + event
      );
      this.district = getDistrict.data.data;
    },
    async callSubDistrict(event) {
      const getSubDistrict = await axios.get(
        process.env.VUE_APP_API_URL +
          "/getSubDistrict" +
          "?provinceCode=" +
          this.addressProfile.provinceCode +
          "&districtCode=" +
          event
      );
      this.subDistrict = getSubDistrict.data.data;
    },
    async callPost(event) {
      if (this.subDistrict != null) {
        for (const loopPost of this.subDistrict) {
          if (loopPost.subDistrict_code == event) {
            this.addressProfile.postCode = loopPost.zipcode;
          }
        }
      }
    },
    onFileChange(event) {
      this.file = event.target.files[0];
      this.profile.imageProfile = URL.createObjectURL(this.file);
    },
    groupChange(event) {
      console.log(event);
      let listadd = [];
      for (const loopdata of event) {
        if (myGroup.value.indexOf(loopdata) == -1) {
          listadd.push(loopdata);
        }
      }
      addGroup.value = listadd;
      let listremove = [];
      for (const loopdata of myGroup.value) {
        if (event.indexOf(loopdata) == -1) {
          listremove.push(loopdata);
        }
      }
      removeGroup.value = listremove;
    },
    handleUpformdate() {
      let formData = new FormData();
      formData.append("firstName", this.profile.firstName);
      formData.append("lastName", this.profile.lastName);
      formData.append("phoneNumber", this.profile.phoneNumber);
      formData.append("email", this.profile.email);
      formData.append("permissionMenu", this.profile.permissionMenu);
      if (addGroup.value.length > 0) {
        formData.append("groupId", addGroup.value.toString());
      }
      if (removeGroup.value.length > 0) {
        formData.append("groupIdDelete", removeGroup.value.toString());
      }
      if (this.urldata != null) {
        formData.append("id", this.profile.id);
        if (this.file != null) {
          let uploadImg = new FormData();
          uploadImg.append("file", this.file);
          axios
            .post(
              process.env.VUE_APP_API_URL + "/uploadImageProfile",
              uploadImg,
              {
                headers: { token: localStorage.getItem("id_token") },
              }
            )
            .then((res) => {
              formData.append("imageProfile", res.data.data);
              axios
                .post(process.env.VUE_APP_API_URL + "/editProfile", formData, {
                  headers: { token: localStorage.getItem("id_token") },
                })
                .then((res) => {
                  console.log(res.data);
                  let manageStatusUser = new FormData();
                  manageStatusUser.append("id", res.data.data.id);
                  manageStatusUser.append("status", this.profile.enable);
                  axios
                    .post(
                      process.env.VUE_APP_API_URL + "/manageStatusUser",
                      manageStatusUser,
                      {
                        headers: { token: localStorage.getItem("id_token") },
                      }
                    )
                    .then((res) => {
                      let groupIdDelete = "";
                      if (
                        this.profile.role != null &&
                        this.profile.admingroup !=
                          this.profile.role.adminGroups[0]
                      ) {
                        groupIdDelete = this.profile.admingroup;
                      }
                      let manageAdmin = new FormData();
                      manageAdmin.append("id", res.data.data.id);
                      manageAdmin.append("groupId", this.profile.admingroup);
                      manageAdmin.append("groupIdDelete", groupIdDelete);
                      axios
                        .post(
                          process.env.VUE_APP_API_URL + "/manageAdmin",
                          manageAdmin,
                          {
                            headers: {
                              token: localStorage.getItem("id_token"),
                            },
                          }
                        )
                        .then((res) => {
                          if (this.urldata == localStorage.getItem("u_id")) {
                            localStorage.setItem(
                              "dataInfo",
                              JSON.stringify(res.data.data)
                            );
                          }
                          Swal.fire({
                            title: "บันทึกรายการสำเร็จ",
                            text: "รายการข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "ตกลง!",
                            customClass: {
                              confirmButton:
                                "btn fw-semobold btn-light-primary",
                            },
                          }).then(function () {
                            router.go(-1);
                          });
                        })
                        .catch((error) => {
                          console.log(error);
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
        } else {
          axios
            .post(process.env.VUE_APP_API_URL + "/editProfile", formData, {
              headers: { token: localStorage.getItem("id_token") },
            })
            .then((res) => {
              let manageStatusUser = new FormData();
              manageStatusUser.append("id", res.data.data.id);
              manageStatusUser.append("status", this.profile.enable);
              axios
                .post(
                  process.env.VUE_APP_API_URL + "/manageStatusUser",
                  manageStatusUser,
                  {
                    headers: { token: localStorage.getItem("id_token") },
                  }
                )
                .then((res) => {
                  let groupIdDelete = "";
                  if (
                    this.profile.role != null &&
                    this.profile.admingroup != this.profile.role.adminGroups[0]
                  ) {
                    groupIdDelete = this.profile.admingroup;
                  }
                  let manageAdmin = new FormData();
                  manageAdmin.append("id", res.data.data.id);
                  manageAdmin.append("groupId", this.profile.admingroup);
                  manageAdmin.append("groupIdDelete", groupIdDelete);
                  axios
                    .post(
                      process.env.VUE_APP_API_URL + "/manageAdmin",
                      manageAdmin,
                      {
                        headers: {
                          token: localStorage.getItem("id_token"),
                        },
                      }
                    )
                    .then((res) => {
                      if (this.urldata == localStorage.getItem("u_id")) {
                        localStorage.setItem(
                          "dataInfo",
                          JSON.stringify(res.data.data)
                        );
                      }
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
      } else {
        formData.append("username", this.profile.userName);
        formData.append("password", this.profile.password);
        if (this.file != null) {
          let uploadImg = new FormData();
          uploadImg.append("file", this.file);
          axios
            .post(
              process.env.VUE_APP_API_URL + "/uploadImageProfile",
              uploadImg,
              {
                headers: { token: localStorage.getItem("id_token") },
              }
            )
            .then((res) => {
              formData.append("imageProfile", res.data.data);
              axios
                .post(process.env.VUE_APP_API_URL + "/register", formData, {
                  headers: { token: localStorage.getItem("id_token") },
                })
                .then((res) => {
                  let manageStatusUser = new FormData();
                  manageStatusUser.append("id", res.data.data.id);
                  manageStatusUser.append("status", this.profile.enable);
                  axios
                    .post(
                      process.env.VUE_APP_API_URL + "/manageStatusUser",
                      formData,
                      {
                        headers: { token: localStorage.getItem("id_token") },
                      }
                    )
                    .then((res) => {
                      let groupIdDelete = "";
                      if (
                        this.profile.role != null &&
                        this.profile.admingroup !=
                          this.profile.role.adminGroups[0]
                      ) {
                        groupIdDelete = this.profile.admingroup;
                      }
                      let manageAdmin = new FormData();
                      manageAdmin.append("id", res.data.data.id);
                      manageAdmin.append("groupId", this.profile.admingroup);
                      manageAdmin.append("groupIdDelete", groupIdDelete);
                      axios
                        .post(
                          process.env.VUE_APP_API_URL + "/manageAdmin",
                          formData,
                          {
                            headers: {
                              token: localStorage.getItem("id_token"),
                            },
                          }
                        )
                        .then((res) => {
                          // this.$store.dispatch(Actions.CLEARCACHE);
                          this.$router.go(-1);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  // this.$store.dispatch(Actions.CLEARCACHE);
                  // this.$router.go(-1);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          axios
            .post(process.env.VUE_APP_API_URL + "/register", formData, {
              headers: { token: localStorage.getItem("id_token") },
            })
            .then((res) => {
              let manageStatusUser = new FormData();
              manageStatusUser.append("id", res.data.data.id);
              manageStatusUser.append("status", this.profile.enable);
              axios
                .post(
                  process.env.VUE_APP_API_URL + "/manageStatusUser",
                  manageStatusUser,
                  {
                    headers: { token: localStorage.getItem("id_token") },
                  }
                )
                .then((res) => {
                  let groupIdDelete = "";
                  if (
                    this.profile.role != null &&
                    this.profile.admingroup != this.profile.role.adminGroups[0]
                  ) {
                    groupIdDelete = this.profile.admingroup;
                  }
                  let manageAdmin = new FormData();
                  manageAdmin.append("id", res.data.data.id);
                  manageAdmin.append("groupId", this.profile.admingroup);
                  manageAdmin.append("groupIdDelete", groupIdDelete);
                  axios
                    .post(
                      process.env.VUE_APP_API_URL + "/manageAdmin",
                      manageAdmin,
                      {
                        headers: {
                          token: localStorage.getItem("id_token"),
                        },
                      }
                    )
                    .then((res) => {
                      // this.$store.dispatch(Actions.CLEARCACHE);
                      this.$router.go(-1);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    getPermissionMenu() {
      this.$nextTick(() => {
        const list = [];
        if ($("input[name=cb_permissionMenu]:checked").length > 0) {
          for (
            let index = 0;
            index < $("input[name=cb_permissionMenu]:checked").length;
            index++
          ) {
            const element = $("input[name=cb_permissionMenu]:checked")[index];
            list.push($(element).val());
          }
        }
        this.profile.permissionMenu = list.toString();
      });
    },
    setPermissionMenu(data) {
      this.$nextTick(() => {
        if (data) {
          for (
            let index = 0;
            index < $("input[name=cb_permissionMenu]").length;
            index++
          ) {
            const element = $("input[name=cb_permissionMenu]")[index];
            if (data.indexOf(element.value) > -1) {
              $(element).prop("checked", true);
            }
          }
        }
      });
    },
  },
};
</script>
<style scoped>
.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}
.multiselect-tag.is-user {
  padding: 5px 8px;
  border-radius: 22px;
  background: #35495e;
  margin: 3px 3px 8px;
}
.user-image {
  margin: 0 6px 0 0;
  border-radius: 50%;
  height: 22px;
  width: 22px;
}
.form-group {
  margin-bottom: 1.75rem;
}
.form-check {
  margin-bottom: 1rem;
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
