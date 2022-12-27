const express = require('express');
const router = express.Router();
const main =require('../scrapeFun/scrape')

//sending homepage
// router.get('/',async(req,res)=>{
//     const htmlPath =path.join(__dirname,'public','index.html');
//     res.sendFile(htmlPath);
//   })

router.post('/indeed', async(req, res) =>{
    try{
        let  skill  = req.body.skill;
        console.log(skill);
        let scrp = await main(skill);
        console.log("status is ok")
        return res.status(200).json({
            status: "ok",
            list : scrp?.list || {},
        })
    }catch(e){
        return res.status(500).send(e);
    }
})



module.exports = router;