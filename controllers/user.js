exports.getProfilePage = ((req,res)=>{
    res.send("user homepage");
})

exports.getCollectionPage = ((req,res)=>{
    res.render("profile/create-collection.ejs")
})