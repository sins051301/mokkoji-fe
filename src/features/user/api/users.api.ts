import { UserInfoType, UserResponseType } from "@/types/userInfoType";
import api from "@/services";

export const getUserInfo = async (): Promise<UserResponseType> => {
  const { data } = await api.get("/users");
  return data;
};

export const updateUserEmail = async (
  email: string
): Promise<Pick<UserInfoType, "email">> => {
  const { data } = await api.put("/users", { email });
  return data;
};
