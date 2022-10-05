<template>
  <Form
    class="form"
    @submit="handleUpformdate"
    :validation-schema="contactModal"
  >
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
                >ข้อมูลพื้นฐาน</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-image"
                >รูปภาพ</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-map"
                >ตำแหน่ง</a
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
                    >ชื่อ TH
                  </label>
                  <div class="col-9">
                    <Field
                      tabindex="1"
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      name="name1"
                      v-model="contact.name1"
                      autocomplete="off"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="name1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ชื่อ EN
                  </label>
                  <div class="col-9">
                    <Field
                      tabindex="1"
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      name="name2"
                      min="1"
                      v-model="contact.name2"
                      autocomplete="off"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="name2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ที่อยู่</label
                  >
                  <div class="col-9">
                    <textarea
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.address"
                    >
                    </textarea>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >เบอร์โทรศัพท์ 1</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.phoneNumber1"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >เบอร์โทรศัพท์ 2</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.phoneNumber2"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >fax</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.fax"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >Website</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.website"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >facebook:</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.facebook"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >email</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >line</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.line"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >youtube</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.youtube"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-image" role="tabpanel">
            <div class="row">
              <div class="col-xl-2"></div>
              <div class="col-xl-7 my-2">
                <div class="form-group row">
                  <img
                    :src="
                      contact.imageBanner
                        ? contact.imageBanner
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
                  <img
                    :src="
                      contact.imageLogo
                        ? contact.imageLogo
                        : 'media/image/no-image.jpg'
                    "
                    alt=""
                    class="w-100"
                    style="border-radius: 20px"
                  />
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รูปภาพโลโก้</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg"
                      type="file"
                      v-on:change="onFileChangeLogo($event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-map" role="tabpanel">
            <div class="row">
              <div class="col-xl-2"></div>
              <div class="col-xl-7 my-2">
                <div class="form-group row mb-2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >แผนที่
                  </label>
                  <div class="col-9">
                    <iframe
                      width="100%"
                      height="400"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      :src="
                        'https://maps.google.com/maps?q=' +
                        contact.latitude +
                        ',' +
                        contact.longitude +
                        '&hl=th&z=15&amp;output=embed'
                      "
                    >
                    </iframe>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ละติจูด</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.latitude"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ลองจิจูด</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="contact.longitude"
                    />
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
      contact: {
        imageBanner: null,
        imageLogo: null,
      },
      file: null,
      fileLogo: null,
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      this.urldata = this.$route.params.id;
      const response = await axios.get(
        process.env.VUE_APP_API_URL +
          "/getContact" +
          "?id=" +
          this.urldata +
          "&groupId=" +
          localStorage.getItem("groupId"),
        {
          headers: { token: localStorage.getItem("id_token") },
        }
      );
      this.contact = response.data.data;
      if (this.contact.imageBanner != null) {
        if (this.contact.imageBanner.indexOf("https") > -1) {
          console.log(this.contact.imageBanner);
        } else {
          this.contact.imageBanner =
            process.env.VUE_APP_API_URL_IMAGE + this.contact.imageBanner;
        }
      }
      if (this.contact.imageLogo != null) {
        if (this.contact.imageLogo.indexOf("https") > -1) {
          console.log(this.contact.imageLogo);
        } else {
          this.contact.imageLogo =
            process.env.VUE_APP_API_URL_IMAGE + this.contact.imageLogo;
        }
      }
    }
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      this.contact.imageBanner = URL.createObjectURL(this.file);
    },
    onFileChangeLogo(event) {
      this.fileLogo = event.target.files[0];
      this.contact.imageLogo = URL.createObjectURL(this.fileLogo);
    },
    handleUpformdate() {
      let formData = new FormData();
      if (this.file) {
        formData.append("imageLogo", this.fileLogo);
      }
      if (this.file) {
        formData.append("imageBanner", this.file);
      }
      formData.append("name1", this.contact.name1);
      formData.append("name2", this.contact.name2);
      formData.append("email", this.contact.email);
      formData.append("address", this.contact.address);
      formData.append("website", this.contact.website);
      formData.append("phoneNumber1", this.contact.phoneNumber1);
      formData.append("phoneNumber2", this.contact.phoneNumber2);
      formData.append("fax", this.contact.fax);
      formData.append("line", this.contact.line);
      formData.append("youtube", this.contact.youtube);
      formData.append("facebook", this.contact.facebook);
      formData.append("latitude", this.contact.latitude);
      formData.append("longitude", this.contact.longitude);
      formData.append("groupId", this.contact.groupId);
      if (this.urldata != null) {
        formData.append("id", this.contact.id);
        axios
          .post(process.env.VUE_APP_API_URL + "/editContact", formData, {
            headers: { token: localStorage.getItem("id_token") },
          })
          .then((res) => {
            console.log(res.data);
            // this.$store.dispatch(Actions.CLEARCACHE);
            this.$router.go(-1);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(process.env.VUE_APP_API_URL + "/addContact", formData, {
            headers: { token: localStorage.getItem("id_token") },
          })
          .then((res) => {
            console.log(res.data);
            // this.$store.dispatch(Actions.CLEARCACHE);
            this.$router.go(-1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  setup() {
    //Create form validation object
    const contactModal = Yup.object().shape({
      name1: Yup.string().required().label("name1"),
      name2: Yup.string().required().label("name2"),
      // password: Yup.string().min(4).required().label("Password"),
    });
    return {
      contactModal,
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
