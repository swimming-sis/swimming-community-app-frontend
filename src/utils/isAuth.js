import { getItemWithExpireTime } from "./expireTime";

export const isAuth = () => getItemWithExpireTime('token');
// export const isAuth = () => window.localStorage.getItem('token');