import React, { useState } from "react";

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
    <div className="z-[50]">
      <Navbar handleSearch={handleSearch} />
      <div className="swiper z-0 mt-[4%]">
      <Swiper
    spaceBetween={0}
    pagination={{
        clickable: true,
    }}
    autoplay={{
        delay: 100, // Adjust the delay as needed (in milliseconds)
        disableOnInteraction: false, // Enable autoplay even when user interacts with the slider
    }}
    loop={true} // Infinite loop
    className="mySwiper h-full"
>
    {Arr.map((Image, index) => (
        <SwiperSlide key={index}>
            <img src={Image} alt={Image} className="w-full h-full mt-[10%] md:mt-0 object-cover" />
        </SwiperSlide>
    ))}
</Swiper>

      </div>
      {/* <img src={bg3} className='relative h-[100vh] max-w-screen mt-14 object-cover' alt="imran" /> */}
      <div className="flex justify-center items-center gap-10 max-w-screen flex-wrap max-w-screen absolute top-[62%] -mt-[7rem] md:-mt-[2rem]">
        {filterData.map((item) => (
          <Product className="" key={item.id} products={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
