import bcrypt from "bcryptjs";

export const bcryptAdapter = {
  hash: (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  compare: (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  },
};
