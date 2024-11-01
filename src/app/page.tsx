import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen max-h-[98vh] max-w-screen overflow-hidden p-8 pb-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8">
        {/* Enhanced Text Above Image */}
        <div>
          <h1 className="text-center text-gray-700 text-2xl sm:text-4xl font-semibold mb-8">
            Cat Gallery Coming Soon
          </h1>
          <h3 className="text-center text-gray-700 text-2xl sm:text-xl font-semibold mb-8">
            To see cats right now click the cat below.
          </h3>
        </div>
        {/* Centered and Slower Spinning Image */}
        <div className="flex justify-center items-center">
          <a href="https://www.dkoval.pro/cats" target="_blank">
            <Image
              src="/ruby.svg"
              width={210}
              height={210}
              alt="cat"
              className="animate-spin [animation-duration:6s] cursor-pointer"
            />
          </a>
        </div>
      </main>
      {/* Footer at Bottom */}
      <footer className="w-full text-gray-300 text-sm text-center mx-4 mb-2">
        © {new Date().getFullYear()} SmithForge.dev. Created by Dmytro Koval. All rights reserved.
      </footer>
    </div>
  );
}
