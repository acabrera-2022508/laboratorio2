import { hash, compare } from "bcrypt";

export const encrypt = async (password) => {
  try {
    const salt = 1;
    return await hash(password, salt);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const comparePassword = async (password, hash) => {
  return await compare(password, hash);
};

export const checkUpdate = (data, userId) => {
  if (userId) {
    if (
      Object.entries(data).length === 0 ||
      data.password ||
      data.password == "" ||
      data.role ||
      data.role == ""
    ) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};
