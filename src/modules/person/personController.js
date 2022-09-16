let personController = {};



personController.getPersonName = function(req,res){
    res.send(`You have requested a person ${req.params.name}`)
}

personController.getPerson = function(req,res){
    if((req.query.name)&&(req.query.age)){
        res.send(`You have requested a person ${req.query.name} of age ${req.query.age}`)
    }
    console.log(req.query);
    if(req.query.name){
        res.send(`You have requested a person ${req.query.name}`)
    }
    else
    {
    res.send("You have requested a person unspecified")
    }
}


module.exports = personController;