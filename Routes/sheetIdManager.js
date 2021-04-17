const router = require("express").Router();
const SheetIdManager = require("../Models/sheetIdManger");

//post sheetId, email, refreshtoken

router.post("/post/sheetId",(req,res)=>{
      
    const sheetId = new SheetIdManager({
        email:req.body.email,
        sheetId:req.body.sheetId,
        refreshToken:req.body.refreshToken,
    })
    sheetId.save().then(result=>{
        res.json({
            data:result
        })
    }).catch(err=>{
        res.status(400).json({
            data:err.message
        })
    })
})

//get sheetId
router.get("/fetch/sheetId/:email",(req,res)=>{
      
     SheetIdManager.findOne({email:req.params.email},(err,found)=>{
         if(err)
         {
             res.status(400).json({data:err.message});
         }
         if(found)
         {
             res.json({
                 data:found
             })
         }
         else{
             res.status(404).json({
                 data:"not found"
             })
         }
     })
})

//update token
router.patch("/update/token",(req,res)=>{
      SheetIdManager.updateOne({email:req.body.email},{$set:{refreshToken:req.body.refreshToken}},{new:true},(err,result)=>{
           
          if(err)
          {
              res.status(400).json({
                  data:err
              })
          }else
          {
              res.json({
                  data:result
              })
          }
      })
       
})




module.exports = router;