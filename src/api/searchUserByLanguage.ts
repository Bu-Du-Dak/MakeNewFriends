import { getMyFollowing } from "./getMyFollowing";
import { githubClient } from "./githubClient";

// page 파라미터를 추가하여 여러 페이지를 조회할 수 있게 합니다.
export const searchUserByLanguage = async (
  language: string,
  maxResult: number = 10,
  maxPages: number = 5 // 최대 검색할 페이지 수
) => {
  const myFollowing = await getMyFollowing();
  let users: string[] = [];

  const pages = Array.from({ length: maxPages }, (_, index) => index + 1);
  const shuffledPages = pages.sort(() => Math.random() - 0.5);

  for (let page of shuffledPages) {
    try {
      const response = await githubClient.get(`/search/users`, {
        params: {
          q: `language:${language} followers:>10`,
          per_page: maxResult,
          page: page,
        },
      });

      const pageUsers = response.data.items
        .map((user: any) => user.login)
        .filter((user: string) => !myFollowing.includes(user));

      users = [...users, ...pageUsers];

      // 최대 결과 수에 도달하면 종료
      if (users.length >= maxResult) {
        break;
      }
    } catch (e) {
      console.error("❌ 유저 찾기 실패 >> ", e);
    }
  }

  // for (let page = 1; page <= maxPages; page++) {
  //   try {
  //     const response = await githubClient.get(`/search/users`, {
  //       params: {
  //         q: `language:${language} followers:>10`,
  //         per_page: maxResult,
  //         page: page,
  //       },
  //     });

  //     const pageUsers = response.data.items
  //       .map((user: any) => user.login)
  //       .filter((user: string) => !myFollowing.includes(user));

  //     users = [...users, ...pageUsers];

  //     // 최대 결과 수에 도달하면 종료
  //     if (users.length >= maxResult) {
  //       break;
  //     }
  //   } catch (e) {
  //     console.error("❌ 유저 찾기 실패 >> ", e);
  //   }
  // }

  return users.slice(0, maxResult);
};
