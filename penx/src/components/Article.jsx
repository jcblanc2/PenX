import React from 'react'

const Article = () => {
    return (
        <div className="flex mb-5">
            <div>
                <img className="w-[80%] ml-5" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*DzEI-0DaKwl8qER5Vp7TeQ.png" alt="Image" />
            </div>

            <div className="">
                <h2 className="m-0 text-[1.8rem] text-xl font-bold ">Back-End & Web Development Trends For 2024</h2>
                <p className="my-2 text-[#888]">
                    <span className="font-semibold text-[#333] text-[1rem]">John</span> ·
                    <time className=" "> Oct 17</time>
                </p>
                <p className=" leading-20">The ever-shifting landscape of digital innovation can feel like a relentless race, a whirlwind of challenges and opportunities. of challenges and opportunities.</p>
            </div>
        </div>
    )
}

export default Article
