import jwt from "jsonwebtoken";

export function authOptional(req, _res, next) {
  const token = req.cookies?.token;  
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
  } catch (e) {
    
  }
  next();
}

// export function authRequired(req, res, next) {
//   const token = req.cookies?.token; 
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: payload.id };
//     next();
//   } catch (e) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }
