const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); //  Para entender que as requests sao em JSON

app.get('/', (req, res) => {
    res.send('Isso deve aparecer na pagina');
});

// End point 2
app.get('/api/data', (req, res) => {
    res.json({ message: 'Here is some data!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});