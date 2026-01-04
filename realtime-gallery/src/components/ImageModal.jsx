import EmojiBar from "./EmojiBar";
import Comments from "./Comments";

export default function ImageModal({ image, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl"
        >
          ✕
        </button>

        <img
          src={image.urls.regular}
          className="rounded w-full"
        />

        <EmojiBar imageId={image.id} />
        <Comments imageId={image.id} />
      </div>
    </div>
  );
}
