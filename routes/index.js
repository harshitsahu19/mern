var express = require('express');
var router = express.Router();
const userModel = require('./users')

router.get('/',function(req,res){
  res.render('index')
})

router.get('/create/:name/:age', async function(req, res) {
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



router.get('/ban',function(req,res){
    req.session.ban= true;
    res.send('<h1>You are banned!!!!</h1>');
})

router.get('/checkban',function(req,res){
  if(req.session.ban===true){

    res.send("you are banned")
  }else{
    res.send("You are not banned")
  }
  
})

router.get('/removeban',function(req,res){
  req.session.destroy(function(err){
   if (err) throw err;
    res.send('<h1>Ban removed</h1>');
  });
})


router.get('/cookies',function(req,res){
  res.cookie("age",25)
  res.render("index")
 
})

router.get('/readcookie',function(req,res){
  console.log(req.cookies.age);
  res.send("cookie value is on console ")
})
router.get('/deletecookie',function(req,res){
  res.clearCookie("age");
  res.send("cookie cleared")
})






module.exports = router;
