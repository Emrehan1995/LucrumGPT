require('dotenv').config();
const app = require('./app')
const port = process.env.PORT || 3000
const { sendToOpenAI } = require('./services/openaiService');


// Define a route to handle client requests
app.post('/sendToOpenAIServer',async (req, res) => {
  const { text } = req.body;
  
  try {
    const response = await sendToOpenAI(text,res);
    res.json(response);
  } catch (error) {
    console.log("Express Server Error!")
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
