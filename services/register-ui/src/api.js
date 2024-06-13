import {Api} from "uikit";


export class RegisterApi extends Api {
  register(user) {
    return this._post("/api/register", user);
  }
}

export default new RegisterApi();
