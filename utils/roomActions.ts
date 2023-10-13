const users: any = [];

export const removeUser = async (socketId: string) => {
  const indexOf = users.map((user: any) => user.socketId).indexOf(socketId);

  users.splice(indexOf, 1);

  return;
};

export const addUser = async (userId: string, socketId: string) => {
  const user = users.find((user: any) => user.userId === userId);

  if (user && user.socketId === socketId) {
    return users;
  }

  if (user && user.socketId !== socketId) {
    await removeUser(user.socketId);
  }

  const newUsers = { userId, socketId };

  users.push(newUsers);

  return users;
};

export const findConnectedUser = (userId: string) => {
  const result = users.find((user: any) => user.userId === userId);

  return result;
};
