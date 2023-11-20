const methods = require("../utils/methods");

// get rols
exports.getAllRols = async (token, filters = {}) => {
    try {
        const rols = await methods.sendGet(token, filters, "/api/users/");
 
         if(rols.success === true){
             for (let item of rols.data) {
                 item.IconActive = item.IsActive == 1 ? '<i class="fa-regular fa-circle-check text-success"></i>' : '<i class="fa-regular fa-circle-xmark text-danger">';
             }
         }
 
         return {
             success: rols.success, 
             total: rols.data.length,
             totalNotFiltered: 0,
             rows: rols.data
         };
 
    } catch (error) {
       console.log("error get rols.");
    }
 };


// add user
exports.addRols = async (token, user = {}) => {
    try {
        return await methods.sendPost(token, user, "/api/rols/");
    } catch (error) {
        console.log("error add users.");
    }
};





// get user
exports.getAllUsers = async (token, filters = {}) => {
   try {
       const users = await methods.sendGet(token, filters, "/api/users/");

        if(users.success === true){
            for (let item of users.data) {
                item.IconActive = item.IsActive == 1 ? '<i class="fa-regular fa-circle-check text-success"></i>' : '<i class="fa-regular fa-circle-xmark text-danger">';
            }
        }

        return {
            success: users.success, 
            total: users.data.length,
            totalNotFiltered: 0,
            rows: users.data
        };

   } catch (error) {
      console.log("error get users.");
   }
};

// upd user
exports.updUsers = async (token, user = {}) => {
    try {
        return await methods.sendPut(token, user, "/api/users/");
    } catch (error) {
        console.log("error upd users.");
    }
};

//  { success: false, message: 'Not Authorized to access this route' }