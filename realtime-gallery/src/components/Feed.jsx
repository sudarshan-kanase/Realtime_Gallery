// components/Feed.jsx
import { db } from "../api/instantdb";

export default function Feed() {
  const { data, isLoading } = db.useQuery({
    reactions: { 
      $: { 
        order: { createdAt: "desc" }, 
        limit: 20 
      } 
    },
    comments: { 
      $: { 
        order: { createdAt: "desc" }, 
        limit: 20 
      } 
    },
  });

  // Combine and sort all activities
  const allActivities = [
    ...(data?.reactions?.map(r => ({ ...r, type: 'reaction' })) || []),
    ...(data?.comments?.map(c => ({ ...c, type: 'comment' })) || [])
  ].sort((a, b) => b.createdAt - a.createdAt)
   .slice(0, 15);

  return (
    <div className="p-4 border-l w-80 h-screen overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Live Activity Feed</h3>
      
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : allActivities.length === 0 ? (
        <p className="text-gray-500">No activity yet</p>
      ) : (
        <div className="space-y-3">
          {allActivities.map((item) => (
            <div key={item.id} className="text-sm border-b pb-3">
              {item.type === 'reaction' ? (
                <p>
                  <span className="font-semibold">User {item.userId?.slice(0, 6)}</span>
                  {' '}reacted with {item.emoji} to an image
                </p>
              ) : (
                <p>
                  <span className="font-semibold">User {item.userId?.slice(0, 6)}</span>
                  {' '}commented: "{item.text.slice(0, 50)}..."
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}