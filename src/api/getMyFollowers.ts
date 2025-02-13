import { githubClient } from "./githubClient";

export const getMyFollowers = async (): Promise<string[]> => {
  try {
    let allFollowers: string[] = [];
    let page = 1;
    const perPage = 100;
    let hasMoreData = true;

    while (hasMoreData) {
      const response = await githubClient.get(`/user/followers`, {
        params: {
          per_page: perPage,
          page: page,
        },
      });

      const users = response.data.map((user: any) => user.login);
      allFollowers = [...allFollowers, ...users];

      if (users.length < perPage) {
        hasMoreData = false;
      } else {
        page++;
      }
    }

    return allFollowers;
  } catch (e) {
    console.error("❌ 내 팔로워 목록 가져오기 실패 >> ", e);
    return [];
  }
};
