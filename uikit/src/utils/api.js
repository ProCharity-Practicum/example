export const BASE_URL = import.meta.env.VITE_BASE_URL ?? window.location.origin;

export class ApiError extends Error {
  constructor(response, data = {}) {
    super(response.statusText);
    this.response = response;
    this.data = data;
  }

  get status() {
    return this.response.status;
  }

  get statusText() {
    return this.response.statusText;
  }

  get payload() {
    return this.data;
  }
}

export class Api {
  constructor(baseUrl = BASE_URL, options = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      ...options,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };
  }

  _getUrl(path, query = {}) {
    const url = new URL(path, this.baseUrl);
    Object.keys(query).forEach(key => {
      url.searchParams.append(key, query[key]);
    });
    return url.toString();
  }

  async _get(path, query) {
    return fetch(this._getUrl(path, query), {
      ...this.options,
      method: 'GET'
    }).then(this._checkResponse('json'));
  }

  async _post(path, data, method = 'POST') {
    return fetch(this._getUrl(path), {
      ...this.options,
      method,
      body: JSON.stringify(data)
    }).then(this._checkResponse('json'));
  }

  async _sendFile(path, file) {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(this._getUrl(path), {
      method: 'POST',
      body: formData
    }).then(this._checkResponse('json'));
  }

  async _sendFormData(path, data) {
    const formData = new URLSearchParams();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return fetch(this._getUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    }).then(this._checkResponse('text'));
  }

  async _download(path) {
    return fetch(this._getUrl(path), {
      ...this.options,
      method: 'GET'
    }).then(this._checkResponse('blob'));
  }

  async _head(path) {
    return fetch(this._getUrl(path), {
      ...this.options,
      method: 'HEAD'
    }).then(response => {
      if (!response.ok) {
        throw new ApiError(response);
      }
      return response.headers;
    });
  }

  _checkResponse = (type) => async (response) => {
    if (!response.ok) {
      throw new ApiError(response, (type === 'json') ? await response.json() : {});
    }
    return response[type]();
  }

  _tryAndRepeat = async (fn, fail, callNum = 0) => {
    try {
      return await fn();
    } catch (error) {
      if (fail(error, callNum)) {
        return this._tryAndRepeat(fn, fail, callNum + 1);
      }
      throw error;
    }
  }
}
