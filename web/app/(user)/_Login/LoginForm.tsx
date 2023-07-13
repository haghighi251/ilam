"use client";
import { memo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { LoginFormProps } from "@/utils/types";

const LoginForm = ({
  mobile,
  error,
  isLoading,
  setMobileChanges,
  handleSubmit,
}: LoginFormProps) => {
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "flex-end" }}
        className="mb-4">
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="شماره همراه 09xxxxxxxxx"
          variant="standard"
          value={mobile}
          name="mobile"
          onChange={(e) => setMobileChanges(e.target.value)}
          required
        />
      </Box>
      {error && (
        <Alert
          severity="error"
          className="mb-3 md:mb-6">
          {error}
        </Alert>
      )}
      {!isLoading && (
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}>
          ورود
        </Button>
      )}
      {isLoading && <p>لطفا کمی صبر نمایید...</p>}
    </>
  );
};

export default memo(LoginForm);
