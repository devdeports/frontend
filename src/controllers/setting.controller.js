const methods = require("../utils/methods");

// add tag
exports.addTag = async (token, tag= {}) => {
    try {
        return await methods.sendPost(token, tag, "/api/menus/tagCreate");
    } catch (error) {
        console.log("error add tag.");
    }
};


// del tag
exports.delTag = async (token, tag= {}) => {
    try {
        return await methods.sendDelete(token, tag, "/api/menus/tag");
    } catch (error) {
        console.log("error add tag.");
    }
};
