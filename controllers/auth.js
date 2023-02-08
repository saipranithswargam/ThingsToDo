const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getLogin = (req,res)=>{
    res.render('auth/login')
}

exports.getSignup = (req,res)=>{
    res.render('auth/signup')
}

exports.postSignup = (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email}).then(user=>{
        if(user){
            return res.redirect("/signup");
        }
        bcrypt.hash(password,12).then(hashedPassword=>{
            const user = new User({name:name,email:email,password:hashedPassword});
            user.save().then(result=>{
                res.redirect("/login");
            }).catch(err=>{
                console.log(err)
            })
    }).catch(err=>{
        console.log(err);
    })
})
}

exports.postLogin = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email}).then(user=>{
        if(!user){
            console.log("No user found with that email");
            return res.redirect("/login");
        }
        bcrypt.compare(password,user.password).then(Match=>{
            if(Match){
                req.session.isLoggedIn = true;
                req.session.user= user;
                return req.session.save(err=>{
                    if(err){
                    console.log(err);
                    return res.redirect("/login");
                    }
                 return res.render("profile/profile");
                })
            }
            res.redirect('/login');
        }).catch(err=>{
            console.log(err);
            res.redirect('/login');
        })
    }).catch(err=>{
        console.log(err)
    })
}