const express = require('express');
const axios = require('axios');
const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'https://mern-product-catalogue-backend.onrender.com' // Your frontend URL
}));


const PORT = process.env.PORT || 5000;

app.get('/api/products', async (req, res) => {
    const { category, page } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Construct the DummyJSON API URL
    let apiUrl;
    if (category) {
        apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
        apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    // Log the constructed API URL for debugging
    console.log(`Fetching from DummyJSON API: ${apiUrl}`);

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data); // Respond with the fetched data
    } catch (error) {
        console.error('Error fetching data from DummyJSON API:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
