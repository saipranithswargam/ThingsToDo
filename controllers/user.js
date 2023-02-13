exports.getProfilePage = ((req,res)=>{
    res.send("user homepage");
})

exports.getCollectionPage = ((req,res)=>{
    res.render("profile/create-collection.ejs",{title:"collectionPage"})
})

exports.getDashboard = ((req,res)=>{
    res.render("profile/profile",{title:"dashboard"});
})

exports.postCollectionPage = ((req,res)=>{
    console.log(req.body.color,req.body.collectionName)
    res.send("ok")
})