// login
module.exports.registerPost = (req, res, next) => {
    if(!req.body.fullName){
        req.flash("error", 'Vui lòng nhập họ tên!');
        res.redirect("back");
        return;
    }

    if(!req.body.email){
        req.flash("error", 'Vui lòng nhập email!');
        res.redirect("back");
        return;
    }

    if(req.body.password < 8){
        req.flash("error", 'Vui lòng nhập mật khẩu ít nhất 8 kí tự!');
        res.redirect("back");
        return;
    }

    next();
}

//loginPost
module.exports.loginPost = (req, res, next) => {


    if(!req.body.email){
        req.flash("error", 'Vui lòng nhập email!');
        res.redirect("back");
        return;
    }

    if(req.body.password < 8){
        req.flash("error", 'Vui lòng nhập mật khẩu ít nhất 8 kí tự!');
        res.redirect("back");
        return;
    }

    next();
}