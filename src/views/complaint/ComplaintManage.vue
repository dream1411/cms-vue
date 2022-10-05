<template>
  <Form
    class="form"
    @submit="handleUpformdate"
    :validation-schema="complaintModal"
  >
    <div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
      <div
        class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      >
        <KTPageTitle />
        <div class="d-flex align-items-center">
          <router-link
            to="/complaint"
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
                >รายละเอียด</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-place"
                >ตำแหน่ง</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-media"
                >ไฟล์มีเดีย</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-complainant"
                >ผู้แจ้ง</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-status">
                อัปเดตสถานะการดำเนินการ</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-comment">
                ความคิดเห็น
                <span
                  v-if="listComment"
                  class="badge badge-exclusive badge-light-danger fw-semibold fs-8 px-2 py-1 ms-1"
                  >{{ listComment.length }}</span
                ></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#nav-score">
                คะแนนความพึงพอใจ</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="card-body">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel">
            <div class="row">
              <div class="col-xl-1"></div>
              <div class="col-xl-10 my-2">
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รูปภาพประกอบ</label
                  >
                  <div class="col-9">
                    <dashboard
                      :uppy="uppy"
                      :props="{
                        theme: 'light',
                        hideUploadButton: true,
                        disabled: true,
                      }"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >หมวดหมู่
                  </label>
                  <div class="col-9">
                    {{ titleId.value }}
                    <Multiselect
                      v-model="titleId.value"
                      v-bind="titleId"
                      @change="getCategory(titleId.value)"
                    >
                      <template v-slot:singlelabel="{ value }">
                        <div class="multiselect-single-label">
                          {{ value.name }}
                        </div>
                      </template>
                      <template v-slot:option="{ option }">
                        {{ option.name }}
                      </template></Multiselect
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >หมวดหมู่ย่อย
                  </label>
                  <div class="col-9">
                    {{ categoryId.value }}
                    <Multiselect v-model="categoryId.value" v-bind="categoryId">
                      <template v-slot:singlelabel="{ value }">
                        <div class="multiselect-single-label">
                          {{ value.name }}
                        </div>
                      </template>
                      <template v-slot:option="{ option }">
                        {{ option.name }}
                      </template></Multiselect
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รายละเอียด</label
                  >
                  <div class="col-9">
                    <editor
                      initialValue="<p>Initial editor content</p>"
                      v-model="complaint.description"
                      :disabled="true"
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
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-place" role="tabpanel">
            <div class="row">
              <div class="col-xl-1"></div>
              <div class="col-xl-10 my-2">
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
                        complaint.latitude +
                        ',' +
                        complaint.longitude +
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
                      disabled
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="complaint.latitude"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ลองจิจูด</label
                  >
                  <div class="col-9">
                    <input
                      disabled
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="complaint.longitude"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >สถาน</label
                  >
                  <div class="col-9">
                    <input
                      disabled
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="complaint.placeName"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-media" role="tabpanel">
            <div class="row">
              <div class="col-xl-1"></div>
              <div class="col-xl-10 my-2">
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ไฟล์วิดีโอ</label
                  >
                  <div class="col-9">
                    <dashboard
                      :uppy="uppyVideo"
                      :props="{ theme: 'light', disabled: true }"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ไฟล์เสียง</label
                  >
                  <div class="col-9">
                    <dashboard
                      :uppy="uppyAudio"
                      :props="{ theme: 'light', disabled: true }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-complainant" role="tabpanel">
            <div class="row">
              <div class="col-xl-1"></div>
              <div class="col-xl-10 my-2">
                <div class="form-group row mb-2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >รูปโปรไฟล์ผู้แจ้ง
                  </label>
                  <div class="col-9">
                    <div
                      class="image-input image-input-empty image-input-outline"
                      id="kt_user_edit_avatar"
                      :style="{
                        'background-image': `url(${
                          complaint.authorProfile != null &&
                          complaint.authorProfile.imageProfile
                            ? complaint.authorProfile.imageProfile
                            : 'media/avatars/blank.png'
                        })`,
                      }"
                    >
                      <div class="image-input-wrapper"></div>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >ข้อมูลส่วนตัวผู้แจ้ง</label
                  >
                  <div class="col-9">
                    <div class="form-group row">
                      ชื่อ :
                      <b class="w-50">{{
                        complaint.authorProfile != null &&
                        complaint.authorProfile.firstName != ""
                          ? complaint.authorProfile.firstName
                          : "ไม่พบข้อมูล"
                      }}</b>
                    </div>
                    <div class="form-group row">
                      นามสกุล :
                      <b class="w-50">{{
                        complaint.authorProfile != null &&
                        complaint.authorProfile.lastName != ""
                          ? complaint.authorProfile.lastName
                          : "ไม่พบข้อมูล"
                      }}</b>
                    </div>
                    <div class="form-group row">
                      อีเมล :
                      <b class="w-50">{{
                        complaint.authorProfile != null &&
                        complaint.authorProfile.email != ""
                          ? complaint.authorProfile.email
                          : "ไม่พบข้อมูล"
                      }}</b>
                    </div>
                    <div class="form-group row">
                      เบอร์โทร :
                      <b class="w-50">{{
                        complaint.authorProfile != null &&
                        complaint.authorProfile.phoneNumber != ""
                          ? complaint.authorProfile.phoneNumber
                          : "ไม่พบข้อมูล"
                      }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-status" role="tabpanel">
            <div class="row">
              <div class="col-12 col-md-6 my-2">
                <div class="form-group row">
                  <label class="col-form-label col-12 text-lg-right text-left"
                    >รูปภาพประกอบ</label
                  >
                  <div class="col-12">
                    <dashboard :uppy="uppyImage" :props="{ theme: 'light' }" />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 my-2">
                <div class="form-group row mb-2">
                  <label class="col-form-label col-3 text-lg-right text-left"
                    >สถานะ
                  </label>
                  <div class="col-9">
                    <div class="mb-5">
                      <div
                        class="form-check form-check-custom form-check-solid"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          value="0"
                          v-model="statusComplains.statusCode"
                          name="cb_statusComplains"
                          id="flexRadioChecked"
                        />
                        <label class="form-check-label" for="flexRadioChecked"
                          >รอดำเนินการ </label
                        >{{
                          dataStatus0.updateDate
                            ? " ( " +
                              formatDateTime(dataStatus0.updateDate) +
                              " ) "
                            : ""
                        }}
                      </div>
                    </div>
                    <div class="mb-5">
                      <div
                        class="form-check form-check-custom form-check-solid"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          value="1"
                          v-model="statusComplains.statusCode"
                          name="cb_statusComplains"
                          id="flexRadioChecked1"
                        />
                        <label class="form-check-label" for="flexRadioChecked1"
                          >ระหว่างดำเนินการ</label
                        >
                        {{
                          dataStatus1.updateDate
                            ? " ( " +
                              formatDateTime(dataStatus1.updateDate) +
                              " ) "
                            : ""
                        }}
                      </div>
                    </div>
                    <div class="mb-5">
                      <div
                        class="form-check form-check-custom form-check-solid"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          value="2"
                          v-model="statusComplains.statusCode"
                          name="cb_statusComplains"
                          id="flexRadioChecked2"
                        />
                        <label class="form-check-label" for="flexRadioChecked2"
                          >ยกเลิกการดำเนินการ</label
                        >
                        {{
                          dataStatus2.updateDate
                            ? " ( " +
                              formatDateTime(dataStatus2.updateDate) +
                              " ) "
                            : ""
                        }}
                      </div>
                    </div>
                    <div class="mb-5">
                      <div
                        class="form-check form-check-custom form-check-solid"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          value="3"
                          v-model="statusComplains.statusCode"
                          name="cb_statusComplains"
                          id="flexRadioChecked3"
                        />
                        <label class="form-check-label" for="flexRadioChecked3"
                          >ดำเนินการแล้วเสร็จ</label
                        >
                        {{
                          dataStatus3.updateDate
                            ? " ( " +
                              formatDateTime(dataStatus3.updateDate) +
                              " ) "
                            : ""
                        }}
                      </div>
                    </div>
                  </div>
                </div>
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
                        v-model="complaint.pushnotification"
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
                    >หมายเหตุ</label
                  >
                  <div class="col-9">
                    <input
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      v-model="statusComplains.remark"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-comment" role="tabpanel">
            <div class="row">
              <div class="col-12" v-if="listComment">
                <div
                  class="card"
                  v-for="(item, index) in listComment"
                  :key="index"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12 col-md-2 text-center mt-auto mb-auto">
                        <img
                          :src="setUrl(item.data.authorProfile.imageProfile)"
                          width="100"
                          height="100"
                          class="img-avatar"
                          onerror="this.onerror=null;this.src='assets/img/no-profile-image.png';"
                        />
                      </div>
                      <div class="col-12 col-md-10">
                        <div class="row">
                          <div class="col">
                            <b
                              >ผู้ใช้งาน :
                              {{ item.data.authorProfile.firstName }}
                              {{ item.data.authorProfile.lastName }}</b
                            >
                            <p>
                              วันที่ :
                              {{ formatDateTime(item.data.createDate) }}
                            </p>
                            <hr />
                            <b>ความคิดเห็น : {{ item.data.description }}</b>
                          </div>

                          <div class="col">
                            <button
                              class="btn btn-danger"
                              style="float: right"
                              type="button"
                              @click="deleteComment(item.data.id)"
                            >
                              <span class="fa fa-trash"></span>
                            </button>
                          </div>
                        </div>
                        <hr />
                        <div class="row" v-if="item.data.picturesPath">
                          <div
                            class="col-12 col-md-4"
                            v-for="(itemImg, indexImg) in item.data
                              .picturesPath"
                            :key="indexImg"
                          >
                            <img
                              :src="setUrl(itemImg)"
                              onerror="this.onerror=null;this.src='assets/img/no-image.jpg';"
                              class="w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div class="col-12">
                <div class="card card-info">
                  <div class="card-block">
                    <textarea
                      placeholder="แสดงความคิดเห็นที่นี่!"
                      class="form-control form-control-lg form-control-solid"
                      aria-invalid="false"
                      v-model="descriptionComment"
                    ></textarea>

                    <div class="btn-group"></div>
                    <div class="row w-100">
                      <div class="col">
                        <button
                          class="btn btn-light-success"
                          type="button"
                          @click="clickInputImage"
                        >
                          <span class="svg-icon svg-icon-2"
                            ><svg
                              version="1.1"
                              viewBox="0 0 24 24"
                              height="24px"
                              width="24px"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                <path
                                  d="M6,5 L18,5 C19.6568542,5 21,6.34314575 21,8 L21,17 C21,18.6568542 19.6568542,20 18,20 L6,20 C4.34314575,20 3,18.6568542 3,17 L3,8 C3,6.34314575 4.34314575,5 6,5 Z M5,17 L14,17 L9.5,11 L5,17 Z M16,14 C17.6568542,14 19,12.6568542 19,11 C19,9.34314575 17.6568542,8 16,8 C14.3431458,8 13,9.34314575 13,11 C13,12.6568542 14.3431458,14 16,14 Z"
                                  fill="currentColor"
                                ></path>
                              </g></svg
                          ></span>
                        </button>
                        <b class="text-success mt-auto mb-auto ml-3"
                          >แนบไฟล์ภาพ
                          <span v-if="fileComment.length > 0">
                            {{ fileComment.length }}</span
                          ></b
                        >
                        <input
                          multiple=""
                          id="comment-image"
                          type="file"
                          @change="getfileComment($event)"
                          hidden=""
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                      </div>
                      <div class="col" style="text-align: right">
                        <button
                          style="text-align: rigth"
                          class="btn btn-primary mt-5"
                          @click="sendComment()"
                          type="button"
                        >
                          <i class="fa fa-edit"></i> แสดงความคิดเห็น
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-score" role="tabpanel">
            <div class="row" v-if="complaint.rate">
              <!-- <b
                  >ผู้ใช้งาน :
                  {{
                    complaint.rate.authorProfile
                      ? complaint.rate.authorProfile.firstName +
                        " " +
                        complaint.rate.authorProfile.lastName
                      : "ไม่พบชื่อผู้ใช้งาน"
                  }}</b
                > -->
              <hr />
              <div class="rating">
                <label class="btn btn-light fw-bolder btn-sm me-3">
                  คะแนนผู้อัปเดต</label
                >
                <div v-for="n in 5" :key="n">
                  <div
                    :class="
                      n == complaint.rate.rateUpdate
                        ? 'rating-label checked'
                        : 'rating-label'
                    "
                  >
                    <span class="svg-icon svg-icon-5x">
                      <inline-svg
                        src="media/icons/duotune/general/gen029.svg"
                      />
                    </span>
                  </div>
                </div>
                <p>ความคิดเห็นผู้อัปเดต : {{ complaint.rate.commentUpdate }}</p>
              </div>
              <div class="rating">
                <label class="btn btn-light fw-bolder btn-sm me-3">
                  คะแนนระยะเวลาการดำเนินงาน</label
                >
                <div v-for="n in 5" :key="n">
                  <div
                    :class="
                      n == complaint.rate.rateDuration
                        ? ' checked'
                        : 'rating-label'
                    "
                  >
                    <span class="svg-icon svg-icon-5x">
                      <inline-svg
                        src="media/icons/duotune/general/gen029.svg"
                      />
                    </span>
                  </div>
                </div>
                <p>
                  ความคิดเห็นระยะเวลาการดำเนินงาน :
                  {{ complaint.rate.commentDuration }}
                </p>
              </div>
            </div>
            <div class="row" v-else>
              <div class="rating">
                <label class="btn btn-light fw-bolder btn-sm me-3">
                  ไมพบข้อมูลคะแนน</label
                >
                <div v-for="n in 5" :key="n">
                  <div class="rating-label">
                    <span class="svg-icon svg-icon-5x">
                      <inline-svg
                        src="media/icons/duotune/general/gen029.svg"
                      />
                    </span>
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
// import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import axios from "axios";
import jQuery from "jquery";
const $ = jQuery;
import { useRoute } from "vue-router";
import Editor from "@tinymce/tinymce-vue";
import "vue3-tree/dist/style.css";
import Multiselect from "@vueform/multiselect";
const complaint = ref({});
const statusComplains = ref([]);
const dataStatus0 = ref([]);
const dataStatus1 = ref([]);
const dataStatus2 = ref([]);
const dataStatus3 = ref([]);
const listComment = ref([]);
const searchText = ref("");
const category = ref([]);
const deletePictures = [];
const clear = ref(false);
const fileComment = ref([]);
const descriptionComment = ref("");
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import * as Yup from "yup";
import { Form } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import router from "@/router";
const uppy = new Uppy({
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ["image/*"],
  },
});
uppy.on("file-removed", (file) => {
  if (file.data == "null" && clear.value == false) {
    deletePictures.push(file.name);
  }
});
const uppyVideo = new Uppy({
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
const uppyAudio = new Uppy({
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ["audio/*"],
  },
});
uppyAudio.on("file-removed", (file) => {
  if (file.data == "null" && clear.value == false) {
    deletePictures.push(file.name);
  }
});
const uppyImage = new Uppy({
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ["image/*"],
  },
});
uppyImage.on("file-removed", (file) => {
  if (file.data == "null" && clear.value == false) {
    deletePictures.push(file.name);
  }
});
const titleId = ref({
  value: 0,
  options: [],
  searchable: true,
});
const categoryId = ref({
  value: 0,
  options: [],
  searchable: true,
});
export default {
  components: {
    editor: Editor,
    Dashboard,
    Form,
    KTPageTitle,
    Multiselect,
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
    const complaintModal = Yup.object().shape({
      //   sequence: Yup.string().required("กรุณาระบุ ลำดับ"),
      //   title: Yup.string().required("กรุณาระบุ หัวข้อ"),
      // password: Yup.string().min(4).required().label("Password"),
    });
    onMounted(() => {
          let dataList = uppy.getFiles();
      if (dataList.length > 0) {
        for (let index = 0; index < dataList.length; index++) {
          const loopclear = dataList[index];
          uppy.removeFile(loopclear.id);
        }
      }
      let dataListVideo = uppyVideo.getFiles();
      if (dataListVideo.length > 0) {
        for (let index = 0; index < dataListVideo.length; index++) {
          const loopclear = dataListVideo[index];
          uppyVideo.removeFile(loopclear.id);
        }
      }
      let dataListImage = uppyImage.getFiles();
      if (dataListImage.length > 0) {
        for (let index = 0; index < dataListImage.length; index++) {
          const loopclear = dataListImage[index];
          uppyImage.removeFile(loopclear.id);
        }
      }
      let dataListAudio = uppyAudio.getFiles();
      if (dataListAudio.length > 0) {
        for (let index = 0; index < dataListAudio.length; index++) {
          const loopclear = dataListAudio[index];
          uppyAudio.removeFile(loopclear.id);
        }
      }
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/category" +
            "?categoryType=complain&root=false&groupId=" +
            localStorage.getItem("groupId"),
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then(({ data }) => {
          console.log(data);
          if (data.data.length > 0) {
            for (const loopData of data.data) {
              titleId.value.options.push({
                value: loopData.categoryCode,
                name: loopData.categoryName,
                image:
                  loopData.categoryImage != ""
                    ? process.env.VUE_APP_API_URL_IMAGE + loopData.categoryImage
                    : "media/image/no-image.jpg",
              });
            }
          }
        })
        .catch(({ error }) => {
          console.log(error);
        });
      if (router.params.id) {
        axios
          .get(
            process.env.VUE_APP_API_URL +
              "/inboxComplain" +
              "?id=" +
              router.params.id +
              "&groupId=" +
              localStorage.getItem("groupId"),
            {
              headers: { token: localStorage.getItem("id_token") },
            }
          )
          .then(({ data }) => {
            complaint.value = data.data.content[0];
            if (
              complaint.value.authorProfile != null &&
              complaint.value.authorProfile.imageProfile != null
            ) {
              if (
                complaint.value.authorProfile.imageProfile.indexOf("https") > -1
              ) {
                console.log(complaint.value.authorProfile.imageProfile);
              } else {
                complaint.value.authorProfile.imageProfile =
                  process.env.VUE_APP_API_URL_IMAGE +
                  complaint.value.authorProfile.imageProfile;
              }
            }
            if (complaint.value.pin == 1) {
              complaint.value.pin = true;
            } else {
              complaint.value.pin = false;
            }
            if (complaint.value.picturesPath.length > 0) {
              for (let loopPicturesPath of complaint.value.picturesPath) {
                uppy.addFile({
                  name: loopPicturesPath, // image name
                  type: "image/jpeg",
                  data: "null",
                  source: process.env.VUE_APP_API_URL_IMAGE + loopPicturesPath,
                  remote: true,
                });
              }
            }

            if (complaint.value.titleId != null) {
              titleId.value.value = complaint.value.titleId;
              getCategory(titleId.value.value);
              setTimeout(() => {
                categoryId.value.value = complaint.value.category;
              }, 500);
            }
            if (complaint.value.statusComplains.length > 0) {
              for (const loopStatus of complaint.value.statusComplains) {
                if (loopStatus.statusCode == complaint.value.currentStatus) {
                  statusComplains.value = loopStatus;
                }
                if (loopStatus.statusCode == 0) {
                  dataStatus0.value = loopStatus;
                } else if (loopStatus.statusCode == 1) {
                  dataStatus1.value = loopStatus;
                } else if (loopStatus.statusCode == 2) {
                  dataStatus2.value = loopStatus;
                } else if (loopStatus.statusCode == 3) {
                  dataStatus3.value = loopStatus;
                }
              }
              if (statusComplains.value.picturesPath.length > 0) {
                for (let loopPicturesPath of statusComplains.value
                  .picturesPath) {
                  uppyImage.addFile({
                    name: loopPicturesPath, // image name
                    type: "image/jpeg",
                    data: "null",
                    source:
                      process.env.VUE_APP_API_URL_IMAGE + loopPicturesPath,
                    remote: true,
                  });
                }
              }
            }
            getComment(complaint.value.complainId, complaint.value.flgPrivate);

            if (complaint.value.videoPath.length > 0) {
              for (let loopPicturesPath of complaint.value.videoPath) {
                uppyVideo.addFile({
                  name: loopPicturesPath, // image name
                  type: "video/*",
                  data: "null",
                  source: process.env.VUE_APP_API_URL_IMAGE + loopPicturesPath,
                  remote: true,
                });
              }
            }
            if (complaint.value.audioPath.length > 0) {
              for (let loopPicturesPath of complaint.value.audioPath) {
                uppyAudio.addFile({
                  name: loopPicturesPath, // image name
                  type: "audio/*",
                  data: "null",
                  source: process.env.VUE_APP_API_URL_IMAGE + loopPicturesPath,
                  remote: true,
                });
              }
            }
          })
          .catch(({ error }) => {
            console.log(error);
          });
      } else {
        complaint.value = {
          id: "",
          sequence: "",
          title: "",
          description: "",
          buttonName: "",
          buttonUrl: "",
          youtube: "",
          category: "",
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
      // this.complaint.category = category.value;
    };

    const onNodeClick = (node) => {
      node.checked = node[0].checked;
    };

    const getCategory = (code) => {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/category" +
            "?categoryType=complain&root=true&groupId=" +
            localStorage.getItem("groupId") +
            "&parentCategory=" +
            code,
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then(({ data }) => {
          console.log(data);
          if (data.data.length > 0) {
            for (const loopData of data.data) {
              categoryId.value.options.push({
                value: loopData.categoryCode,
                name: loopData.categoryName,
                image:
                  loopData.categoryImage != ""
                    ? process.env.VUE_APP_API_URL_IMAGE + loopData.categoryImage
                    : "media/image/no-image.jpg",
              });
            }
          }
        })
        .catch(({ error }) => {
          console.log(error);
        });
    };
    const getComment = (complainId, flgPrivate) => {
      listComment.value = [];
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/getCommentComplain" +
            "?complainId=" +
            complainId,
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then(({ data }) => {
          if (data.data.content.length > 0) {
            for (const loopData of data.data.content) {
              listComment.value.push({
                data: loopData,
                flgPrivate: flgPrivate,
              });
            }
          }
        })
        .catch(({ error }) => {
          console.log(error);
        });
    };
    const sendComment = () => {
      if (descriptionComment.value != null && descriptionComment.value != "") {
        let formData = new FormData();
        formData.append("complainId", complaint.value.complainId);
        formData.append("description", descriptionComment.value);
        if (fileComment.value.length > 0) {
          for (const loopfile of fileComment.value) {
            if (loopfile != "null") {
              formData.append("picturesPath", loopfile);
            }
          }
        }
        axios
          .post(process.env.VUE_APP_API_URL + "/commentComplain", formData, {
            headers: { token: localStorage.getItem("id_token") },
          })
          .then((res) => {
            getComment(complaint.value.complainId, complaint.value.flgPrivate);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const deleteComment = (id) => {
      let formData = new FormData();
      formData.append("id ", id);
      axios
        .post(
          process.env.VUE_APP_API_URL + "/deleteCommentComplain",
          formData,
          {
            headers: { token: localStorage.getItem("id_token") },
          }
        )
        .then((res) => {
          console.log(res);
          getComment(complaint.value.complainId, complaint.value.flgPrivate);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      searchText,
      category,
      complaint,
      uppy,
      onNodeExpanded,
      onUpdate,
      onNodeClick,
      complaintModal,
      uppyVideo,
      uppyAudio,
      uppyImage,
      titleId,
      categoryId,
      getCategory,
      statusComplains,
      dataStatus0,
      dataStatus1,
      dataStatus2,
      dataStatus3,
      listComment,
      getComment,
      fileComment,
      descriptionComment,
      sendComment,
      deleteComment,
    };
  },
  methods: {
    setUrl(img) {
      if (img != null) {
        return process.env.VUE_APP_API_URL_IMAGE + img;
      } else {
        return "media/image/no-image.jpg";
      }
    },
    clickInputImage() {
      this.$nextTick(() => {
        $("#comment-image").click();
      });
    },
    getfileComment(event) {
      fileComment.value = [];
      if (event.target.files.length > 0) {
        for (const loopFile of event.target.files) {
          fileComment.value.push(loopFile);
        }
      }
      //   this.file = event.target.files;
    },
    onFileChange(event) {
      this.file = event.target.files[0];
      complaint.value.thumbnailsPath = URL.createObjectURL(this.file);
    },
    // uppy-Dashboard-Item-previewImg
    previewImage() {
      this.$nextTick(() => {
        setTimeout(() => {
          // alert($(".uppy-Dashboard-Item-previewImg").length);
          $(document).on(
            "click",
            ".uppy-Dashboard-Item-previewImg",
            function (event) {
              $("#btn-preview").click();
              $("#image-preview").attr("src", event.target.currentSrc);
            }
          );
        }, 1000);
      });
    },

    handleUpformdate() {
      let formData = new FormData();
      formData.append("id", complaint.value.id);
      formData.append("titleId", titleId.value.value);
      formData.append("description", complaint.value.description);
      formData.append("latitude", complaint.value.latitude);
      formData.append("longitude", complaint.value.longitude);
      formData.append("placeName", complaint.value.placeName);
      formData.append("category", categoryId.value.value);
      axios
        .post(process.env.VUE_APP_API_URL + "/editComplain", formData, {
          headers: { token: localStorage.getItem("id_token") },
        })
        .then((res) => {
          console.log(res);
          let formData = new FormData();
          formData.append("id", complaint.value.id);
          formData.append("statusCode", statusComplains.value.statusCode);
          formData.append("remark", statusComplains.value.remark);
          if (uppyImage.getFiles().length > 0) {
            for (let loopFile of uppyImage.getFiles()) {
              if (loopFile.data != "null") {
                formData.append("picturePath", loopFile.data);
              }
            }
          }
          formData.append(
            "pushnotification ",
            complaint.value.pushnotification != undefined?complaint.value.pushnotification:false
          );
          axios
            .post(
              process.env.VUE_APP_API_URL + "/adminManageStatusComplain",
              formData,
              {
                headers: { token: localStorage.getItem("id_token") },
              }
            )
            .then((res) => {
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
            });
        })
        .catch((error) => {
          console.log(error);
        });
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
