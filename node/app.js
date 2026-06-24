const express = require('express');
const cors = require('cors');
const usersRepository = require('./user.repository');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/posts', async (req, res) => {
    const { idPos, titulo, descricao, resolucao, comuniOutros } = req.body;

    try {
        const user = await usersRepository.createPost(idPos, titulo, descricao, resolucao, comuniOutros);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Error creating post' });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const users = await usersRepository.getAllPosts();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: 'Error fetching posts' });
    }
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await usersRepository.getPostById(id);

        if (!user) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Error fetching post' });
    }
});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, resolucao, comuniOutros } = req.body;

    try {
        const user = await usersRepository.updatePost(id, titulo, descricao, resolucao, comuniOutros);

        if (!user) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Error updating post' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await usersRepository.deletePost(id);

        if (!user) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ error: 'Error deleting post' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
