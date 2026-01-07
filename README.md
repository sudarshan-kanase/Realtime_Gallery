# 📸 Realtime Gallery App (InstantDB)

A real-time image gallery application built using **React**, **Vite**, and **InstantDB (@instantdb/core)**.  
This project demonstrates **real-time reactions and comments** using InstaQL and InstantDB subscriptions.

---

## 🚀 Features

- 📷 Image gallery (Unsplash API integration)
- 🔄 Real-time feed (Reactions & Comments)
- ❤️ Emoji reactions
- 💬 Live comments
- ⚡ Instant updates using InstantDB subscriptions
- 🎨 Clean UI with Tailwind CSS
- 🧠 InstaQL-based querying

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Database:** InstantDB
- **Realtime Engine:** @instantdb/core
- **Styling:** Tailwind CSS
- **API:** Unsplash API

---

## 📂 Project Structure



src/
│── api/
│ └── instantdb.js
│
│── components/
│ ├── Feed.jsx
│ ├── EmojiBar.jsx
│ ├── Comments.jsx
│ └── Gallery.jsx
│
│── App.jsx
│── main.jsx


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/realtime-gallery.git
cd realtime-gallery

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

VITE_INSTANT_APP_ID=your_instantdb_app_id
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

4️⃣ InstantDB Initialization

src/api/instantdb.js

import { init } from "@instantdb/core";

export const db = init({
  appId: import.meta.env.VITE_INSTANT_APP_ID,
});

🔁 Realtime Feed Logic (Core Version)

This project uses InstantDB Core subscriptions for real-time updates.

Example from Feed.jsx:

useEffect(() => {
  const unsubscribe = db.subscribe(
    {
      reactions: {
        $: {
          order: { createdAt: "desc" },
          limit: 10,
        },
      },
      comments: {
        $: {
          order: { createdAt: "desc" },
          limit: 10,
        },
      },
    },
    (snapshot) => {
      setData(snapshot);
    }
  );

  return () => unsubscribe();
}, []);

🧠 InstaQL Query Example
{
  reactions: {
    $: {
      where: { imageId: "img_123" },
      order: { createdAt: "desc" },
      limit: 10,
    },
  },
}

▶️ Run the Project
npm run dev


App will start at:

http://localhost:5173
