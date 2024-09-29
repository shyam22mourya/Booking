const express = require("express");
const app = express();
const router = express.Router(); 

// Index - user 
 router.get("/" , ( req , res)=>{
 res.send("Get for post") ; 
 }) ; 


// show - user 
router.get("/:id" , ( req , res)=>{
    res.send("Get for post id") ; 
    }) ; 
   
   

// Post - user 
router.post("/" , ( req , res)=>{
    res.send("Post for post ") ; 
    }) ; 
   
   
// Delete - user 
router.delete("/:id" , ( req , res)=>{
    res.send("Delete for post id") ; 
    }) ; 
   
   
    module.exports = router ; 
