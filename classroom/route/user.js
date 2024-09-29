const express = require("express");
const app = express();
const router = express.Router(); 
  
// Index - user 
 router.get("/" , ( req , res)=>{
 res.send("Get for users") ; 
 }) ; 


// show - user 
router.get("/:id" , ( req , res)=>{
    res.send("Get for users id") ; 
    }) ; 
   
   

// Post - user 
router.post("/" , ( req , res)=>{
    res.send("Post for users ") ; 
    }) ; 
   
   
// Delete - user 
router.delete("/:id" , ( req , res)=>{
    res.send("Delete for users id") ; 
    }) ; 
   
   
module.exports = router ; 