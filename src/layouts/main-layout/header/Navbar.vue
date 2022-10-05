<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Search-->
    <div class="app-navbar-item align-items-stretch ms-1 ms-lg-3">
      <KTSearch />
    </div>
    <!--end::Search-->
    <!-- <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
        id="kt_activities_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/general/gen032.svg" />
        </span>
      </div>
    </div>
    <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/general/gen022.svg" />
        </span>
      </div>
      <KTNotificationMenu />
    </div> -->
    <!--end::Notifications-->
    <!--begin::Chat-->
    <!-- <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative"
        id="kt_drawer_chat_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/communication/com012.svg" />
        </span>
        <span
          class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"
        ></span>
      </div>
    </div>
    <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/general/gen025.svg" />
        </span>
      </div>
      <KTQuickLinksMenu />
    </div> -->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <a
        href="#"
        class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <span
          v-if="themeMode === 'light'"
          class="svg-icon theme-dark-hide svg-icon-2"
        >
          <inline-svg src="media/icons/duotune/general/gen060.svg" />
        </span>
        <span v-else class="svg-icon theme-light-hide svg-icon-2">
          <inline-svg src="media/icons/duotune/general/gen061.svg" />
        </span>
      </a>
      <KTThemeModeSwitcher />
    </div>
    <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
      <div
        class="cursor-pointer symbol symbol-35px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img
          :src="
            profile.imageProfile != null
              ? imageUrl + profile.imageProfile
              : 'media/avatars/blank.png'
          "
          alt="user" style="object-fit: cover;"
        />
      </div>
      <KTUserMenu />
    </div>
    <div class="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
      <div
        class="btn btn-icon btn-active-color-primary w-35px h-35px"
        id="kt_app_header_menu_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import KTSearch from "@/layouts/main-layout/search/Search.vue";
import KTNotificationMenu from "@/layouts/main-layout/menus/NotificationsMenu.vue";
import KTQuickLinksMenu from "@/layouts/main-layout/menus/QuickLinksMenu.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "header-navbar",
  components: {
    KTSearch,
    // KTNotificationMenu,
    // KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  data() {
    return {
      profile: localStorage.getItem("dataInfo")
        ? JSON.parse(localStorage.getItem("dataInfo"))
        : null,
      imageUrl: process.env.VUE_APP_API_URL_IMAGE,
    };
  },
 watch: {
    $route(to, from) {
      this.profile = JSON.parse(localStorage.getItem("dataInfo"))
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });
    if (localStorage.getItem("dataInfo") == null) {
      store
        .dispatch(Actions.LOGOUT)
        .then(() => router.push({ name: "sign-in" }));
    }
    return {
      themeMode,
    };
  },
});
</script>
