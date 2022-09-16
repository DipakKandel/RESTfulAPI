const articlesModel = require("./post.model");

const postController = {};



postController.newPost = (req,res,next)=>{

    if(!req.body.content){
        return res.json('no content found in body')
    }
    try{
    const { author_Name, title, content } = req.body;
    let model = new articlesModel({ author_Name, title, content });
        const doc = model.save();
        res.send(model);
    //return res.json('post is successfully save in the database')
    
   }
   catch(err){
    res.json(err)
   }
}

postController.articles = (req,res,next)=>{
    // res.send('here are all the written articles')
        console.log(req.body.author_Name);
        if (!req.body.author_Name) {
          return res.status(400).send("missing body parameter: author name");
        }
        articlesModel
          .find({
            author_Name: req.body.author_Name,
          })
          .then((doc) => {
            res.json(doc);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      

}



module.exports = postController;