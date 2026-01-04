import { useState } from "react";
import { db } from "../api/instantdb";
import { getUserId } from "../store/user";

// Comments component
// Displays comments for a specific image and allows adding new comments
export default function Comments({ imageId }) {
  // State to store the comment input text
  const [text, setText] = useState("");

  // Get currently logged-in user's ID
  const userId = getUserId();

  // Fetch comments related to the given imageId from InstantDB
  const { data } = db.useQuery({
    comments: {
      $: {
        where: { imageId },          // Filter comments by image ID
        order: { createdAt: "asc" }, // Sort comments by creation time
      },
    },
  });

  // Fallback to empty array if data is not yet loaded
  const comments = data?.comments || [];

  // Function to add a new comment
  const addComment = async () => {
    // Prevent submitting empty or whitespace-only comments
    if (!text.trim()) return;

    // Create a new comment record in InstantDB
    db.transact([
      db.tx.comments({
        text,                 // Comment text
        imageId,              // Related image ID
        userId,               // Author user ID
        createdAt: Date.now() // Timestamp
      }),
    ]);

    // Clear input field after submitting comment
    setText("");
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Render list of comments */}
      {comments.map((c) => (
        <p
          key={c.id} 
          className="
            text-sm 
            bg-gray-100 
            px-3 py-2 
            rounded-lg 
            text-gray-800
            shadow-sm
          "
        >
          {c.text}
        </p>
      ))}

      {/* Comment input and submit button */}
      <div className="flex gap-2 items-center">
        <input
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Add a comment..."
          className="
            flex-1
            border 
            border-gray-300
            rounded-lg
            px-3 py-2
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-black
            focus:border-black
          "
        />

        <button
          onClick={addComment}
          className="
            bg-black 
            text-white 
            px-4 py-2 
            text-sm
            rounded-lg
            hover:bg-gray-800
            transition
            active:scale-95
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}
