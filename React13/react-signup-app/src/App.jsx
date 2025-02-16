import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import { CssBaseline, ThemeProvider, createTheme, Container, Button } from "@mui/material";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = createTheme({ palette: { mode: themeMode } });
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <ThemeToggle />
        {currentUser ? (
          <>
            <h2>Вітаємо, {currentUser.name}!</h2>
            <Button variant="contained" color="error" onClick={() => dispatch(logout())}>
              Вийти
            </Button>
          </>
        ) : (
          <>
            <SignUp />
            <Login />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
