const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());

const base64Image = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABf0lEQVR42u2XMU4DQRBGb3EBKCiKgoioCEqKgoioCEqKgtiW4gWoC9iUZxkjTBE9xm8Zu/tOn+ZhNmZuWTvJzzskjxxu7DLKoCvYAJxQ8ZAZiLMzGHQ4TfBUnLAEfQkSPwJZK9hHeAnsl8KvmSA43kDlBbAQuIt3kDP0Bm6LZ/TxgAEaVDSYhswFC0xnQQVoIsTA0Ed9DJ8F1OwA+gUeR4TOeiAzx+EbTwTyAx8FmeRWCSKZLwDiMBZNm4JgXfGBVJJKJB+3A1kT0AkwMTK2nMKkM0eTe5CPAZQETuFqY9G+5yM/gEvzyW19bHLh8AM80SkkZy9RIRfNuJpYuk1yEqxM4W6cwIjAFqW8GME3nBWLgAAAABJRU5ErkJggg==";

const data = {
  professionalName: "Victor Provost",
  base64Image: base64Image,
  nameLink: {
    firstName: "Victor",
    url: "https://alexrivera.dev"
  },
  primaryDescription: " A passionate full-stack developer who loves clean code and creative design.",
  workDescription1: "Currently building scalable web apps with Node.js and React.",
  workDescription2: "Previously worked at FinTech Labs and OpenAI as a software engineer.",
  linkTitleText: "Connect with me:",
  linkedInLink: {
    text: "LinkedIn Profile",
    link: "https://linkedin.com/in/victor-provost2001"
  },
  githubLink: {
    text: "GitHub Profile",
    link: "https://github.com/Victorprovost"
  }
};

app.get('/professional', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

