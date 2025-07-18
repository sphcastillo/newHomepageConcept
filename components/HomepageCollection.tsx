"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import product1 from "@/images/products/puplecolor.jpg";
import product2 from "@/images/products/blondecolor.jpg";
import product3 from "@/images/breannablue3.jpg";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { motion } from "framer-motion";
// import { pd_medium, pd_regular_italic } from "@/fonts/fonts";
// import { Albert_Sans, Antic_Didone } from "next/font/google";

const bgGradients = [
  "bg-gradient-to-b from-[#4dd8ae] via-purple-500 to-purple-300",
  "bg-gradient-to-l from-[#4dd8ae] via-amber-500 to-amber-300",
  "bg-gradient-to-t from-[#4dd8ae] via-pink-500 to-pink-300",
  "bg-gradient-to-r from-[#4dd8ae] via-orange-500 to-orange-300",
  "bg-gradient-to-r from-[#4dd8ae] via-green-500 to-green-300",
];

const products = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    image: product1,
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    image: product2,
  },
  {
    id: 3,
    title: "Product 3",
    price: 300,
    image: product1,
  },
  {
    id: 4,
    title: "Product 1",
    price: 100,
    image: product2,
  },
  {
    id: 5,
    title: "Product 2",
    price: 200,
    image: product1,
  },
  {
    id: 6,
    title: "Product 3",
    price: 300,
    image: product2,
  },
];

const colors = ["#FFBEDF", "#d5e4fc", "#b5ddd4", "#ffdbed"];

export default function HomepageCollection() {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);


  const getButtonGradientClass = (index: number) => {
    return bgGradients[index % bgGradients.length];
  };
  

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleSliderChange = (value: number[]) => {
    if (!api) return;
    const slideIndex = Math.floor((value[0] / 100) * (count - 1));
    api.scrollTo(slideIndex);
  };

  const handlePrevClick = () => {
    if (!api) return;
    api.scrollPrev();
  };

  const handleNextClick = () => {
    if (!api) return;
    api.scrollNext();
  };






  return (
    <div className="w-full max-w-7xl mx-auto py-8 md:py-0 md:pt-[80px] md:pb-[75px] relative z-10">
    <Carousel setApi={setApi} className="max-w-5xl mx-auto lg:max-w-7xl">
      <CarouselContent className="pl-4">
        {products.map((product, index) => (
          <div
            key={index}
            id="carousel-slide"
            className="p-3 min-w-[70vw] xxs375:min-w-[65vw] md:min-w-[39vw] lg:min-w-[20vw]"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full relative"
              style={{ paddingBottom: "calc(100% + 2px)" }}
            >
              <Image
                alt={product.title}
                width={500}
                height={500}
                src={product.image}
                className="absolute inset-0 w-full h-full object-cover border-[1px] border-white"
              />
            </motion.div>
            <div className="">
              <h3
                className={`text-[16px] font-bold text-white mt-6 mb-2`}
              >
                {product.title}
              </h3>
              {/* <p
                className={`text-gray-900 italic mb-4 text-[12px]`}
              >
                {product.description}
              </p> */}


              {/* Add to Cart Button */}
              <button
                id="add-to-cart"
                className={`w-full ${getButtonGradientClass(index)} text-white font-semibold py-3 px-1 flex items-center border-[1px] border-black justify-between transition-colors duration-200`}
              >
                <span
                  className={`pl-[16px] text-[16px]`}
                >
                  Add to cart
                </span>
                <span
                  className={`font-bold pr-[16px]`}
                >
                  ${product.price}
                </span>
              </button>
            </div>
          </div>
        ))}
      </CarouselContent>
    </Carousel>

    {/* Progress Indicators */}
    <div className="p-4 flex gap-2 mt-6 max-w-5xl mx-auto overflow-hidden">
      <Slider
        defaultValue={[0]}
        max={100}
        step={100 / (count - 1)}
        value={[current * (100 / (count - 1))]}
        onValueChange={handleSliderChange}
        className="flex-1 "
      />
      <div className="cursor-pointer" onClick={handlePrevClick}>
        <IoIosArrowDropleft size={24} className="text-white"/>
      </div>
      <div className="cursor-pointer" onClick={handleNextClick}>
        <IoIosArrowDropright size={24} className="text-white"/>
      </div>
    </div>
  </div>
  )
}
