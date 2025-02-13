import { githubClient } from "./githubClient";

export const getMyFollowing = async (): Promise<string[]> => {
  try {
    let allFollowing: string[] = [];
    let page = 1;
    const perPage = 100; // GitHub API 최대 페이지
    let hasMoreData = true;

    while (hasMoreData) {
      const response = await githubClient.get(`/user/following`, {
        params: {
          per_page: perPage,
          page: page,
        },
      });

      const users = response.data.map((user: any) => user.login);
      allFollowing = [...allFollowing, ...users];

      if (users.length < perPage) {
        hasMoreData = false;
      } else {
        page++;
      }
    }

    return allFollowing;
  } catch (e) {
    console.error("❌ 내 팔로우 목록 가져오기 실패 >> ", e);
    return [];
  }
};
