require('dotenv').config();

const moment = require("moment-timezone");
const axios = require('axios').default;
const jwtDecode = require("jwt-decode");

const host = process.env.URL_BACK;
const protocol =  'http://';


// get user authenticated
exports.getUser = async (userdata) => {
   try {
      const user = await authenticate(userdata, "/api/auth/signin");
      if(user.success === true){
         const decodedToken = jwtDecode(user.token);
         return {
            success: user.success,
            my: {
               ...decodedToken.userApp.user,
               rol: decodedToken.userApp.rol,
               extraInfo: decodedToken.userApp.extraInfo,
               timeZone: decodedToken.timeZone
            },
            token: user.token
         };
         // iat: decodedToken.iat, exp: decodedToken.exp
      } else {
         return user;
      }

   } catch (error) {
      console.log("login error.");
   }
};


// Obtener bitacora
exports.getRecord = async (socialEmployee = undefined) => {
   const dateStart = moment(moment.tz('America/Bogota')).add(-1, 'd').startOf('day').utc().format('YYYY-MM-DD HH:mm:ss');
   const dateEnd = moment.utc(moment.tz('America/Bogota')).format();
};


// login
async function authenticate(mydata, myurl) {
   const url = protocol + host + myurl;

   try {
       const respuesta = await axios.post(url, mydata, {
           headers: { 'Content-Type': 'application/json' }
       });
       return respuesta.data;

   } catch (error) {
      if (error.response.status === 401) {
         return error.response.data;
      } else {
         console.log(error);
      }
   }
};
