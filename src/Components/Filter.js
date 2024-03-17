import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts, sortProducts } from './Redux/Actions/actions';

const Filter = () => {
  const [selectedSortBy, setSelectedSortBy] = useState("popular");
  const [selectedCategory, setSelectedCategory,] = useState("All");
  const dispatch= useDispatch();

  const handleSort =(e) =>{
    const selectedSortBy = e.target.value;
    setSelectedSortBy(selectedSortBy)
    dispatch(sortProducts(selectedSortBy))
  }
  const handleCatogory =(e) =>{
    const selectedCategory = e.target.value
    setSelectedCategory(selectedCategory)
  
    dispatch(filterProducts(selectedCategory))
  }

  return (
    <div className='container flex justify-end gap-5 my-5 mx-auto'>
        <div >
            <select value={selectedSortBy} onChange={(e)=>handleSort(e)} className='p-3 border border-gray-500 rounded-lg bg-white'>
                 <option  value="popular">Popular</option>
                 <option  value="htl">High To Low</option>
                 <option  value="lth">Low To High</option>   
            
            </select>
        </div>
        <div>
            <select value={selectedCategory} onChange={(e) => handleCatogory(e)} className='p-3 border border-gray-500 rounded-lg bg-white'>
                 <option  value="all">All</option>
                 <option  value="smartphones">Smart Phones</option>
                 <option  value="laptops">Laptops</option>
                 <option  value="fragrances">Fragrences</option>   
                 <option  value="skincare">Skincare</option>
                 <option  value="groceries">Groceries</option>
                 <option  value="home-decoration">Home Decoration</option>
            </select>
        </div>
    </div>
   
  );
};

export default Filter;
