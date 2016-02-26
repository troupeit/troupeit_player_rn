// ApiUtils.js
import config from '../utils/config.js';

class ApiUtils { 

  checkStatus(response) {
    // https://github.com/github/fetch
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      console.log(response);
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  static loginHeaders(method, key) {
	return {  
	    method: 'GET',
	    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-Auth': key,
		'Host': config.apiHost,
		'User-Agent': 'troupeIT player beta v0.1'
	    }
	}
  }
}

module.exports = ApiUtils;

