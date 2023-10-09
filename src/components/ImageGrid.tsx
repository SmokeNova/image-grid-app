
import { ImageCard, ImageUploader } from ".";
import { IImage } from "../types";

export default function ImageGrid({images}: {images: IImage[]}) {
  const div1Images = [] as typeof images;
  const div2Images = [] as typeof images;
  const div3Images = [] as typeof images;

  images.forEach((image, index) => {
    switch (index % 3) {
      case 0:
        div1Images.push(image);
        break;
      case 1:
        div2Images.push(image);
        break;
      case 2:
        div3Images.push(image);
        break;
      default:
        break;
    }
  });

  return (
    <>
    <div className="flex flex-col gap-4 my-10">
        <div className="self-center">
          <ImageUploader size="md" />
        </div>

      <div className="flex flex-wrap justify-between max-base:px-4 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-5 w-[410px] max-base:w-[300px] max-sm:w-full">
          {div1Images.map((image) => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>

        <div className="flex flex-col gap-5 w-[410px] max-base:w-[300px] max-sm:w-full">
          {div2Images.map((image) => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>

        <div className="flex flex-col gap-5 w-[410px] max-base:w-[300px] max-sm:w-full">
          {div3Images.map((image) => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>
      </div>
    </div>
    <div className="temp">
      {images.map((image) => {
        const cn = Number(image.height) / Number(image.width);
        const span = Math.ceil(Math.ceil(((cn * 442) / 20)) / 2);
        console.log(cn);
        console.log(span);
        return (
          <div  key={image.id + "ghtrtgrf"} style={{ gridRow: `span ${span}`} }>
            <img src={image.url} alt="" style={{ width: "100%"} } />
          </div>
        )
      })}
    </div>
    </>
  );
}
