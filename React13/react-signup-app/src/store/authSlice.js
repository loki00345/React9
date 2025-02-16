import { createSlice } from "@reduxjs/toolkit";

const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: storedUsers,
    currentUser: storedCurrentUser,
    error: null,
  },
  reducers: {
    signUp: (state, action) => {
      const { name, password } = action.payload;
      const userExists = state.users.find((user) => user.name === name);

      if (userExists) {
        state.error = "Користувач вже існує!";
      } else {
        const newUser = { name, password };
        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));
        state.currentUser = newUser;
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        state.error = null;
      }
    },
    login: (state, action) => {
      const { name, password } = action.payload;
      const user = state.users.find((user) => user.name === name && user.password === password);

      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        state.error = null;
      } else {
        state.error = "Невірне ім'я або пароль!";
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signUp, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
