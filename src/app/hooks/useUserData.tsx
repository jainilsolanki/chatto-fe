import { parseCookies } from "nookies";

const useUserData = () => {
  const getUserDataFromCookie = () => {
    const cookies = parseCookies();
    const userDataCookie = cookies["userData"];

    if (userDataCookie) {
      try {
        const userData = JSON.parse(userDataCookie);
        return userData;
      } catch (error) {
        console.log("Error parsing userData cookie:", error);
        return null;
      }
    } else {
      console.log("userData cookie not found.");
      return null;
    }
  };

  const userData = getUserDataFromCookie();

  return { userData };
};

export default useUserData;
