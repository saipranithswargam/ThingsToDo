const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const config = {
    service:process.env.SERVICE,
    auth:{
        user:process.env.MAIL,
        pass:process.env.MAIL_PASS,
    }
}

const transporter = nodemailer.createTransport(config);

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
                 return res.redirect("/user/dashboard")
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

exports.postLogout = ((req,res)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect("/");
    })
})

exports.getReset=((req,res)=>{
    res.render("auth/reset",{title:"reset"});
})

exports.postReset=((req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err);
            return res.redirect("/reset");
        }
        const token = buffer.toString('hex')
        User.findOne({email:req.body.email}).then(user=>{
            if(!user){
                return res.redirect("/reset");
            }
            else{
                user.resetToken=token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            }
        }).then(result=>{
            res.redirect("/");
            let message = { from:'testingnode061229@gmail.com',
            to : req.body.email,
            subject:"Password Reset for T2DO",
            html:`
            <p>You requested a password reset </p>
            <p>click this <a href="http://localhost:3000/reset/${token}"> to reset your password.</p>
            `
        }
        transporter.sendMail(message);
        }).catch(err=>{
            console.log(err);
        })
    })
})

exports.getNewPassword = ((req,res)=>{
    const token = req.params.token;
    User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}}).then(user=>{
        res.render("auth/newPassword",{userId:user._id.toString(),passwordToken:token})
    }).catch(err=>{
        console.log(err);
    })
})

exports.postNewPassword = ((req,res)=>{
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser ;
    User.findOne({resetToken:passwordToken,resetTokenExpiration:{$gt:Date.now()},_id:userId}).then(user=>{
        resetUser = user;
        return bcrypt.hash(newPassword,12);
    }).then(hashedPassword=>{
        resetUser.password = hashedPassword;
        resetUser.resetToken = null;
        resetUser.resetTokenExpiration = null;
        return resetUser.save();
    }).then(reselt=>{
        res.redirect("/login");
    }).catch(err=>{
        console.log(err);
    })
})