import express, { Request, Response } from "express";
import cors from "cors";
import { Field } from "./types";
import { makeID } from "./lib/utils";

const app = express();
app.use(cors());
app.use(express.json());

const DB: DB = {
  SAVED_FORMS: [],
};

// *** SAVE FORM IN DB ***
app.post(
  "/form-builder/form",
  (req: Request<{}, {}, Field[]>, res: Response) => {
    const data = req.body;

    const formToSave: Form = {
      id: makeID(),
      fields: data,
    };

    DB.SAVED_FORMS.push(formToSave);

    return res.json({
      data: formToSave,
      error: null,
      message: "Form saved successfully",
    });
  },
);

// *** GET A SINGLE FORM BY ID FROM DB ***
app.get(
  "/form-builder/form/:id",
  (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const form = DB.SAVED_FORMS.find((form) => form.id === id);

    if (!form) {
      return res.status(404).json({
        data: null,
        error: "Form not found",
        message: "No form with the provided ID",
      });
    }

    return res.json({
      data: form,
      error: null,
      message: "Form fetched successfully",
    });
  },
);

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

type Form = {
  id: string;
  fields: Field[];
};

type DB = {
  SAVED_FORMS: Form[];
};
