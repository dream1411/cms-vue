<template>
  <Form
    class="form"
    @submit="handleUpformdate"
    :validation-schema="knowledgeModal"
  >
    <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
      <div
        class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      >
        <KTPageTitle />
        <div class="d-flex align-items-center">
          <router-link
            to="/knowledge"
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
                    >รูปตัวอย่าง</label
                  >
                  <div class="col-9">
                    <img
                      :src="
                        knowledge.thumbnailsPath
                          ? knowledge.thumbnailsPath
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
                    >ลำดับข้อมูล
                  </label>
                  <div class="col-9">
                    <Field
                      tabindex="1"
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="sequence"
                      min="1"
                      v-model="knowledge.sequence"
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
                      v-model="knowledge.title"
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
                    >ประเภทสื่อ</label
                  >
                  <div class="col-9">
                    <div class="input-group input-group-lg input-group-solid">
                      <select
                        class="form-control form-control-lg form-control-solid"
                        name=""
                        id=""
                        v-model="knowledge.mediaType"
                        @change="changeType($event)"
                      >
                        <option value="1">pdf</option>
                        <option value="2">video</option>
                        <option value="3">image</option>
                        <option value="4">web</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group row" v-if="knowledge.mediaType == 1">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >อัพโหลด</label
                  >
                  <div class="col-9">
                    <!-- {{ uppy.getFiles() }} -->
                    <dashboard :uppy="uppyPDF" :props="{ theme: 'light' }" />
                  </div>
                </div>
                <div class="form-group row" v-if="knowledge.mediaType == 2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >อัพโหลด</label
                  >
                  <div class="col-9">
                    <!-- {{ uppy.getFiles() }} -->
                    <dashboard :uppy="uppyVideo" :props="{ theme: 'light' }" />
                  </div>
                </div>
                <div class="form-group row" v-if="knowledge.mediaType == 3">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >อัพโหลด</label
                  >
                  <div class="col-9">
                    <!-- {{ uppy.getFiles() }} -->
                    <dashboard :uppy="uppyImage" :props="{ theme: 'light' }" />
                  </div>
                </div>
                <div class="form-group row" v-if="knowledge.mediaType == 4">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >URL: โปรดระบในรูปแบบ http: หรือ https: เท่านั้น</label
                  >
                  <div class="col-9">
                    <input
                      tabindex="1"
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      name="url"
                      v-model="knowledge.url"
                      autocomplete="off"
                    />
                    <a :href="knowledge.url">ไปยังลิงค์</a>
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
                        v-model="knowledge.enable"
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
                        v-model="knowledge.pin"
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
import { ref, onMounted } from "vue";
import axios from "axios";
import jQuery from "jquery";
const $ = jQuery;
import { useRoute } from "vue-router";
import "vue3-tree/dist/style.css";
const knowledge = ref({});
const categoryList = ref([]);
const searchText = ref("");
const category = ref([]);
const deletePictures = [];
const clear = ref(false);
const click_count = ref(0);
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import * as Yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
const uppyPDF = new Uppy({
  allowMultipleUploadBatches: false,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ["application/pdf"],
  },
});
uppyPDF.on("file-removed", (file) => {
  if (file.data == "null" && clear.value == false) {
    deletePictures.push(file.name);
  }
});
const uppyVideo = new Uppy({
  allowMultipleUploadBatches: false,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ["video/*"],
  },
});
uppyVideo.on("file-removed", (file) => {
  if (file.data == "null" && clear.value == false) {
    deletePictures.push(file.name);
  }
});
const uppyImage = new Uppy({
  allowMultipleUploadBatches: false,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ["image/jpeg"],
  },
});
uppyImage.on("file-removed", (file) => {
  if (file.data == "null" && clear.value == false) {
    deletePictures.push(file.name);
  }
});
export default {
  components: {
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
      typeWeb: false,
    };
  },
  setup() {
    const router = useRoute();
    const knowledgeModal = Yup.object().shape({
      sequence: Yup.string().required("กรุณาระบุ ลำดับ"),
      title: Yup.string().required("กรุณาระบุ หัวข้อ"),
      // password: Yup.string().min(4).required().label("Password"),
    });
    onMounted(() => {
      let dataListPDF = uppyPDF.getFiles();
      if (dataListPDF.length > 0) {
        for (let index = 0; index < dataListPDF.length; index++) {
          const loopclear = dataListPDF[index];
          clear.value = true;
          uppyPDF.removeFile(loopclear.id);
        }
      }
      let dataListVideo = uppyVideo.getFiles();
      if (dataListVideo.length > 0) {
        for (let index = 0; index < dataListVideo.length; index++) {
          const loopclear = dataListVideo[index];
          clear.value = true;
          uppyVideo.removeFile(loopclear.id);
        }
      }
      let dataListImage = uppyImage.getFiles();
      if (dataListImage.length > 0) {
        for (let index = 0; index < dataListImage.length; index++) {
          const loopclear = dataListImage[index];
          clear.value = true;
          uppyImage.removeFile(loopclear.id);
        }
      }
      axios
        .get(
          process.env.VUE_APP_API_URL + "/category" + "?categoryType=knowledge",
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
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
              "/getKnowledge" +
              "?id=" +
              router.params.id,
            {
              headers: { token: localStorage.getItem("id_token") },
            }
          )
          .then(({ data }) => {
            knowledge.value = data.data.content[0];
            if (knowledge.value.thumbnailsPath != null) {
              if (knowledge.value.thumbnailsPath.indexOf("https") > -1) {
                console.log(knowledge.value.thumbnailsPath);
              } else {
                knowledge.value.thumbnailsPath =
                  process.env.VUE_APP_API_URL_IMAGE +
                  knowledge.value.thumbnailsPath;
              }
            }
            if (knowledge.value.pin == 1) {
              knowledge.value.pin = true;
            } else {
              knowledge.value.pin = false;
            }
            if (knowledge.value.mediaType == 1) {
              uppyPDF.addFile({
                name: knowledge.value.filesPath, // image name
                type: "application/pdf",
                data: "null",
                source:
                  process.env.VUE_APP_API_URL_IMAGE + knowledge.value.filesPath,
                remote: true,
              });
            } else if (knowledge.value.mediaType == 2) {
              uppyVideo.addFile({
                name: knowledge.value.videoPath, // image name
                type: "video/*",
                data: "null",
                source:
                  process.env.VUE_APP_API_URL_IMAGE + knowledge.value.videoPath,
                remote: true,
              });
            } else if (knowledge.value.mediaType == 3) {
              uppyImage.addFile({
                name: knowledge.value.imagePath, // image name
                type: "image/jpeg",
                data: "null",
                source:
                  process.env.VUE_APP_API_URL_IMAGE + knowledge.value.imagePath,
                remote: true,
              });
            }
            let categoryLiist = [];
            if (categoryList.value.length > 0) {
              for (const loopData of categoryList.value) {
                if (knowledge.value.category[0] == loopData.id) {
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
        knowledge.value = {
          id: "",
          sequence: "",
          title: "",
          description: "",
          buttonName: "",
          buttonUrl: "",
          youtube: "",
          category: "",
          mediaType: "1",
          groupId: localStorage.getItem("groupId"),
          pushnotification: false,
          enable: false,
          pin: false,
        };
      }
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
    };

    const onNodeClick = (node) => {
      node.checked = node[0].checked;
    };
    return {
      categoryList,
      searchText,
      category,
      knowledge,
      uppyPDF,
      uppyVideo,
      uppyImage,
      onNodeExpanded,
      onUpdate,
      onNodeClick,
      knowledgeModal,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      knowledge.value.thumbnailsPath = URL.createObjectURL(this.file);
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
        knowledge.value.category = list;
      });
    },
    previewImage() {
      this.$nextTick(() => {
        $(document).on("click", ".uppy-Dashboard-Item", function (event) {
          if (click_count.value == 0) {
            if (knowledge.value.mediaType == 1) {
              if (uppyPDF.getFiles().length > 0) {
                if (
                  event.currentTarget.id.indexOf(uppyPDF.getFiles()[0].id) > -1
                ) {
                  window.open(uppyPDF.getFiles()[0].source, "_blank");
                }
              }
            } else if (knowledge.value.mediaType == 2) {
              if (uppyVideo.getFiles().length > 0) {
                if (
                  event.currentTarget.id.indexOf(uppyVideo.getFiles()[0].id) >
                  -1
                ) {
                  window.open(uppyVideo.getFiles()[0].source, "_blank");
                }
              }
            } else if (knowledge.value.mediaType == 3) {
              if (uppyImage.getFiles().length > 0) {
                if (
                  event.currentTarget.id.indexOf(uppyImage.getFiles()[0].id) >
                  -1
                ) {
                  window.open(uppyImage.getFiles()[0].source, "_blank");
                }
              }
            }
            click_count.value = 1;
          }

          //   $("#btn-preview").click();
          //   $("#image-preview").attr("src", event.target.currentSrc);
        });
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
    changeType(event) {
      if (event.target.value == 1) {
        this.typeWeb = false;
      } else if (event.target.value == 2) {
        this.typeWeb = false;
      } else if (event.target.value == 3) {
        this.typeWeb = false;
      } else {
        this.typeWeb = true;
      }
    },
    handleUpformdate() {
      let formData = new FormData();
      if (knowledge.value.id != null) {
        formData.append("id", knowledge.value.id);
      }
      formData.append("sequence", knowledge.value.sequence);
      formData.append("title", knowledge.value.title);
      formData.append("youtube", knowledge.value.youtube);
      if (this.file != null) {
        formData.append("thumbnails", this.file);
      }
      formData.append("mediaType", knowledge.value.mediaType);
      if (knowledge.value.mediaType == 1) {
        if (uppyPDF.getFiles().length > 0) {
          for (const loopfile of uppyPDF.getFiles()) {
            if (loopfile.data != "null") {
              formData.append("filesPath", loopfile.data);
            }
          }
        }
      } else if (knowledge.value.mediaType == 2) {
        if (uppyVideo.getFiles().length > 0) {
          for (const loopfile of uppyVideo.getFiles()) {
            if (loopfile.data != "null") {
              formData.append("videoPath", loopfile.data);
            }
          }
        }
      } else if (knowledge.value.mediaType == 3) {
        if (uppyImage.getFiles().length > 0) {
          for (const loopfile of uppyImage.getFiles()) {
            if (loopfile.data != "null") {
              formData.append("imagePath", loopfile.data);
            }
          }
        }
      } else {
        formData.append("url", knowledge.value.url);
      }
      formData.append("category", knowledge.value.category.toString());
      formData.append("groupId", knowledge.value.groupId);
      formData.append("enable", knowledge.value.enable);
      formData.append("pin", knowledge.value.pin == true ? 1 : 0);
      //   formData.append("deletePictures", deletePictures);
      axios
        .post(process.env.VUE_APP_API_URL + "/addEditKnowledge", formData, {
          headers: { token: localStorage.getItem("id_token") },
        })
        .then((res) => {
          console.log(res);
          deletePictures.values = [];
          this.$router.go(-1);
        })
        .catch((error) => {
          deletePictures.values = [];
          console.log(error);
        });
    },
  },
  created() {
    click_count.value = 0;
    this.previewImage();
  },
  // mounted() {
  //   this.previewImage();
  // },
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
