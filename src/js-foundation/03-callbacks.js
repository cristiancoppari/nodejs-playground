const users = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "Jane", age: 21 },
  { id: 3, name: "Jim", age: 22 },
];

function getUserById(id, callback) {
  const user = users.find((user) => {
    return user.id === id;
  });

  if (!user) {
    return callback(`User not found with id ${id}`);
  }

  return callback(null, user);
}

module.exports = {
  getUserById,
};
