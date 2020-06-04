/* eslint-disable no-unused-vars */
import axios from "axios";
/**
 * Form Helper to simplify form handlinding with Axios
 */
export default class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data form field to be submitted
     * @returns {object} instanceof the class
     */
    constructor(data) {
        this.originalData = data;
        this.lastError = null;
        for (let field in data) {
            this[field] = data[field];
        }
    }

    /**
     * Get form fields
     *
     * @returns {object} the submitted form data
     */
    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    /**
     * Reset the form fields
     *
     * @returns {void} 
     */
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    /**
     * Send a POST request to the given URL.
     * 
     * @param {string} url
     * @returns {function} returns a promisified result
     */
    post(url) {
        return this.submit('post', url);
    }

    /**
     * Send a GET request to the given URL.
     * 
     * @param {string} url
     * @returns {function} returns a promisified result
     */
    get(url) {
        return this.submit('get', url);
    }

    /**
     * Send a PUT request to the given URL.
     * 
     * @param {string} url
     *  @returns {function} returns a promisified result
     */
    put(url) {
        return this.submit('put', url);
    }

    /**
     * Send a PATCH request to the given URL.
     * 
     * @param {string} url
     * @returns {function} returns a promisified result
     */
    patch(url) {
        return this.submit('patch', url);
    }

    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     * @returns {function} returns a promisified result
     */
    delete(url) {
        return this.submit('delete', url);
    }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     *  @returns {Promise} returns a promisified result
     */
    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);

                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response);
                    reject({
                        ...error.response.data,
                        status: error.response.status
                    });
                });
        });
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     * @returns {void}
     */
    onSuccess(data) {
        if (this.resetOnSucess) {
            this.reset();
        }
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     * @returns {void}
     */
    onFail(errors) {
        this.lastError = errors;
    }
}