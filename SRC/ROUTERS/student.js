const express =  require('express');
/*1 Registere the router*/
const router = new express.Router();

//2 We need to define a Router
router.get("/thapa",(req,res)=>
{
    res.send("Hii how are you");
})
module.exports = router