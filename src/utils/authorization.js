import { redirect } from "react-router-dom";

class Authorization {
  durationLeft() {
    return (
      new Date(localStorage.getItem("expiryTime")).getTime() -
      new Date().getTime()
    );
  }

  onLogin(user) {
    console.log("Setting user as:", user);
    localStorage.setItem("userInfo", JSON.stringify(user));
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 1);
    localStorage.setItem("expiryTime", expiryTime.toISOString());
  }

  logout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiryTime");
    return redirect("/");
  }

  getUser() {
    const currUser = JSON.parse(localStorage.getItem("userInfo"));
    const durationLeft = this.durationLeft();

    if (!currUser) {
      return null;
    }
    if (durationLeft <= 0) {
      return this.logout();
    }

    return currUser;
  }
}

const authObj = new Authorization();
export default authObj;
