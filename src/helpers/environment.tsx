let APIURL = "";

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:5000';
        break;

    case 'jw-prody-client.herokuapp.com':
        APIURL = 'https://prodyserver.herokuapp.com/';
}

export default APIURL