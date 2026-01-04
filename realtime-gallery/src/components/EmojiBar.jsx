// components/EmojiBar.jsx - SIMPLE VERSION
import { db } from "../api/instantdb";

const EMOJIS = ["❤️", "🔥", "👍", "😂"];

export default function EmojiBar({ imageId }) {
  const userId = localStorage.getItem("userId") || `user_${Date.now()}`;

  const addReaction = (emoji) => {
    // SIMPLE TRANSACTION
    db.transact({
      reactions: {
        [Date.now().toString()]: {
          imageId,
          emoji,
          userId,
          createdAt: Date.now(),
        }
      }
    });
  };

  return (
    <div className="flex gap-2 mt-2">
      {EMOJIS.map(e => (
        <button key={e} onClick={() => addReaction(e)} className="text-2xl">
          {e}
        </button>
      ))}
    </div>
  );
}