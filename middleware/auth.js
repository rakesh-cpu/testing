const jwt = require("jsonwebtoken");

// const auth = (req,res,next)=>{
//     const token = req.header("Authorization");

//     if(!token){
//         return res.status(401).send({
//             message:"Access denied. No token provided"});

//         }
//     try{
//         const decode = jwt.verify(token,process.env.JWTPRIVATEKEY);

//         req.user=decode;

//         next();
//     }catch(error){
//         console.log("Error verifying JWT",error);
//         res.status(401).send({
//             message: "Invalid token."
//         });

//     }    
        
// }

const auth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).send({
            message: "Access denied. No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWTPRIVATEKEY);
        req.user = decoded;
        console.log(req.user);
        console.log(req.user.email);
        next();
    } catch (error) {
        console.error("Error verifying JWT:", error.message);
        res.status(401).send({
            message: "Invalid token."
        });
    }
};



module.exports = auth;
