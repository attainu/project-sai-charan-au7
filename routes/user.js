import express from 'express';
import router from express.Router();
import {getUserById,follow,unfollow,updatebanner,updateprofilepic,search} from '../controllers/user.js'

router.get("/user/:id",RequireLogin,getUserById)
router.put('/follow',RequireLogin,follow)
router.put('/unfollow',RequireLogin,unfollow)
router.put('/updatebanner',RequireLogin,updatebanner)
router.put('/updateprofilepic',RequireLogin,updateprofilepic)
router.post('/search',RequireLogin,search)