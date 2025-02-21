import { getMyFollowers } from "./getMyFollowers";
import { getMyFollowing } from "./getMyFollowing";
import { githubClient } from "./githubClient";

const unfollowUser = async (userName: string) => {
  try {
    await githubClient.delete(`/user/following/${userName}`);
    console.log(`Successfully unfollowed ${userName}`);
  } catch (e) {
    console.error(`Failed to unfollow ${userName}:`, e);
  }
};
export const unfollowUsers = async () => {
  try {
    const myFollowing = await getMyFollowing();
    const myFollowers = await getMyFollowers();

    const unfollowList = myFollowing.filter(
      (user) => !myFollowers.includes(user)
    );

    console.log(unfollowList);
    for (const userName of unfollowList) {
      await unfollowUser(userName);
      console.log(`${userName} unfollowed`);
    }
  } catch (e) {
    console.error(e);
  }
};
unfollowUsers();
