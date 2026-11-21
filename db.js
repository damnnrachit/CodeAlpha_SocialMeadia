const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'chirp.db'));
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE COLLATE NOCASE, display_name TEXT NOT NULL, password_hash TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', avatar_url TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, content TEXT NOT NULL CHECK(length(content) BETWEEN 1 AND 280), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, content TEXT NOT NULL CHECK(length(content) BETWEEN 1 AND 280), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS likes (user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(user_id, post_id));
CREATE TABLE IF NOT EXISTS follows (follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(follower_id, following_id), CHECK(follower_id <> following_id));
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC); CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id, created_at DESC); CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id, created_at); CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id); CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
`);
module.exports = db;
