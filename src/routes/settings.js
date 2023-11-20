const { Router } = require("express");
const router = Router();
const sessionView = require("../utils/sessionView");
const verifySession = require("../middleware/verifySession");

const settingController = require("../controllers/setting.controller");

// index login
router.get('/', verifySession(), async (req, res) => {
    res.send("hola->list");
    res.redirect('/list');
});


// tags list
router.get('/tags', verifySession(), async (req, res) => {
    // list tags
    //const tags = await restaurantController.getTags(req.session.token, {});
    const tags = [];
    sessionView.renderView(req, res, "setting/tags", "Tags", tags.data);
});


// tags add
router.post('/tags', verifySession(), async (req, res) => {
    const { tag } = req.body;
    const data = await settingController.addTag(req.session.token, {tag:tag.trim()});
    return res.status(200).json({success: data.success, message: data.message});
});


// tags del
router.delete('/tags', verifySession(), async (req, res) => {
    const { tag } = req.body;
    const data = await settingController.delTag(req.session.token, {tag:tag});
    return res.status(200).json({success: data.success, message: data.message});
});


module.exports = router;
