import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import qs from "qs";
import axios from "axios";
export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  api_token: string;
}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {};
  user = {} as User;
  isAuthenticated = !!JwtService.getToken();

  /**
   * Get current user object
   * @returns User
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  get currentUser(): Object {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    localStorage.setItem("u_id", user.id)
    localStorage.setItem("dataInfo", JSON.stringify(user))
    if (user.role != null) {
      if (user.role.adminGroups.length > 0) {
      localStorage.setItem("groupId", user.role.adminGroups[0])
      }
      if (user.role.isSuperAdmin) {
        localStorage.setItem("superAdmin", user.role.isSuperAdmin)
      }
    }
    this.user = user;
    this.errors = {};
    JwtService.saveToken(user.token);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Action
  [Actions.LOGIN](credentials) {
    console.log(credentials);
    /* eslint-disable */
    return ApiService.post("loginAdmin", credentials ? qs.stringify({ username: credentials.username, password: credentials.password })
      : credentials)
      .then(({ data }) => {
        console.log(data.data.profile);
        this.context.commit(Mutations.SET_AUTH, data.data.profile);
        this.context.commit(Mutations.SET_USER, data.data.profile);
      })
      .catch(({ error }) => {
        console.log(error);
        this.context.commit(Mutations.SET_ERROR, ["เข้าสู่ระบบไม่สำเร็จ"]);
      });
    /* eslint-disable */
  }
  @Action
  [Actions.CLEARCACHE]() {
    /* eslint-disable */
    return axios.get("clearCache", {
      headers: { token: localStorage.getItem("id_token") },
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ error }) => {
        console.log(error);
      });
    /* eslint-disable */
  }
  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post("forgot_password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.VERIFY_AUTH](payload) {
    if (JwtService.getToken()) {
      axios
        .get(
          process.env.VUE_APP_API_URL +
          "/getUserAll" +
          "?sizeContents=9999&page=0&role=",
          {
            headers: payload,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.context.commit(Mutations.SET_ERROR, "เซสชั่นหมดอายุ");
          this.context.commit(Mutations.PURGE_AUTH);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
