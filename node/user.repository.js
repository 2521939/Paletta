const pool = require('./db');

class UsersRepository {
    async createPost(idPos, titulo, descricao, resolucao, comuniOutros) {
        const query = 'INSERT INTO posts (idPos, titulo, descricao, resolucao, comuniOutros) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [idPos, titulo, descricao, resolucao, comuniOutros];
        try {
            const res = await pool.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error('Error creating post:', err);
            throw err;
        }
    }

    async getPostById(idPos) {
        const query = 'SELECT * FROM posts WHERE idPos = $1';
        try {
            const res = await pool.query(query, [idPos]);
            return res.rows[0];
        } catch (err) {
            console.error('Error fetching post:', err);
            throw err;
        }
    }

    async getAllPosts() {
        const query = 'SELECT * FROM posts';
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            console.error('Error fetching posts:', err);
            throw err;
        }
    }

    async updatePost(idPos, titulo, descricao, resolucao, comuniOutros) {
        const query = 'UPDATE posts SET titulo = $2, descricao = $3, resolucao = $4, comuniOutros = $5 WHERE idPos = $1 RETURNING *';
        const values = [idPos, titulo, descricao, resolucao, comuniOutros];
        try {
            const res = await pool.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error('Error updating post:', err);
            throw err;
        }
    }

    async deletePost(idPos) {
        const query = 'DELETE FROM posts WHERE idPos = $1 RETURNING *';
        try {
            const res = await pool.query(query, [idPos]);
            return res.rows[0];
        } catch (err) {
            console.error('Error deleting post:', err);
            throw err;
        }
    }
}

module.exports = new UsersRepository();