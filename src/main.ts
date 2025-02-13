import { followUser } from "./api/followUser";
import { searchUserByLanguage } from "./api/searchUserByLanguage";
import { getRandomUsers } from "./util/common";
import { followLog } from "./util/logger";

//* "TypeScript", "Python", "Go" 등 사용하는 언어 조회
const TARGET_LANGUAGE = ["TypeScript", "JavaScript"];

//* 검색할 최대 사용자 수
const MAX_USERS = 30;

//* 각 언어 별 랜덤 팔로우할 사용자 수
const FOLLOW_COUNT = 5;

const startFollowing = async () => {
  for (const language of TARGET_LANGUAGE) {
    followLog(`⏳ repositories에 ${language} 가 포함된 유저를 찾습니다`);
    const users = await searchUserByLanguage(language, MAX_USERS);

    if (users.length === 0) {
      followLog(`${language} 가 포함된 유저를 찾지 못했습니다`);
      continue;
    }

    const selectedUsers = getRandomUsers(users, FOLLOW_COUNT);
    followLog(`👋 ${language} 선택된 유저 : ${selectedUsers.join(",")}`);

    for (const userName of selectedUsers) {
      await followUser(userName);
      followLog(`✅ ${userName} 팔로우 완료`);
    }
  }
};

startFollowing();
