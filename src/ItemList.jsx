import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    filterItems();
  }, [category, maxPrice]);

  const filterItems = () => {
    let filtered = items;

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (maxPrice) {
      filtered = filtered.filter(item => item.price <= maxPrice);
    }

    setFilteredItems(filtered);
  };

  return (
    <div>
      <h1>Items</h1>
      <div>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value=''>All</option>
            <option value='electronics'>Electronics</option>
            <option value='jewelery'>Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </label>
        <label>
          Max Price:
          <input
            type='number'
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </label>
      </div>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            <img src={item.image} alt="" />
            <h2>{item.title}</h2>
            <p>{item.category}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;

