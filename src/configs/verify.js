module.exports = {
    isLogin(req, res, next){
        if(req.headers.authorization === true){
            next();
            return;
        } else {
            req.session.destroy(function(err) {
                res.redirect('/login');
            })
        }
    },
    isLogout(req, res, next){
        if(req.headers.authorization == ''){
            next();
            return;
        }
        res.redirect('/');
    },
    isAdmin(req, res, next) {
        console.log('headers', req.headers.role)
        if (req.headers && req.headers.role && req.headers.role == 1) {
            return next();
        } 
        return res.status(401).send('Unauthorized');
    }
};