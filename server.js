import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({"Message":"App is running..."});
});

app.get("/usuarios", async(req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post("/usuarios", async (req, res) => {
    const dados = req.body;
    
    await prisma.user.create({
        data: {
            name: dados.nome,
            email: dados.email,
            age: dados.idade
        }
    })

    usuarios.push(dados);
    res.status(201).json(dados);
});


app.put("/usuarios/:id", async (req, res) => {
    const dados = req.body;
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: dados.nome,
            email: dados.email,
            age: dados.idade
        }
    });

    res.status(201).json(dados);
});

app.delete("/usuarios/:id", async(req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({ message: "Conseguimos deletar o usuário."});
});



app.listen(3000, () => {console.log("App is running...")});
