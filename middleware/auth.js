
const jwt = require("jsonwebtoken")
// is Loggedin checkAuth

const isLoggedIn = async (req, res, next) =>{
    const authHeader =req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message: "Unautorized, Invalid token"})
    }
    const token = authHeader.split(" ")[1]

    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        if(!payLoad){
            return res.status(401).json({message: "Unauthorized to perform action"})
        }
        req.user ={
            email: payLoad.email,
            role: payLoad.role,
            userid: payLoad.userid
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Authentication failed"})
    }
}

// have the required permission

const requirePermission = (...roles)=>{
    return (req, res, next)=>{
           if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Unauthorized to access this route"})
           }
    }
    next()
}
module.exports = {isLoggedIn, requirePermission }