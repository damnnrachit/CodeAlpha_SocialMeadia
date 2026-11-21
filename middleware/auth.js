const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET = process.env.JWT_SECRET || 'chirp-local-secret-change-me';
function auth(req, res, next) { const h = req.headers.authorization || ''; if (!h.startsWith('Bearer ')) return res.status(401).json({error:'Authentication required'}); try { const p = jwt.verify(h.slice(7), SECRET); req.user = db.prepare('SELECT id, username, display_name, bio, avatar_url, created_at FROM users WHERE id=?').get(p.id); if (!req.user) throw Error(); next(); } catch { res.status(401).json({error:'Invalid or expired token'}); } }
function token(user) { return jwt.sign({id:user.id}, SECRET, {expiresIn:'7d'}); }
module.exports = {auth, token};
