import { db } from "../api/instantdb";
import { getUserId } from "../store/user";

const EMOJIS = ["❤️", "🔥", "👍", "😂"];

export default function EmojiBar({ imageId }) {
  const userId = getUserId();

  const { data } = db.useQuery({
    reactions: {
      $: {
        where: { imageId },
        order: { createdAt: "asc" },
      },
    },
  });

  const reactions = data?.reactions || [];

  const addReaction = async (emoji) => {
    await db.transact({
      __ops: [
        {
          insert: {
            reactions: {
              imageId,
              emoji,
              userId,
              createdAt: Date.now(),
            },
          },
        },
      ],
    });
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      {EMOJIS.map((e) => (
        <button
          key={e}
          onClick={() => addReaction(e)}
          className="text-2xl hover:scale-125 transition"
        >
          {e}
        </button>
      ))}

      <div className="flex gap-2">
        {reactions.map((r) => (
          <span key={r.id}>{r.emoji}</span>
        ))}
      </div>
    </div>
  );
}
