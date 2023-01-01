export const bcryptConfig = {
  saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
