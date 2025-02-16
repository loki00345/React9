import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearError } from "../store/authSlice";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({ name, password }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 300, margin: "auto", mt: 5 }}>
      <Typography variant="h5">Реєстрація</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Ім'я" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Зареєструватися</Button>
    </Box>
  );
};

export default SignUp;
