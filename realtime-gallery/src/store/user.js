export function getUserId() {
  let id = localStorage.getItem("userId");

  if (!id) {
    id = "user_" + Math.random().toString(36).slice(2, 9);
    localStorage.setItem("userId", id);
  }

  return id;
}
