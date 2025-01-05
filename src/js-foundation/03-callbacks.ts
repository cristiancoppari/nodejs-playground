interface User {
  id: number;
  name: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

// sync
export function getUserById(
  id: number,
  callback: (err?: string, user?: User) => void
) {
  const user = users.find(function (user) {
    return user.id === id;
  });

  if (!user) {
    return callback(`User not found with id ${id}`);
  }

  return callback(undefined, user);
}

// async
// export function getUserById(
//   id: number,
//   callback: (err?: string, user?: User) => void
// ) {
//   const user = users.find(function (user) {
//     return user.id === id;
//   });

//   if (!user) {
//     setTimeout(() => {
//       return callback(`User not found with id ${id}`);
//     }, 1000);

//     return;
//   }

//   return callback(undefined, user);
// }
