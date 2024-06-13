import {Api} from "uikit";

export class AuthApi extends Api {
  /**
   * Sign in to the application
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{id, role, account, created}>}
   */
  async login(username, password) {
    /** @type {{token: string, result: {id, role, account, created}}} */
    const {result, token} = await this._post("/api/login", {
      username,
      password
    });
    localStorage.setItem("token", token);
    this.options.headers["Authorization"] = `Bearer ${result.token}`;
    return result;
  }

  async logout() {
    //await this.post("/auth/logout");
    localStorage.removeItem("token");
    delete this.options.headers["Authorization"];
  }

  async me() {
    return await this._get("/api/me");
  }
}

export default new AuthApi();
