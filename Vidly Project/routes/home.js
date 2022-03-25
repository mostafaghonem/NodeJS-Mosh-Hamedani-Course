const express = require('express');
const router = express.Router();

router.get('/' , (req,res)=>{
    res.render('index' , {title:'Vidly' , message:'Hello on vidly website'});
})

module.exports = router;