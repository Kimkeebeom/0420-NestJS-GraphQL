import { v4 as uuidv4 } from 'uuid';
export const getRandomKey = () => {
  return uuidv4().replace(/-/gi, "");
};
