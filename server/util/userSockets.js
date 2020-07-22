const users = [];

export const addUser = ({ id, name, room }) => {
  const user = {
    id,
    room,
  };
  users.push(user);
  return user;
};

export const removeUser = (id) => {
  const index = users.find((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id) => users.find((user) => user.id === id);

export const userInRoom = (room) => users.filter((user) => user.room === room);
