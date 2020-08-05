import React from "react";
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
const AuthContext = React.createContext({
  user: { name: "", phoneNumber: "" },
  auth: { admin: false, authority: ["basic"] },
  updateAuth: (admin, authority) => {},
});

export default AuthContext;
