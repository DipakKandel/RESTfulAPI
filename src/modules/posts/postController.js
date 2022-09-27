const articlesModel = require("./post.model");
const jwt = require('jsonwebtoken')
const postController = {};



postController.newPost = (req,res,next)=>{

    if(!req.body.content){
        return res.json('no content found in body')
    }
    try{
    const author_email = req.user.email;
    const { author_Name, title, content } = req.body;
    let model = new articlesModel({ author_Name,author_email, title, content });
        const doc = model.save();
        res.send(model);
    //return res.json('post is successfully save in the database')
    
   }
   catch(err){
    next(err)
   }
}

postController.articles = async (req,res,next)=>{
    // res.send('here are all the written articles')
       await console.log(req.user)
      //  await console.log(req.body.author_Name);
        if (!req.user.email) {
          return res.status(400).send("Copy login token to headers first");
        }
        articlesModel.find({author_email: req.user.email}, function(err,docs){
            if(docs){
              if(docs.length){
              return res.send(docs)
              }
              else{
                return res.send("there are no articles written by logged in user")
              }
            }
            next(err)
            
          })
           // .then((doc) => {
          //   if(doc == null){
          //     return res.send("there are no articles written by logged in user")
          //   }
          //   res.json(doc);
          // })
          // .catch((err) => {
          //   next(err)
          // });
}






module.exports = postController;