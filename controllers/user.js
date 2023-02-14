const Collection = require("../models/collection");
const mongoose = require('mongoose');
const { collection } = require("../models/collection");
exports.getCollectionPage = (req, res) => {
    res.render("profile/create-collection.ejs", { title: "collectionPage" });
};
exports.getDashboard = (req, res) => {
    const userId = req.user._id;
    Collection.find({ userId: userId })
    .then((collections) => {
        console.log(new Date().toLocaleTimeString()); //greatings based on time is not yet done
        const userName = req.user.name;
        res.render("profile/profile", {title: "dashboard",
            collections: collections,
            userName: userName,
        });
    });
};

exports.postCollectionPage = (req, res) => {
    const collectionName = req.body.collectionName;
    const userId = req.user._id;
    const color = req.body.color;
    const collection = new Collection({
        name: collectionName,
        color: color,
        userId: userId,
    });
    collection
        .save()
        .then((collection) => {
            res.redirect("/user/dashboard");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getViewMore = ((req,res)=>{
    const objId = mongoose.Types.ObjectId(req.params.id);
    Collection.findById(objId).then(collection=>{
        res.render("profile/view-more",{title:"viewmore",collection:collection});
    }).catch(err=>{
        console.log(err);
    })

})

exports.postViewMore = ((req,res)=>{
    const NewTask = req.body.taskAdded;
    const id = req.body.id;
    const objId = mongoose.Types.ObjectId(id);
    Collection.findById(objId).then(collection=>{
        collection.list.push(NewTask);
        return collection.save();
    }).then(result=>{
        res.redirect(`/view-more/${id}`);
    }).catch(err=>{
        console.log(err);
    })
})

exports.postDeleteTask = ((req,res)=>{
    const id = req.body.collectionId;
    const index = req.body.index;
    const objId = mongoose.Types.ObjectId(id);
    Collection.findById(objId).then(collection=>{
        collection.list.splice(index,1);
        return collection.save();
    }).then(result=>{
        res.redirect(`/view-more/${id}`);
    }).catch(err=>{
        console.log(err);
    })
})

exports.postDeleteCollection = ((req,res)=>{
    const id = req.body.id;
    console.log(id);
    const objId = mongoose.Types.ObjectId(id);
    Collection.findByIdAndDelete(objId).then(result=>{
        res.redirect("/user/dashboard");
    }).catch(err=>{
        console.log(err);
    })
})

exports.getCustomiseCollection = ((req,res)=>{
    const id = req.params.id;
    const objId = mongoose.Types.ObjectId(id);
    Collection.findById(objId).then(collection=>{
        res.render("profile/customise",{collection:collection,title:"CustomiseCollection"});
    }).catch(err=>{
        console.log(err);
    })
})

exports.postCustomiseCollection = ((req,res)=>{
    const id = req.body.id;
    const changedColor = req.body.color;
    const changedName = req.body.collectionName;
    const objId = mongoose.Types.ObjectId(id);
    Collection.findById(objId).then(collection=>{
        collection.name = changedName;
        collection.color = changedColor;
        return collection.save();
  }).then(result=>{
    res.redirect("/user/dashboard");
  })
  .catch(err=>{
    console.log(err)
  })
})