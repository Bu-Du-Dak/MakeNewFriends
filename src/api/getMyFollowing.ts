import { githubClient } from "./githubClient";

export const getMyFollowing = async (): Promise<string[]> => {
  try {
    const response = await githubClient.get(`/user/following`);
    return response.data.map((user: any) => user.login);
  } catch (e) {
    console.error("❌ 내 팔로우 목록 가져오기 실패 >> ", e);
    return [];
  }
};
