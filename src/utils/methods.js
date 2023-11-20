require('dotenv').config();
const axios = require('axios').default;

const host = process.env.URL_BACK;
const protocol =  'http://';

// use endpoint post
exports.sendPost = async (token, mydata, myurl) => {
    const url = protocol + host + myurl;
    try {
        const respuesta = await axios.post(url, mydata, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
        return respuesta.data;

    } catch (error) {
        if (error.response.status >= 400) {
            return error.response.data;
        } else {
            console.log(error);
        }
    }
};


// use endpoint get params
exports.sendGet = async (token, filters, myurl) => {
    const url = protocol + host + myurl;
    try {
        const respuesta = await axios.get(url, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            },
            params: filters
        });
        return respuesta.data;

    } catch (error) {
        if (error.response.status >= 400) {
            return error.response.data;
        } else {
            console.log(error);
        }
    }
};


// get send data body
exports.sendGetData = async (token, filters, myurl) => {
    const url = protocol + host + myurl;
    try {
        const respuesta = await axios.get(url, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            },
            data: filters
        });
        return respuesta.data;

    } catch (error) {
        if (error.response.status >= 400) {
            return error.response.data;
        } else {
            console.log(error);
        }
    }
};


// use endpoint delete
exports.sendDelete = async (token, id, myurl) => {
    const url = protocol + host + myurl;
    try {
        const respuesta = await axios.delete(url, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            },
            data: id
        });
        return respuesta.data;

    } catch (error) {
        if (error.response.status >= 400) {
            return error.response.data;
        } else {
            console.log(error);
        }
    }
};


// use endpoint put
exports.sendPut = async (token, mydata, myurl) => {
    const url = protocol + host + myurl;
    try {
        const respuesta = await axios.put(url, mydata, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
        return respuesta.data;

    } catch (error) {
        if (error.response.status >= 400) {
            return error.response.data;
        } else {
            console.log(error);
        }
    }
};
