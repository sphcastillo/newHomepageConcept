function Footer() {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#ff9bb0,_#fcbccc,_#92e5d3,_#4dd8ae)]">
      {/* Footer Intro */}
      <div className="h-screen flex text-[5vw] sm:text-[3vw] lg:text-[2vw] items-center justify-center">
        <div className="max-w-full sm:max-w-[80%] lg:max-w-[45%] text-center leading-tight sm:leading-none">
          <h2 className="text-white text-4xl font-bold mb-4">Your Ticket to the Carousel Experience</h2>
          <p className="text-white text-lg text-pretty">Sign up for insider access to special offers, style inspiration, and more.</p>
          <div className="flex justify-center gap-4 mt-4 mx-2">
            <input type="email" placeholder="Enter your email" className="w-1/2 p-2 placeholder:text-white rounded-md border-2 border-white" />
            <button className="bg-transparent border-2 border-white text-white px-3 py-2 rounded-md text-base">Subscribe</button>
          </div>
        </div>
      </div>

      <div
        className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative h-[calc(100vh+500px)] sm:h-[calc(100vh+600px)] md:h-[calc(100vh+700px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
          <div className="h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] sticky top-[calc(100vh-500px)] sm:top-[calc(100vh-600px)] md:top-[calc(100vh-700px)] lg:top-[calc(100vh-800px)]">
            <div className="py-8 px-12 h-full w-full flex flex-col justify-between">
              <Section1 />
              <Section2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}

const Section2 = () => {
    return (
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end space-y-8 md:space-y-0'>
            <h1 className='text-[16vw] sm:text-[14vw] md:text-[10vw] leading-[0.8] mt-4 md:mt-10 text-white'>Carousel Hair Extensions</h1>
            <p className='text-sm md:text-base text-white font-bold'>©{new Date().getFullYear()} {" "} Carousel Hair Extensions</p>
        </div>
    )
}

const Nav = () => {
    return (
        <div className='flex shrink-0 gap-20'>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-white hover:text-[#ffffff80]'>About</h3>
                <p className="text-white hover:text-[#ffffff80] font-bold">Home</p>
                <p className="text-white hover:text-[#ffffff80] font-bold">Projects</p>
                <p className="text-white hover:text-[#ffffff80] font-bold">Our Mission</p>
                <p className="text-white hover:text-[#ffffff80] font-bold">Contact Us</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-white hover:text-[#ffffff80]'>Education</h3>
                <p className="text-white hover:text-[#ffffff80]">News</p>
                <p className="text-white hover:text-[#ffffff80]">Learn</p>
                <p className="text-white hover:text-[#ffffff80]">Certification</p>
                <p className="text-white hover:text-[#ffffff80]">Publications</p>
            </div>
        </div>
    )
}
