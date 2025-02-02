// puxa os modulos
import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json()); // Habilita o Express a ler JSON

// Conecta ao MongoDB 
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// define o schema com restricoes de unicidade e obrigatoriedade
const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    age: { type: Number, required: true },
    desc: { type: String, required: true },
});

// Cria o modelo "User" a partir do schema
const User = mongoose.model("User", UserSchema);

// Rota para cadastrar um usuario
app.post('/NewUser', async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        // Verifica se o erro é de duplicidade (código 11000)
        if (error.code === 11000) {
            return res.status(400).json({ error: "Nome de usuário já existe!" });
        }
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

// Rota para exibir todos os usuarios
app.get("/users", async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

// Rota para atualizar um user
app.put('/UpdateUser/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const userData = req.body;

        // Valida se ha ados para atualização
        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ error: "Nenhum dado enviado para atualização" });
        }

        // atualiza e retona 
        const updateUser = await User.findByIdAndUpdate(_id, userData, { new: true });

        if (!updateUser) {
            return res.status(404).json({ error: "Usuário inexistente" });

        }

        res.status(200).json(updateUser);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: "Erro ao editar o usuário", message: error.message });
    }
});

// server na port 3000
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));