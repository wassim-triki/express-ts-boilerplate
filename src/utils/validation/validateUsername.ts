export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required.';
  return null;
};
