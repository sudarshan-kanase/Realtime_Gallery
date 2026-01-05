import { useState } from "react";
import { db } from "../api/instantdb";
import { getUserId } from "../store/user";

export default function Comments({ imageId }) {
  const [text, setText] = useState("");
  const userId = getUserId();

  const { data } = db.useQuery({
    comments: {
      $: { where: { imageId }, order: { createdAt: "asc" } },
    },
  });

  const comments = data?.comments ?? [];

  const addComment = () => {
    if (!text.trim()) return;

    db.transact([
      db.tx.comments.create({
        imageId,
        text,
        userId,
        createdAt: Date.now(),
      }),
    ]);

    setText("");
  };

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {comments.map((c) => (
          <p key={c.id} className="bg-gray-100 p-2 rounded text-sm">
            {c.text}
          </p>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Add comment"
        />
        <button onClick={addComment} className="bg-black text-white px-3 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
