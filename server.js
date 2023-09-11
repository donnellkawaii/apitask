require('dotenv').config();



const express = require('express');
const storeRoutes = require('./src/store/routes');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const app = express();
const port = 3000;


app.use(express.json());

//cors
app.use(cors({
  origin: 'http://127.0.0.1:5500',
}))
//cors

app.get("/", (req, res) =>{
  res.send("Hello World");
})

app.use("/api/v1/stores", storeRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));

//check if the username is on database
const apiEndpoint = 'http://localhost:3000/api/v1/stores';

app.get('/posts', authenticateToken, async (req, res) => {
  // console.log(apiEndpoint);
  try {
    const response = await axios.get(apiEndpoint);
    const filteredData = response.data.filter(post => post.name === req.user.name);
    res.json(filteredData);
    console.log(filteredData);
    console.log('Received data from API:', response.data);
    console.log('Filtered data based on username:', filteredData);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});

app.post('/login', async (req, res) => {
  try {
    // Authenticate user
    const apiResponse = await axios.get(apiEndpoint);
    const apiData = apiResponse.data;
    
    // Extract the username from the request body
    const username = req.body.username;
    const password = req.body.password;

    // Find the user in the API data based on the provided username
    const user = apiData.find(apiUser => apiUser.email === username);
    const upassword = apiData.find(apiUser => apiUser.password === password);
    if (!user && !upassword) {
      // If the user is not found in the API data, return a 401 Unauthorized response
      // console.log(username);
      return res.status(401).json({ error: 'User not found' });
    }
    // Create a JWT token for the user
    const accessToken = generateAccessToken(user, upassword);
    const refreshToken = jwt.sign(user && upassword, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    // Send the JWT token as the response
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Failed to fetch data from the API:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});
//checker if the user has a token or if the user has a valid token
async function authenticateToken (req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decodedUser) => {
    if (err) return res.sendStatus(403);
    req.user = decodedUser;
    // document.getElementById("logiUser").textContent = "YAY"
    // console.log(req.user);
    next();
  })

}

let refreshTokens = [];

//refresh the token
function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '900s' });
}

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    const accessToken = generateAccessToken({name: user.name})
    res.json({ accessToken: accessToken})
  
  })
  return("hello");
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

