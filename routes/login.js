const express = require('express');
const router = express.Router();
const User = require('../models/User')

/**google login */
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "474974886312-eedu33sqssrco1s0kd9v63gdee2kldei.apps.googleusercontent.com " //client id from google Oauth
const googleUser = new OAuth2Client(CLIENT_ID);

/**google login route */
router.post('/google-login',(req,res)=>{
    let token = req.body.token
    async function verify() {
        const ticket = await googleUser.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        
        let newUser =  new User({
            email: payload['email'],
            name : payload['name'],
            image : payload['picture']
        })
        if (payload['hd'] == 'turntabl'){
            newUser.save()
            .then((response)=>{
                res.json({data:response})
            })
            .catch((error)=>{
                res.json({data:error})
            })
        }
    }
      verify()
      .then((response)=>{
          res.status(200).json({status:'success', message:'login success', data:response})
      })
      .catch((error)=>{
          res.status(400).json({status:'error', message:'an error occured', data: error})
      });

})

router.post('/login',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let idToken = req.body.idToken;

    const newUser = new User({
        name,email,idToken
    })
    console.log(newUser)
    newUser.save()
    .then((response)=>{
        res.status(200).json({status:'success', message: 'user added', data:response})
    })
    .catch((error)=>{
        res.status(400).json({status:'error', message:'an error occured', data:error})
    })
})

module.exports = router;