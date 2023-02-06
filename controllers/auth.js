exports.getLogin = (req,res)=>{
    res.render('auth/signup')
}

exports.getSignup = (req,res)=>{
    res.send("signup page")
}