/**
 * A request function handled with promise
 * @param  method  the method used for the request
 * @param url the url to ask datas
 * @returns
 */

export function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(method, url);
        request.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            } else {
                reject({
                    status: this.status,
                    statusText: request.statusText,
                });
            }
        };
        request.send();
    });
}
