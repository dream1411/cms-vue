import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "สถิติภาพรวม",
          breadcrumbs: ["สถิติภาพรวม"],
        },
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/user/UserList.vue"),
        meta: {
          pageTitle: "สมาชิก",
          breadcrumbs: ["สมาชิก"],
        },
      },
      {
        path: "/users/manage/:id",
        name: "Usermanage",
        component: () => import("@/views/user/UserManage.vue"),
        meta: {
          pageTitle: "แก้ไขสมาชิก",
          breadcrumbs: ["แก้ไขสมาชิก"],
        },
      },
      {
        path: "/users/create",
        name: "Usercreate",
        component: () => import("@/views/user/UserManage.vue"),
        meta: {
          pageTitle: "เพิ่มสมาชิก",
          breadcrumbs: ["เพิ่มสมาชิก"],
        },
      },
      {
        path: "/banner",
        name: "banner",
        component: () => import("@/views/banner/BannerList.vue"),
        meta: {
          pageTitle: "ป้ายประชาสัมพันธ์",
          breadcrumbs: ["ป้ายประชาสัมพันธ์"],
        },
      },
      {
        path: "/banner/manage/:id",
        name: "Bannermanage",
        component: () => import("@/views/banner/BannerManage.vue"),
        meta: {
          pageTitle: "แก้ไขป้ายประชาสัมพันธ์",
          breadcrumbs: ["แก้ไขป้ายประชาสัมพันธ์"],
        },
      },
      {
        path: "/banner/create",
        name: "Bannercreate",
        component: () => import("@/views/banner/BannerManage.vue"),
        meta: {
          pageTitle: "เพิ่มป้ายประชาสัมพันธ์",
          breadcrumbs: ["เพิ่มป้ายประชาสัมพันธ์"],
        },
      },
      {
        path: "/banner",
        name: "banner",
        component: () => import("@/views/banner/BannerList.vue"),
        meta: {
          pageTitle: "ป้ายประชาสัมพันธ์",
          breadcrumbs: ["ป้ายประชาสัมพันธ์"],
        },
      },
      {
        path: "/banner/manage/:id",
        name: "Bannermanage",
        component: () => import("@/views/banner/BannerManage.vue"),
        meta: {
          pageTitle: "แก้ไขป้ายประชาสัมพันธ์",
          breadcrumbs: ["แก้ไขป้ายประชาสัมพันธ์"],
        },
      },
      {
        path: "/banner/create",
        name: "Bannercreate",
        component: () => import("@/views/banner/BannerManage.vue"),
        meta: {
          pageTitle: "เพิ่มป้ายประชาสัมพันธ์",
          breadcrumbs: ["เพิ่มป้ายประชาสัมพันธ์"],
        },
      }, {
        path: "/group",
        name: "group",
        component: () => import("@/views/group/GroupList.vue"),
        meta: {
          pageTitle: "จัดการกลุ่ม",
          breadcrumbs: ["จัดการกลุ่ม"],
        },
      },
      {
        path: "/group/manage/:id",
        name: "Groupmanage",
        component: () => import("@/views/group/GroupManage.vue"),
        meta: {
          pageTitle: "แก้ไขกลุ่ม",
          breadcrumbs: ["แก้ไขกลุ่ม"],
        },
      },
      {
        path: "/group/create",
        name: "Groupcreate",
        component: () => import("@/views/group/GroupManage.vue"),
        meta: {
          pageTitle: "เพิ่มกลุ่ม",
          breadcrumbs: ["เพิ่มกลุ่ม"],
        },
      },
      {
        path: "/news",
        name: "news",
        component: () => import("@/views/news/NewsList.vue"),
        meta: {
          pageTitle: "ข่าวประชาสัมพันธ์",
          breadcrumbs: ["ข่าวประชาสัมพันธ์"],
        },
      },
      {
        path: "/news/manage/:id",
        name: "Newsmanage",
        component: () => import("@/views/news/NewsManage.vue"),
        meta: {
          pageTitle: "แก้ไขข่าวประชาสัมพันธ์",
          breadcrumbs: ["แก้ไขข่าวประชาสัมพันธ์"],
        },
      },
      {
        path: "/news/create",
        name: "Newscreate",
        component: () => import("@/views/news/NewsManage.vue"),
        meta: {
          pageTitle: "เพิ่มข่าวประชาสัมพันธ์",
          breadcrumbs: ["เพิ่มข่าวประชาสัมพันธ์"],
        },
      },
      {
        path: "/weblink",
        name: "weblink",
        component: () => import("@/views/weblink/WeblinkList.vue"),
        meta: {
          pageTitle: "จัดการบริการ",
          breadcrumbs: ["จัดการบริการ"],
        },
      },
      {
        path: "/weblink/manage/:id",
        name: "weblinkmanage",
        component: () => import("@/views/weblink/WeblinkManage.vue"),
        meta: {
          pageTitle: "แก้ไขบริการ",
          breadcrumbs: ["แก้ไขบริการ"],
        },
      },
      {
        path: "/weblink/create",
        name: "weblinkcreate",
        component: () => import("@/views/weblink/WeblinkManage.vue"),
        meta: {
          pageTitle: "เพิ่มบริการ",
          breadcrumbs: ["เพิ่มบริการ"],
        },
      },
      {
        path: "/complaint",
        name: "complaint",
        component: () => import("@/views/complaint/ComplaintList.vue"),
        meta: {
          pageTitle: "ขอความช่วยเหลือ แจ้งเหตุ",
          breadcrumbs: ["ขอความช่วยเหลือ แจ้งเหตุ"],
        },
      },
      {
        path: "/notice",
        name: "notice",
        component: () => import("@/views/notice/NoticeList.vue"),
        meta: {
          pageTitle: "แจ้งเตือน แจ้งเหตุ",
          breadcrumbs: ["แจ้งเตือน แจ้งเหตุ"],
        },
      },
      {
        path: "/event",
        name: "event",
        component: () => import("@/views/event/EventList.vue"),
        meta: {
          pageTitle: "ปฏิทินกิจกรรม",
          breadcrumbs: ["ปฏิทินกิจกรรม"],
        },
      },
      {
        path: "/service",
        name: "service",
        component: () => import("@/views/service/ServiceList.vue"),
        meta: {
          pageTitle: "จุดบริการ",
          breadcrumbs: ["จุดบริการ"],
        },
      },
      {
        path: "/knowledge",
        name: "knowledge",
        component: () => import("@/views/knowledge/KnowledgeList.vue"),
        meta: {
          pageTitle: "คลังเนื้อหา",
          breadcrumbs: ["คลังเนื้อหา"],
        },
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("@/views/contact/ContactList.vue"),
        meta: {
          pageTitle: "ข้อมูลติดต่อเรา",
          breadcrumbs: ["ข้อมูลติดต่อเรา"],
        },
      },
      {
        path: "/category",
        name: "category",
        component: () => import("@/views/category/CategoryList.vue"),
        meta: {
          pageTitle: "หมวดหมู่ต่างๆ",
          breadcrumbs: ["หมวดหมู่ต่างๆ"],
        },
      },
      {
        path: "/category/create/:type",
        name: "category-create",
        component: () => import("@/views/category/CategoryManage.vue"),
        meta: {
          pageTitle: "เพิ่มหมวดหมู่",
          breadcrumbs: ["เพิ่มหมวดหมู่"],
        },
      },
      {
        path: "/category/manage/:id",
        name: "category-mreate",
        component: () => import("@/views/category/CategoryManage.vue"),
        meta: {
          pageTitle: "แก้ไขหมวดหมู่",
          breadcrumbs: ["แก้ไขหมวดหมู่"],
        },
      },
      // {
      //   path: "/builder",
      //   name: "builder",
      //   component: () => import("@/views/LayoutBuilder.vue"),
      //   meta: {
      //     pageTitle: "Layout Builder",
      //     breadcrumbs: ["Layout"],
      //   },
      // },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/components/page-layouts/Profile.vue"),
        meta: {
          breadcrumbs: ["Pages", "Profile"],
        },
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () =>
              import("@/views/crafted/pages/profile/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () =>
              import("@/views/crafted/pages/profile/Projects.vue"),
            meta: {
              pageTitle: "Projects",
            },
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () =>
              import("@/views/crafted/pages/profile/Campaigns.vue"),
            meta: {
              pageTitle: "Campaigns",
            },
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
            meta: {
              pageTitle: "Documents",
            },
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
            meta: {
              pageTitle: "Connections",
            },
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
            meta: {
              pageTitle: "Activity",
            },
          },
        ],
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
        meta: {
          pageTitle: "Horizontal",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/pages/wizards/vertical",
        name: "vertical-wizard",
        component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
        meta: {
          pageTitle: "Vertical",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          breadcrumbs: ["Crafted", "Account"],
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
            meta: {
              pageTitle: "Settings",
            },
          },
        ],
      },
      {
        path: "/apps/customers/getting-started",
        name: "apps-customers-getting-started",
        component: () => import("@/views/apps/customers/GettingStarted.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/customers/customers-listing",
        name: "apps-customers-listing",
        component: () => import("@/views/apps/customers/CustomersListing.vue"),
        meta: {
          pageTitle: "Customers Listing",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/customers/customer-details",
        name: "apps-customers-details",
        component: () => import("@/views/apps/customers/CustomerDetails.vue"),
        meta: {
          pageTitle: "Customers Details",
          breadcrumbs: ["Apps", "Customers"],
        },
      },
      {
        path: "/apps/subscriptions/getting-started",
        name: "apps-subscriptions-getting-started",
        component: () =>
          import("@/views/apps/subscriptions/GettingStarted.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/subscription-list",
        name: "apps-subscriptions-subscription-list",
        component: () =>
          import("@/views/apps/subscriptions/SubscriptionList.vue"),
        meta: {
          pageTitle: "Getting Started",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/add-subscription",
        name: "apps-subscriptions-add-subscription",
        component: () =>
          import("@/views/apps/subscriptions/AddSubscription.vue"),
        meta: {
          pageTitle: "Add Subscription",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/subscriptions/view-subscription",
        name: "apps-subscriptions-view-subscription",
        component: () =>
          import("@/views/apps/subscriptions/ViewSubscription.vue"),
        meta: {
          pageTitle: "View Subscription",
          breadcrumbs: ["Apps", "Subscriptions"],
        },
      },
      {
        path: "/apps/calendar",
        name: "apps-calendar",
        component: () => import("@/views/apps/Calendar.vue"),
        meta: {
          pageTitle: "Calendar",
          breadcrumbs: ["Apps"],
        },
      },
      {
        path: "/apps/chat/private-chat",
        name: "apps-private-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
          pageTitle: "Private Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/apps/chat/group-chat",
        name: "apps-group-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
          pageTitle: "Group Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/apps/chat/drawer-chat",
        name: "apps-drawer-chat",
        component: () => import("@/views/apps/chat/DrawerChat.vue"),
        meta: {
          pageTitle: "Drawer Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () =>
          import("@/views/crafted/modals/general/InviteFriends.vue"),
        meta: {
          pageTitle: "Invite Friends",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
        meta: {
          pageTitle: "View User",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () =>
          import("@/views/crafted/modals/general/UpgradePlan.vue"),
        meta: {
          pageTitle: "Upgrade Plan",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () =>
          import("@/views/crafted/modals/general/ShareAndEarn.vue"),
        meta: {
          pageTitle: "Share And Earn",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
        meta: {
          pageTitle: "New Target",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
        meta: {
          pageTitle: "New Card",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
        meta: {
          pageTitle: "New Address",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
        meta: {
          pageTitle: "Create Api Key",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () =>
          import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
        meta: {
          pageTitle: "Two Factory Auth",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
        meta: {
          pageTitle: "Create App",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () =>
          import("@/views/crafted/modals/wizards/CreateAccount.vue"),
        meta: {
          pageTitle: "Create Account",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/views/crafted/widgets/Lists.vue"),
        meta: {
          pageTitle: "Lists",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/views/crafted/widgets/Statistics.vue"),
        meta: {
          pageTitle: "Statistics",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/views/crafted/widgets/Charts.vue"),
        meta: {
          pageTitle: "Charts",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/views/crafted/widgets/Mixed.vue"),
        meta: {
          pageTitle: "Mixed",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/views/crafted/widgets/Tables.vue"),
        meta: {
          pageTitle: "Tables",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/views/crafted/widgets/Feeds.vue"),
        meta: {
          pageTitle: "Feeds",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // current page view title
  document.title = `${to.meta.pageTitle} - ${process.env.VUE_APP_NAME}`;

  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  // verify auth token before each page change
  store.dispatch(Actions.VERIFY_AUTH, { "token": JwtService.getToken() });

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (store.getters.isUserAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
