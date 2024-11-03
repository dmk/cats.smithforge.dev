import PhotoGallery from "@/components/Gallery/PhotoGallery";

export const metadata = {
  title: 'Cat Gallery - SmithForge.dev',
  description: 'Explore the adorable cat gallery at SmithForge.dev! A playful collection of feline moments, featuring Ruby, Lulu, and more. Dive into the world of whiskers and purrs.',
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen max-w-screen p-8 pb-8 gap-16 md:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-2">
        {/* Title Element */}
        <h1 className="text-4xl font-bold text-center cursor-default">
          cats.
        </h1>
        
        <PhotoGallery />
      </main>

      {/* Footer at Bottom */}
      <footer className="w-full text-gray-300 text-sm text-center mx-4 mb-1/2">
        © {new Date().getFullYear()} SmithForge.dev. Created by Dmytro Koval. All rights reserved.
      </footer>
    </div>
  );
}
