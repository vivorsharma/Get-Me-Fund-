import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold flex gap-6 md:gap-2 items-center justify-center text-3xl md:text-5xl">Get Me Fund!
          <span><img className="invertImg" src="/coin.gif" width={88} alt="" /></span>
        </div>
        <p className="text-center md:text-left">A crowdFunding platforms for creators to fund projects</p>
        <p className="text-center md:text-left">A place where your supporters can get you a funds. unleash the power of your supporters and get your projects funded.</p>
        <div>
          <Link href={"/login"}>
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 
          focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 
          mb-2">Start here</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 
          focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 
          mb-2">Read more</button>
          </Link>

        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h1 className="text-3xl font-bold text-center mb-14">Your fans can give you fund</h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" src="/users.gif" width={88} />
            <p className="font-bold text-center">Supporters want to help</p>
            <p className="text-center">Your supporters are available to support you.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" src="/coin.gif" width={88} />
            <p className="font-bold text-center">Supporters want to contribute</p>
            <p className="text-center">Your supporters are willing to contribute financially.</p>
          </div><div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" src="/collaborate.gif" width={88} />
            <p className="font-bold text-center">Supporters want to collaborate</p>
            <p className="text-center">Your supporters want to collaborate with you.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn More About Us</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/QtaorVNAwbI?si=MdOfSXolpigkBOIS" title="YouTube video player"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </>
  );
}
