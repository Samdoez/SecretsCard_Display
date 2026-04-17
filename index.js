// HINTS: // 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 2. Create an express app and set the port number. // 3. Use the public folder for static files.
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://secrets-api.appbrewery.com/random";

// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the secret and the username of the secret.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const result = response.data; //this extract the main data from the Axios response object
    console.log(result);
    res.render("index.ejs", { secret: result.secret, user: result.username });
  } catch (error) { 
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Failed to get a response, check Url.",
    });
  }
});

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});