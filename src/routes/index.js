const { Router } = require("express");
const router = Router();
const sessionView = require("../utils/sessionView");
const verifySession = require("../middleware/verifySession");

const generalController = require("../controllers/general.controller");

// index login
router.get('/', async (req, res) => {
    if (!req.session.user) {
        delete req.session.user;
        delete req.session.token;
        return res.render('login', {
            title: 'Login'
        });
    }

    res.redirect('/panel');
});


// login signin
router.post('/signin', async (req, res) => {
    const user = await generalController.getUser(req.body);

    if(user.success == true){
        req.session.user = user.my;
        req.session.token = user.token;
        res.redirect('/panel');

    } else {
        delete req.session.user;
        delete req.session.token;
        res.json(user);
        res.redirect('/');
    }
});


// panel
router.get('/panel', verifySession(), async (req, res) => {
    sessionView.renderView(req, res, "panel/", "Panel", req.session);
});


// logout
router.get('/logout',(req, res) => {
    delete req.session.user;
    res.redirect("/");
});


module.exports = router;
