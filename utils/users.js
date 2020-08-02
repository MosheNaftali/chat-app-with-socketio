let users = [];

module.exports = {
  addUsers: (id, name, room) => {
    users.push({ id, name, room });
    return users;
  },
  getCurrentUser: (id) => {
    let user = users.find((userData) => userData.id == id);
    return user;
  },
  removeUser: (id) => {
    let user = users.findIndex((userData) => userData.id === id);
    if (user != -1) {
      return users.splice(user, 1)[0];
    }
  },
  usersOnTheRoom: (room) => {
    return users.filter((user) => user.room === room);
  },
};
