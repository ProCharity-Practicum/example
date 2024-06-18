import {Api} from "uikit";


export class ProfileApi extends Api {
  getProfile(id) {
    return this._get(`/api/profile/${id}`);
  }
  updateProfile(id, profile) {
    const nextProfile = {};
    for (let key in profile) {
      if (profile[key] !== "") {
        nextProfile[key] = profile[key];
      }
    }
    return this._post(`/api/profile/${id}`, nextProfile, 'PATCH');
  }
}

export default new ProfileApi();
