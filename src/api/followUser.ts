import { githubClient } from "./githubClient";

export const followUser = async (userName: string) => {
  try {
    await githubClient.put(`/user/following/${userName}`);
    console.log(`✅ ${userName}님을 팔로우 합니다`);
  } catch (e) {
    console.error(`❌ ${userName}님 팔로우 실패 >> `, e);
  }
};
