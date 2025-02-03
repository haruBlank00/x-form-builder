import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.post("/form-builder/form", (req: Request, res: Response) => {
  const data = req.body;

  console.log({ data });
  return res.json({
    data,
  });
});

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
