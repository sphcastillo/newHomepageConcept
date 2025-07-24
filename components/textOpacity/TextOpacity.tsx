"use client";

import CharacterFade from "./Chraracter";
import Paragraph from "./Paragraph";
import WordFade from "./Word";

const paragraph =
  "Inspired by a love for all things vintage, Breanna has curated a space that blends old-school charm with the latest hair trends, offering a unique aesthetic that’s both playful and sophisticated. Carousel Hair Extensions offers a handpicked selection of premium extensions in a variety of lengths, textures, and colors, all designed to help you transform your look with ease and confidence.";

function TextOpacity() {
  const words = paragraph.split(" ");
  return (
    <>
      {/* <div style={{ height: "100vh" }}></div> */}
      {/* <Paragraph paragraph={paragraph} /> */}
      {/* <div style={{ height: "100vh" }}></div> */}
      <WordFade paragraph={paragraph} />
      {/* <div style={{ height: "100vh" }}></div> */}
      {/* <CharacterFade paragraph={paragraph} /> */}
      {/* <div style={{ height: "100vh" }}></div> */}
    </>
  );
}
export default TextOpacity;
