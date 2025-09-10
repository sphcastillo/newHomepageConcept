import type { Work } from "@/typings";


export default function Work({ index, title, setModal }: Work) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="group flex w-full justify-between items-center py-[50px] px-[100px] border-t border-[#c9c9c9] cursor-pointer transition-all duration-200 last:border-b hover:opacity-50"
    >
      <h2 className="text-[60px] m-0 font-normal transition-all duration-[400ms] group-hover:-translate-x-[10px]">{title}</h2>
      {/* <p className='m-0 font-light transition-all duration-[400ms] group-hover:translate-x-[10px]'>Design & Development</p> */}
    </div>
  );
}

