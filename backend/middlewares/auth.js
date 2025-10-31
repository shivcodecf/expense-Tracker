import jwt from "jsonwebtoken";


function getTokenFromReq(req) {
  const cookieToken = req.cookies?.token;
  if (cookieToken) return cookieToken;
  const header = req.headers?.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}


export function authOptional(req, _res, next) {
  const token = getTokenFromReq(req);
  if (!token) return next();

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET not configured");
    return next();
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = { id: String(payload.id) };
  } catch (err) {
    
    console.warn("authOptional: invalid token:", err.message);
   
  }
  return next();
}


export function authRequired(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = { id: String(payload.id) };
    return next();
  } catch (err) {
    console.warn("authRequired: invalid token:", err.message);
   
    return res.status(401).json({ error: "Invalid token" });
  }
}
