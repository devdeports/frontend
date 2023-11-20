module.exports = () => {
    return function (req, res, next) {
        if (!req.session.user) {
            console.log("No Active Session");
            delete req.session.user;
            delete req.session.token;
            return res.redirect('/');
        }
        next();
    }
};
