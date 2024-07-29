import express from "express";
import pkg from 'body-parser'
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(cors());
app.use(pkg());

app.post("/tasks", async (req, res) => {
  const { taskName, taskTime, taskDate, importance } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        taskName,
        taskTime,
        taskDate: new Date(taskDate),
        importance,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
