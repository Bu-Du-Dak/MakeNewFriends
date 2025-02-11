import { getMyFollowing } from "./getMyFollowing";
import { githubClient } from "./githubClient";

export const searchUserByLanguage = async (
  language: string,
  maxResult: number = 10
) => {
  const myFollowing = await getMyFollowing();

  try {
    const response = await githubClient.get(`/search/users`, {
      params: {
        q: `language:${language} followers:>10`,
        per_page: maxResult,
      },
    });
    const users = response.data.items
      .map((user: any) => user.login)
      .filter((user: string) => !myFollowing.includes(user))
      .slice(0, maxResult);

    return users;
  } catch (e) {
    console.error("❌ 유저 찾기 실패 >> ", e);
    return [];
  }
};
