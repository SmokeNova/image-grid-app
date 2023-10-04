import { BackgroundImage } from "@mantine/core";
import { Searchbox } from ".";

export default function HeroSection() {
  return (
    <BackgroundImage
      component="section"
      src="./hero-image.jpg"
      className="w-full h-[600px] relative"
    >
      <div className="w-full h-full z-10 bg-black/50 absolute top-0 left-0" />

      <div className="flex-center w-full h-full z-20 relative text-white">
        <div className="w-[65%] max-w-[65%] flex-col gap-6 flex">
          <h1 className="text-5xl tracking-wide font-bold">Unsplash</h1>

          <div className="flex flex-col gap-1">
            <p className="text-xl ">The Internet's source for visuals.</p>
            <p className="text-xl ">Powered by creators everywhere.</p>
          </div>

          <div className="text-black">
            <Searchbox
              radius="sm"
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                paddingInline: "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
              }}
            />
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
}
