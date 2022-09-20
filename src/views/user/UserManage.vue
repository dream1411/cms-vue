<template>
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
            type="button"
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
  <div class="card card-custom">
    <div class="card-header card-header-tabs-line nav-tabs-line-3x">
      <div class="card-toolbar">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              <span class="nav-icon">
                <span class="svg-icon svg-icon-primary svg-icon-2x"
                  ><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo1/dist/../src/media/svg/icons/General/User.svg--><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <polygon points="0 0 24 0 24 24 0 24" />
                      <path
                        d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        opacity="0.3"
                      />
                      <path
                        d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                      />
                    </g></svg
                  ><!--end::Svg Icon--></span
                >
              </span>
              <span class="nav-text font-size-lg"> ข้อมูลส่วนตัว</span>
            </button>
            <button
              class="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              <span class="nav-icon">
                <span class="svg-icon svg-icon-primary svg-icon-2x"
                  ><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo1/dist/../src/media/svg/icons/Map/Marker1.svg--><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect x="0" y="0" width="24" height="24" />
                      <path
                        d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                      />
                    </g></svg
                  ><!--end::Svg Icon--></span
                >
              </span>
              <span class="nav-text font-size-lg"> ที่อยู่</span>
            </button>
            <button
              class="nav-link"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              <span class="nav-icon">
                <span class="svg-icon svg-icon-primary svg-icon-2x">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </span>
              </span>
              <span class="nav-text font-size-lg"> สิทธิการใช้งาน</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
    <div class="card-body">
      <form class="form" id="kt_form">
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div class="row">
              <div class="col-xl-2"></div>
              <div class="col-xl-7 my-2">
                <!--begin::Row-->
                <!-- <div class="row">
                  <label class="col-3"></label>
                  <div class="col-9">
                    <h6 class="text-dark font-weight-bold mb-10">
                      Customer Info:
                    </h6>
                  </div>
                </div> -->
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รุูปโปรไฟล์</label
                  >
                  <div class="col-9">
                    <div
                      class="image-input image-input-empty image-input-outline"
                      id="kt_user_edit_avatar"
                      :style="{'background-image': `url(${profile.imageProfile ? profile.imageProfile : 'media/avatars/blank.png'})`}"
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
                      v-model="profile.username"
                    />
                  </div>
                </div>
                <div class="form-group row">
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
                        <span class="input-group-text">
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
                <!-- <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ประเภทผู้ใช้งาน</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <select
                        name=""
                        class="form-control form-control-lg form-control-solid"
                        id=""
                        aria-placeholder="ประเภทผู้ใช้งาน"
                      ></select>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div class="row">
              <div class="col-xl-2"></div>
              <div class="col-xl-7 my-2">
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ที่อยู่</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                     v-model="addressProfile.address"
                      placeholder="ที่อยู่"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >จังหวัด</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <select
                        name=""
                        class="form-control form-control-lg form-control-solid"
                        id=""
                         @change="callDistrict($event.target.value)"
                       v-model="addressProfile.provinceCode"
                        aria-placeholder="จังหวัด"
                      >
                      <option
                          v-for="p in province"
                          :key="p.province_code"
                          :value="p.province_code"
                          >{{ p.province_th }}</option>
                          </select>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >อำเภอ</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <select
                        name=""
                        class="form-control form-control-lg form-control-solid"
                        id=""
                        v-model="addressProfile.districtCode"
                        @change="callSubDistrict($event.target.value)"
                        aria-placeholder="อำเภอ"
                      >
                      <option
                          v-for="d in district"
                          :key="d.district_code"
                          :value="d.district_code"
                          >{{ d.district_th }}</option
                        >
                        </select>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ตำบล</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <select
                        name=""
                        class="form-control form-control-lg form-control-solid"
                        id=""
                         v-model="addressProfile.subDistrictCode"
                        @change="callPost($event.target.value)"
                        aria-placeholder="ตำบล"
                      >
                        <option
                          v-for="sd in subDistrict"
                          :key="sd.subDistrict_code"
                          :value="sd.subDistrict_code"
                          >{{ sd.subDistrict_th }}</option
                        >
                        </select>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รหัสไปรษณีย์</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                       disabled
                      v-model="addressProfile.postCode"
                      placeholder="รหัสไปรษณีย์"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
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
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >การเข้าถึงเมนูใช้งาน</label
                  >
                  <!-- {{ Menu }} -->
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
      </form>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
// import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import axios from "axios";
import jQuery from "jquery";
const $ = jQuery;
const Menu = MainMenuConfig;
export default {
  name: "UsersManage",
  data() {
    return {
      province: null,
      district: null,
      subDistrict: null,
      userType: null,
      urldata: null,
      profile: {
        userName: "",
        firstName: "",
        lastName: "",
        userType: [],
      },
      addressProfile: {
        address: "",
        provinceCode: "",
        districtCode: "",
        subDistrictCode: "",
        postCode: "",
      },
      api: Object,
      Menu: {
        pages: Object,
      },
      file: null,
    };
  },

  async mounted() {
    this.Menu = Menu[0].pages;
    this.urldata = this.$route.params.id;
    const response = await axios.get(
      process.env.VUE_APP_API_URL + "/getProfile" + "?id=" + this.urldata,
      {
        headers: { token: localStorage.getItem("id_token") },
      }
    );
    console.log(response.data.data);
    this.profile = response.data.data;
    if (this.profile.addressProfile != null) {
      this.addressProfile.address = this.profile.addressProfile.addressNo;
      this.addressProfile.provinceCode = this.profile.addressProfile.province_code;
      this.addressProfile.districtCode = this.profile.addressProfile.district_code;
      this.addressProfile.subDistrictCode = this.profile.addressProfile.subDistrict_code;
      this.addressProfile.postCode = this.profile.addressProfile.zipcode;
    }
    if (this.profile.imageProfile != null) {
      this.profile.imageProfile =
        process.env.VUE_APP_API_URL_IMAGE + this.profile.imageProfile;
    }
    this.setPermissionMenu(this.profile.permissionMenu);
    // const getUserType = await axios.get(
    //   api[0]["BASE"] + api[0]["USER"]["GET_USER_TYPE"]
    // );
    // console.log(getUserType.data);
    // this.userType = getUserType.data.data;

    const getProvince = await axios.get(
      process.env.VUE_APP_API_URL + "/getProvince"
    );
    console.log(getProvince.data);
    this.province = getProvince.data.data;
    if (this.profile.addressProfile != null) {
      this.callDistrict(this.profile.addressProfile.province_code);
      this.callSubDistrict(this.profile.addressProfile.district_code);
      this.callPost(this.profile.addressProfile.subDistrict_code);
    }
  },
  methods: {
    async callDistrict(event) {
      const getDistrict = await axios.get(
        process.env.VUE_APP_API_URL + "/getDistrict" + "?provinceCode=" + event
      );
      console.log(getDistrict.data);
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
      console.log(getSubDistrict.data);
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
    // async handleUpdate() {
    //   const formData = new FormData();
    //   formData.append("id", this.profile.id);
    //   formData.append("firstName", this.profile.firstName);
    //   formData.append("lastName", this.profile.lastName);
    //   formData.append("phoneNumber", this.profile.phoneNumber);
    //   formData.append("addressId", this.addressProfile.subDistrictCode);
    //   formData.append("addressNo", this.addressProfile.address);
    //   formData.append("permissionMenu", this.profile.permissionMenu);
    //   formData.append("userType", this.profile.userType.code);
    //   if (this.file != null) {
    //     const uploadImg = new FormData();
    //     uploadImg.append("file", this.file);
    //     await axios
    //       .post(api[0].BASE + api[0].POST.UPLOAD_IMAGE_PROFILE, uploadImg, {
    //         headers: { token: localStorage.getItem("token") },
    //       })
    //       .then((res) => {
    //         formData.append("imageProfile", res.data.data);
    //         axios
    //           .post(api[0].BASE + api[0].USER.EDIT_PROFILE, formData, {
    //             headers: { token: localStorage.getItem("token") },
    //           })
    //           .then((res) => {
    //             console.log(res.data);
    //             if (this.profile.id == localStorage.getItem("u_id")) {
    //               console.log(res.data.data);
    //               localStorage.setItem(
    //                 "dataInfo",
    //                 JSON.stringify(res.data.data)
    //               );
    //               setTimeout(() => {
    //                 this.$emit("checkLogin");
    //               }, 500);
    //             }
    //             this.$router.go(-1);
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else {
    //     await axios
    //       .post(api[0].BASE + api[0].USER.EDIT_PROFILE, formData, {
    //         headers: { token: localStorage.getItem("token") },
    //       })
    //       .then((res) => {
    //         console.log(res.data);
    //         if (this.profile.id == localStorage.getItem("u_id")) {
    //           console.log(res.data.data);
    //           localStorage.setItem("dataInfo", JSON.stringify(res.data.data));
    //           setTimeout(() => {
    //             this.$emit("checkLogin");
    //           }, 500);
    //         }
    //         this.$router.go(-1);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    // },
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
        console.log(this.profile.permissionMenu);
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
