const { Router } = require("express");
const router = Router();
const sessionView = require("../utils/sessionView");
const verifySession = require("../middleware/verifySession");

const userController = require("../controllers/user.controller");

// get users
router.get('/', verifySession(), async (req, res) => {
    sessionView.renderView(req, res, "users/index", "Usuarios", {});
});

router.get('/getUsers', async (req, res) => {
    const getFilters = Object.keys(req.params).length > 0
                    ? req.params
                    : req.query;

    let filters = {isActive: 1, isDeleted:0};

    if(getFilters["idUser"] != undefined && getFilters["idUser"] > 0){
        filters = {...filters, ...{"idUser": getFilters["idUser"]} };
    }

    const users = await userController.getAllUsers(req.session.token, filters);
    return res.status(200).json(users);
});


// add user
router.get('/add', verifySession(), async (req, res) => {
    sessionView.renderView(req, res, "users/add", "add", {});
});

router.post('/add', verifySession(), async (req, res) => {
    const users = await userController.addUsers(req.session.token, req.body);
    return res.status(200).json({success: users.success, message: users.message, id: users.data.insertId });
});


// details user
router.get('/details', verifySession(), async (req, res) => {
    const preId = req.query.id;
    const edit = req.query.e;

    if(!preId) return res.status(401).json({
        success: false,
        message: `incomplete fields, id undefined`
    });

    const filters = { id: preId };
    const users = await userController.getAllUsers(req.session.token, filters);

    const params = { edit };
    const data = { users:users.rows, params: params };
    sessionView.renderView(req, res, "users/details", "details", data);
});

router.put('/details', verifySession(), async (req, res) => {
    delete req.body.ckActive;
    const users = await userController.updUsers(req.session.token, req.body);
    return res.status(200).json({success: users.success, message: users.message});
});


module.exports = router;
