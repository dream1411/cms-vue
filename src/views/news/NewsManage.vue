<template>
  <Form class="form" @submit="handleUpformdate" :validation-schema="newsModal">
    <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
      <div
        class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      >
        <KTPageTitle />
        <div class="d-flex align-items-center">
          <router-link
            to="/news"
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
              <a class="nav-link" data-bs-toggle="tab" href="#nav-media"
                >รูปภาพ</a
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
                    >ลำดับข้อมูล
                  </label>
                  <div class="col-9">
                    <Field
                      tabindex="1"
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="sequence"
                      min="1"
                      v-model="news.sequence"
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
                    >หัวข้อ
                  </label>
                  <div class="col-9">
                    <Field
                      tabindex="1"
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      name="title"
                      min="1"
                      v-model="news.title"
                      autocomplete="off"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="title" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รายละเอียด</label
                  >
                  <div class="col-9">
                    <editor
                      initialValue="<p>Initial editor content</p>"
                      v-model="news.description"
                      :init="{
                        height: 300,
                        menubar: true,
                        plugins: [
                          'advlist autolink lists link image charmap',
                          'searchreplace visualblocks code fullscreen',
                          'print preview anchor insertdatetime media',
                          'paste code help wordcount table',
                        ],
                        toolbar:
                          'undo redo | formatselect | bold italic |         alignleft aligncenter alignright |         bullist numlist outdent indent | help',
                      }"
                    >
                    </editor>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ชื่อปุ่ม</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <input
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        v-model="news.buttonName"
                        placeholder="ชื่อปุ่ม"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ลิงค์ปุ่ม: โปรดระบุในรูปแบบ http: หรือ https:
                    เท่านั้น</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <input
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        v-model="news.buttonUrl"
                        placeholder="ลิงค์ปุ่ม"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >Youtube</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <input
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        v-model="news.youtube"
                        placeholder="Youtube"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >facebookLive</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <input
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        v-model="news.facebookLive"
                        placeholder="facebookLive"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-media" role="tabpanel">
            <div class="row">
              <div class="col-xl-2"></div>
              <div class="col-xl-7 my-2">
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รูปตัวอย่าง</label
                  >
                  <div class="col-9">
                    <img
                      :src="
                        news.thumbnailsPath
                          ? news.thumbnailsPath
                          : 'media/image/no-image.jpg'
                      "
                      alt=""
                      class="w-100"
                      style="border-radius: 20px"
                    />
                  </div>
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
                    >รูปภาพประกอบ</label
                  >
                  <div class="col-9">
                    <dashboard :uppy="uppy" :props="{ theme: 'light' }" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-setting" role="tabpanel">
            <div class="row">
              <div class="col-12 col-md-6 my-2">
                <div class="form-group row mb-2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >สถานะ
                  </label>
                  <div class="col-9">
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                      ><input
                        class="form-check-input"
                        type="checkbox"
                        v-model="news.enable"
                      /><span
                        class="form-check-label fw-semobold text-gray-400"
                      >
                        เปิด-ปิดการใช้งาน
                      </span></label
                    >
                  </div>
                  <hr />
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >หมวดหมู่</label
                  >
                  <div class="col-9" v-if="categoryList != null">
                    <label
                      v-for="(item, index) in categoryList"
                      :key="index"
                      class="form-check form-check-custom form-check-solid me-10"
                      ><input
                        class="form-check-input h-20px w-20px"
                        type="checkbox"
                        name="cb_category"
                        :value="item.id"
                        :checked="item.checked"
                        @change="getCategory"
                      />
                      <span class="form-check-label fw-semobold">
                        {{ item.label }}
                      </span></label
                    >
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 my-2">
                <div class="form-group row mb-2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ตั้งค่าการแจ้งเตือน
                  </label>
                  <div class="col-9">
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                      ><input
                        class="form-check-input"
                        type="checkbox"
                        v-model="news.pushnotification"
                      /><span
                        class="form-check-label fw-semobold text-gray-400"
                      >
                        เปิด-ปิดการแจ้งเตือน
                      </span></label
                    >
                  </div>
                  <hr />
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ตั้งค่าการแนะนำ</label
                  >
                  <div class="col-9">
                    <label
                      class="form-check form-switch form-check-custom form-check-solid"
                      ><input
                        class="form-check-input"
                        type="checkbox"
                        v-model="news.pin"
                      /><span
                        class="form-check-label fw-semobold text-gray-400"
                      >
                        เปิด-ปิดการแนะนำ
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
  </Form>
  <button
    type="button"
    class="btn btn-light-primary me-3 d-none"
    data-bs-toggle="modal"
    data-bs-target="#kt_preview_modal"
    id="btn-preview"
  ></button>
  <div
    class="modal fade"
    id="kt_preview_modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <!--begin::Form-->
          <div class="fv-row mb-10">
            <img src="" id="image-preview" alt="" class="w-100" />
          </div>
          <div class="text-center">
            <button
              type="reset"
              data-bs-dismiss="modal"
              class="btn btn-light me-3"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { watch, ref, onMounted } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
// import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import axios from "axios";
import jQuery from "jquery";
const $ = jQuery;
import { useRoute } from "vue-router";
import Editor from "@tinymce/tinymce-vue";
import "vue3-tree/dist/style.css";
const news = ref({});
const categoryList = ref([]);
const searchText = ref("");
const category = ref([]);
const deletePictures = [];
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/vue";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import Uppy from "@uppy/core";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import * as Yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
const uppy = new Uppy({
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ["image/*"],
  },
});
uppy.use(ThumbnailGenerator, {
  id: "ThumbnailGenerator",
  thumbnailWidth: 200,
  thumbnailHeight: 200,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: false,
});
export default {
  components: {
    editor: Editor,
    // Tree,
    // eslint-disable-next-line vue/no-unused-components
    Dashboard,
    Field,
    Form,
    ErrorMessage,
    KTPageTitle,
  },

  data() {
    return {
      urldata: null,
      file: null,
      picturesPath: null,
    };
  },
  setup() {
    const router = useRoute();
    const newsModal = Yup.object().shape({
      sequence: Yup.string().required("กรุณาระบุ ลำดับ"),
      title: Yup.string().required("กรุณาระบุ หัวข้อ"),
      // password: Yup.string().min(4).required().label("Password"),
    });
    onMounted(() => 
    {
      console.log(uppy.getFiles());
      if (uppy.getFiles().length>0) {
        for (const loopclear of uppy.getFiles()) {
          uppy.removeFile(loopclear.id)
        }
      }
      axios
        .get(process.env.VUE_APP_API_URL + "/category" + "?categoryType=news", {
          headers: { token: localStorage.getItem("id_token") },
        })
        .then(({ data }) => {
          console.log(data);
          let categoryLiist = [];
          if (data.data.length > 0) {
            for (const loopData of data.data) {
              categoryLiist.push({
                id: loopData.categoryCode,
                label: loopData.categoryName,
                checked: false,
              });
            }
          }
          categoryList.value = categoryLiist;
        })
        .catch(({ error }) => {
          console.log(error);
        });
      if (router.params.id) {
        
        axios
          .get(
            process.env.VUE_APP_API_URL +
              "/getNews" +
              "?id=" +
              router.params.id,
            {
              headers: { token: localStorage.getItem("id_token") },
            }
          )
          .then(({ data }) => {
            news.value = data.data.content[0];
            if (news.value.thumbnailsPath != null) {
              if (news.value.thumbnailsPath.indexOf("https") > -1) {
                console.log(news.value.thumbnailsPath);
              } else {
                news.value.thumbnailsPath =
                  process.env.VUE_APP_API_URL_IMAGE + news.value.thumbnailsPath;
              }
            }
            if (news.value.pin == 1) {
              news.value.pin = true;
            } else {
              news.value.pin = false;
            }
            if (news.value.picturesPath.length > 0) {
              for (let loopPicturesPath of news.value.picturesPath) {
                uppy.addFile({
                  name: loopPicturesPath, // image name
                  type: "image/jpeg",
                  data: "null",
                  source: process.env.VUE_APP_API_URL_IMAGE + loopPicturesPath,
                  remote: true,
                });
              }
              console.log(news.value);
            }
            let categoryLiist = [];
            if (categoryList.value.length > 0) {
              for (const loopData of categoryList.value) {
                if (news.value.category[0] == loopData.id) {
                  categoryLiist.push({
                    id: loopData.id,
                    label: loopData.label,
                    checked: true,
                  });
                } else {
                  categoryLiist.push({
                    id: loopData.id,
                    label: loopData.label,
                    checked: false,
                  });
                }
              }
            }
            categoryList.value = categoryLiist;
          })
          .catch(({ error }) => {
            console.log(error);
          });
      } else {
        news.value = {
          id: "",
          sequence: "",
          title: "",
          description: "",
          buttonName: "",
          buttonUrl: "",
          youtube: "",
          category: "",
          groupId: "63293ef74cedfd0001b8af25",
          pushnotification: false,
          enable: false,
          pin: false,
        };
      }
    });

    uppy.on("file-removed", (file) => {
      if (file.data == "null") {
        deletePictures.push(file.name);
      }
      console.log(deletePictures);
    });
    const onNodeExpanded = (node, state) => {
      console.log("state: ", state);
      console.log("node: ", node);
    };

    const onUpdate = (nodes) => {
      //  category.value= []
      if (nodes.length > 0) {
        for (const loopNodes of nodes) {
          if (loopNodes.checked == true) {
            if (category.value.length > 0) {
              if (category.value.indexOf(loopNodes.id) == -1) {
                category.value.push(loopNodes.id);
              }
              // for (let index = 0; index < category.value.length; index++) {
              //   const loopAdd = category.value[index];
              //   if (loopAdd != loopNodes.id ) {
              //     category.value.push(loopNodes.id);
              //   }
              // }
            } else {
              category.value.push(loopNodes.id);
            }
          } else {
            if (loopNodes.checked != undefined) {
              for (let index = 0; index < category.value.length; index++) {
                const loopRemove = category.value[index];
                if (loopRemove == loopNodes.id) {
                  category.value.splice(index, 1);
                }
              }
            }
          }
        }
      }
      // this.news.category = category.value;
      // console.log(category.value);
    };

    const onNodeClick = (node) => {
      node.checked = node[0].checked;
    };
    uppy.on("thumbnail:generated", (file, preview) => {
      console.log(preview);
      const img = document.createElement("img");
      img.src = preview;
      img.width = 100;
      document.body.appendChild(img);
    });
    return {
      categoryList,
      searchText,
      category,
      news,
      uppy,
      onNodeExpanded,
      onUpdate,
      onNodeClick,
      newsModal,
    };
  },
  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
      // FilePond instance methods are available on `this.$refs.pond`
    },
    handleClose() {
      this.open = false;
    },
    onFileChange(event) {
      this.file = event.target.files[0];
      news.value.thumbnailsPath = URL.createObjectURL(this.file);
    },
    // uppy-Dashboard-Item-previewImg
    getCategory() {
      this.$nextTick(() => {
        const list = [];
        if ($("input[name=cb_category]:checked").length > 0) {
          for (
            let index = 0;
            index < $("input[name=cb_category]:checked").length;
            index++
          ) {
            const element = $("input[name=cb_category]:checked")[index];
            list.push($(element).val());
          }
        }
        news.value.category = list;
        console.log(this.profile.permissionMenu);
      });
    },
    previewImage() {
      this.$nextTick(() => {
        setTimeout(() => {
          // alert($(".uppy-Dashboard-Item-previewImg").length);
          $(document).on(
            "click",
            ".uppy-Dashboard-Item-previewImg",
            function (event) {
              $("#btn-preview").click()
              $("#image-preview").attr("src", event.target.currentSrc);
            }
          );
        }, 1000);
      });
    },
    setCategory(data) {
      this.$nextTick(() => {
        if (data) {
          for (
            let index = 0;
            index < $("input[name=cb_category]").length;
            index++
          ) {
            const element = $("input[name=cb_category]")[index];
            if (data.indexOf(element.value) > -1) {
              $(element).prop("checked", true);
            }
          }
        }
      });
    },
    handleUpformdate() {
      let formData = new FormData();
      if (news.value.id != null) {
        formData.append("id", news.value.id);
      }
      formData.append("sequence", news.value.sequence);
      formData.append("title", news.value.title);
      formData.append("description", news.value.description);
      formData.append("buttonName", news.value.buttonName);
      formData.append("buttonUrl", news.value.buttonUrl);
      formData.append("youtube", news.value.youtube);
      if (this.file != null) {
        formData.append("thumbnails", this.file);
      }
      if (uppy.getFiles().length > 0) {
        for (const loopfile of uppy.getFiles()) {
          if (loopfile.data != "null") {
            formData.append("picturesPath", loopfile.data);
          }
        }
      }
      formData.append("category", news.value.category.toString());
      formData.append("groupId", news.value.groupId);
      formData.append("enable", news.value.enable);
      formData.append("pushnotification", news.value.pushnotification);
      formData.append("pin", news.value.pin == true ? 1 : 0);
      formData.append("deletePictures", deletePictures);
      axios
        .post(process.env.VUE_APP_API_URL + "/addEditNews", formData, {
          headers: { token: localStorage.getItem("id_token") },
        })
        .then((res) => {
          console.log(res);
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error);
        });
      // if (news.value.pin == true) {
      //   formData.append("startDate", startDate);
      //   formData.append("endDate", endDate);
      // }
    },
  },
  mounted() {
    this.previewImage();
  },
};
</script>
<style lang="scss" scoped>
hr {
  width: 90% !important;
}
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
