// components/Comments.jsx
import { useState } from "react";
import { db } from "../api/instantdb";
import { getUserId } from "../store/user";

export default function Comments({ imageId }) {
  const [text, setText] = useState("");
  const userId = getUserId();

  const { data } = db.useQuery({
    comments: {
      $: {
        where: { imageId },
        order: { createdAt: "asc" },
      },
    },
  });

  const comments = data?.comments || [];

  // ✅ FIXED: InstantDB के नए API के अनुसार
  const addComment = () => {
    if (!text.trim()) return;

    db.transact([
      {
        $action: "insert",
        comment: {
          imageId,
          text: text.trim(),
          userId,
          createdAt: Date.now(),
        },
      },
    ]);

    setText("");
  };

  return (
    <div className="mt-6">
      <h4 className="font-semibold text-lg mb-3">
        Comments ({comments.length})
      </h4>
      
      <div className="space-y-3 max-h-60 overflow-y-auto p-2">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-800">{c.text}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  User: {c.userId?.replace('user_', '') || 'Anonymous'}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addComment()}
          className="border border-gray-300 p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Write a comment..."
        />
        <button
          onClick={addComment}
          disabled={!text.trim()}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>
    </div>
  );
}