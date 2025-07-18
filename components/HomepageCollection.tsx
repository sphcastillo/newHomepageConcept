"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import product1 from "@/images/breannablue1.jpg";
import product2 from "@/images/breannablue2.jpg";
import product3 from "@/images/breannablue3.jpg";
// import { fetchCollection } from "@/graphql/products";
// import { useEffect, useState } from "react";
// import { CollectionProduct } from "@/graphql/queries/products";
// import { useCart } from "@/app/providers/CartProvider";
// import { Albert_Sans, Antic_Didone } from "next/font/google";

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
        image: product3,
    },
    {
        id: 4,
        title: "Product 1",
        price: 100,
        image: product1,
    },
    {
        id: 5,
        title: "Product 2",
        price: 200,
        image: product2,
    },
    {
        id: 6,
        title: "Product 3",
        price: 300,
        image: product3,
    }
]


const colors = ["#FFBEDF", "#d5e4fc", "#b5ddd4", "#ffdbed"];



export default function HomepageCollection() {

  return (
    <div className="relative isolate pb-12 xxs:pb-16 pt-10 xs:pb-12 xs:pt-6 md:pt-12 lg:py-12 overflow-hidden">
      <Carousel className="max-w-5xl mx-auto overflow-hidden">
        <CarouselContent>
          {products.map((product, index) => {

            return (
              <div className="p-2 xs:p-4" key={index}>
                <div className="w-full min-w-[174px] h-[234px] xxs:min-w-[196px] xxs:h-[273px] xs:min-w-[200px] xs:h-[245px] md:min-w-[220px] relative hover:scale-105 transition-transform duration-300">
                  <Image
                    width={725}
                    height={1088}
                    priority
                    className="object-cover w-full h-full"
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                <div className={`mt-2 xs:mt-4 md:mt-7 p-2 text-center`}>
                  <h2
                    className={` uppercase text-md sm:text-lg md:text-[16px] mb-2`}
                  >
                    {product.title}
                  </h2>
                  <p
                    className={`text-sm xs:text-md sm:text-lg md:text-[17px] text-black mb-4`}
                  >
                    ${product.price}

                  </p>
                  <button
                    className={` text-xs sm:text-sm md:text-md border-2 tracking-wide text-black py-2 px-4 hover:bg-[#4dd8ae] hover:border-none hover:text-white shadow-lg`}
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </div>
  );
}
