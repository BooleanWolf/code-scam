import "./AddCard.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { mutate } from "swr";

export default function AddCard() {
  const [open, setOpen] = useState(false);

  async function addPeople(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());
    console.log({ body });
    const res = await fetch(
      "https://tinder-backend12112.herokuapp.com/tinder/Cards",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    await mutate(
      "/tinder/cards",
      (people) => {
        return [...people, { ...data, ...body }];
      },
      {
        revalidate: false,
      }
    );
    setOpen(false);
  }

  return (
    <div className="container">
      <button className="button" onClick={() => setOpen(true)}>
        Add Yourself
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        components={{ Root: "form" }}
        onSubmit={addPeople}
      >
        <DialogTitle>Enlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Your Name"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="imgUrl"
            name="imgUrl"
            label="Url of your image"
            type="url"
            fullWidth
            variant="outlined"
            size="small"
            helperText="FB Profile Pic"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="project"
            name="project"
            label="Project"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            helperText="The top sentence"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="language"
            name="language"
            label="Language/Course/Topic"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            helperText="Your favourite langugage/ course/topic/fieldof interest"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="contact"
            name="contact"
            label="Contact Link"
            type="url"
            fullWidth
            variant="outlined"
            size="small"
            helperText="FB ID Link"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
