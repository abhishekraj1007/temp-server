const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

const ADJECTIVES = [
  "autumn",
  "hidden",
  "bitter",
  "misty",
  "silent",
  "empty",
  "dry",
  "dark",
  "summer",
  "icy",
  "delicate",
  "quiet",
  "white",
  "cool",
  "spring",
  "winter",
  "patient",
  "twilight",
  "dawn",
  "crimson",
  "wispy",
  "weathered",
  "blue",
  "billowing",
  "broken",
  "cold",
  "damp",
  "falling",
  "frosty",
  "green",
  "long",
  "late",
  "lingering",
  "bold",
  "little",
  "morning",
  "muddy",
  "old",
  "red",
  "rough",
  "still",
  "small",
  "sparkling",
  "throbbing",
  "shy",
  "wandering",
  "withered",
  "wild",
  "black",
  "young",
  "holy",
  "solitary",
  "fragrant",
  "aged",
  "snowy",
  "proud",
  "floral",
  "restless",
  "divine",
  "polished",
  "ancient",
  "purple",
  "lively",
  "nameless",
];

const NOUNS = [
  "waterfall",
  "river",
  "breeze",
  "moon",
  "rain",
  "wind",
  "sea",
  "morning",
  "snow",
  "lake",
  "sunset",
  "pine",
  "shadow",
  "leaf",
  "dawn",
  "glitter",
  "forest",
  "hill",
  "cloud",
  "meadow",
  "sun",
  "glade",
  "bird",
  "brook",
  "butterfly",
  "bush",
  "dew",
  "dust",
  "field",
  "fire",
  "flower",
  "firefly",
  "feather",
  "grass",
  "haze",
  "mountain",
  "night",
  "pond",
  "darkness",
  "snowflake",
  "silence",
  "sound",
  "sky",
  "shape",
  "surf",
  "thunder",
  "violet",
  "water",
  "wildflower",
  "wave",
  "water",
  "resonance",
  "sun",
  "wood",
  "dream",
  "cherry",
  "tree",
  "fog",
  "frost",
  "voice",
  "paper",
  "frog",
  "smoke",
  "star",
];

function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  return `${adjective} ${noun}`;
}

const USERS = Array.from({ length: 10 }, (a, b) => {
  return {
    id: `${b + 1}`,
    firstName: randomTitle(),
    age: 20 + Math.floor(Math.random() * 30),
    companyId: `${Math.floor(Math.random() * 10) || 1}`,
  };
});

const COMPANIES = [
  { id: "1", name: "Apple", description: "Iphone" },
  { id: "2", name: "Google", description: "Search" },
  { id: "3", name: "Microsoft", description: "Operating System" },
  { id: "4", name: "Facebook", description: "Social Media" },
];

// get list of all the users that we currwntly have
app.get("/users", (req, res) => {
  res.status(200).send(USERS);
});

// post a user
app.post("/users", (req, res) => {
  try {
    const currentLength = USERS.length;
    const data = { ...req.body, id: currentLength + 1 };
    USERS.push(data);
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong !!" });
  }
});

// delete a user
app.delete("/users/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = USERS.filter((user) => user.id !== id);
    console.log(result);
    res.status(200).send(null);
  } catch (error) {
    res.status(400).send("Something went wrong !!");
  }
});

// update a user
app.put("/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    for (let user of USERS) {
      if (user.id === id) {
        user = { ...updates };
        break;
      }
    }
    res.status(200).send(updates);
  } catch (error) {
    console.error(error);
    res.status(400).send("Something went wrong..");
  }
});

app.get("/users/:id", (req, res) => {
  const id = req?.params?.id || null;
  let result;

  if (id) {
    result = USERS.filter((user) => user.id === id);
  } else {
    result = USERS;
  }

  res.status(200).send(id ? result[0] : result);
});

app.get("/companies/:id", (req, res) => {
  const id = req?.params?.id || null;
  let result = COMPANIES.filter((com) => com.id === id);
  res.status(200).send(result[0]);
});

app.get("/companies/:id/users", (req, res) => {
  const id = req.params.id;
  const result = USERS.filter((user) => user.companyId === id);
  res.status(200).send(result);
});

app.listen(PORT, () => console.log("server is up"));
