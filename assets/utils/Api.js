const isDevEnv = process.env.NODE_ENV === 'development';

export default class Api {
  /**
   * Entity name (api endpoint).
   *
   * @type {string}
   */
  #resource;

  /**
   * @param {string} resource
   */
  constructor(resource) {
    this.#resource = resource;
  }

  /**
   * Sends request to resource
   * and returns response promise.
   *
   * @param {Function} resolve
   *
   * @param {Function} reject
   *
   * @returns Promise
   */
  create(resolve, reject) {
    return this.#sendRequest('post', resolve, reject)
  }

  /**
   * API request factory.
   *
   * @param {string} method
   *
   * @param {Function} resolve
   *
   * @param {Function} reject
   *
   * @returns Promise
   */
  #sendRequest(method, resolve = null, reject = null) {
    if (resolve && typeof resolve !== 'function') {
        throw new Error('First argument must be a function.');
    }

    if (reject && typeof reject !== 'function') {
        throw new Error('Second argument must be a function.');
    }

    return fetch(`/api/${this.#resource}`, {
      method,
      // headers: {
      //   'Content-Type': 'application/json'
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
      // body: JSON.stringify({}),
    }).then(response => {
      isDevEnv && console.debug(response);

      if (!response.ok) {
        return Promise.reject(`${response.status} Error response`);
      }

      return response.json();
    }).then(data => {
      isDevEnv && console.debug(data);

      resolve && resolve(data);
    }).catch(reason => {
      isDevEnv && console.error(reason);

      reject && reject();
    });
  }
}
