import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
import Navbar from "../Navbar/Navbar";
import { prod } from "../../data/jsonformatter"; // Assuming prod is your array of products
import Product from "../Product/Product";
import bg1 from "../../assets/bannerImgOne.jpg";
import bg2 from "../../assets/bannerImgTwo.jpg";
import bg3 from "../../assets/bannerImgThree.jpg";
import bg4 from "../../assets/bannerImgFour.jpg";

const Products = () => {
//   const swiperRef = useRef(null);
  const [filterData, setFilterData] = useState(prod);
  const [search, setSearch] = useState("");
  
  let Arr = [bg1,bg2,bg3,bg4];


  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    const filtered = prod.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilterData(filtered);
  };


  return (
    <div className="z-[50] bg-gray-200 h-[100vh]">
      <Navbar handleSearch={handleSearch} />
      
      {/* Mobile */}
     

      <img src={bg1} alt={Image} className="w-[100vw] flex flex-1 h-[52vh] object-cover mt-[4.2rem] md:hidden md:mt-0  image" />    

      {/* Desktop */}
      <img src={bg1} alt={Image} className=" hidden md:block md:w-full md:h-full md:mt-[3rem] md:object-cover image" />
      <div className="flex justify-center items-center gap-10 max-w-screen flex-wrap max-w-screen absolute top-[62%] -mt-[2rem] md:-mt-[3rem]">
        {filterData.map((item) => (
          <Product className="" key={item.id} products={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
