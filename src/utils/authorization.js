import { redirect } from "react-router-dom";

class Authorization {
  // Calculate the remaining duration of the session
  durationLeft() {
    return (
      new Date(localStorage.getItem("expiryTime")).getTime() -
      new Date().getTime()
    );
  }

  // Handle user login
  onLogin(user) {
    console.log("Setting user as:", user);
    // Store user information in localStorage
    localStorage.setItem("userInfo", JSON.stringify(user));
    // Set the session expiry time to 1 hour from now
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 1);
    localStorage.setItem("expiryTime", expiryTime.toISOString());
  }

  // Handle user logout
  logout() {
    // Remove user information and expiry time from localStorage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiryTime");
    // Redirect to the login page
    return redirect("/");
  }

  // Get the current user
  getUser() {
    const currUser = JSON.parse(localStorage.getItem("userInfo"));
    const durationLeft = this.durationLeft();

    // If no user is found, return null
    if (!currUser) {
      return null;
    }
    // If the session has expired, log out the user
    if (durationLeft <= 0) {
      return this.logout();
    }

    // Return the current user
    return currUser;
  }
}

// Create an instance of the Authorization class and export it
const authObj = new Authorization();
export default authObj;
