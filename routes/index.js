var express = require('express');
var router = express.Router();
const userModel = require('./users')

router.get('/',function(req,res){
  res.render('index')
})

router.post('/create/:name/:age', async function(req, res) {
  const name = req.params.name; // we are taking name dynamically from url
  const age = req.params.age;  //  same here taking age dynamincally and 
  
  const createdUser = await userModel.create({
    username: "user_03",
    name: name,
    age: age,
  });

  res.send(createdUser);
});

router.get('/allusers', async function(req,res){
  let allusers = await userModel.find()
  res.send(allusers);
})

router.get('/delete/:name', async function(req,res){
  const name = req.params.name;

  let deleteduser = await userModel.findOneAndDelete(name)
  res.send(deleteduser);
})

router.put('/update/:name', async function(req, res) {
  const name = req.params.name; 
  const { newName, newAge } = req.body; 

  try {
   
    let updatedUser = await userModel.findOneAndUpdate(
      { name: name }, 
      { name: newName, age: newAge },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser); 
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});



module.exports = router;
