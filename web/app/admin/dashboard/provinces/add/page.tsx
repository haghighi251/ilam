"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/services/Redux/store";
import { actionLogin, user } from "@/services/Redux/userReducer";

import { isValidEmail, isValidPassword } from "@/utils/validation";
import { Iuser } from "@/utils/types";
import Loading from "@/components/loading";
import { RedirectWhoAreNotAdmin } from "@/utils/functions";

const AddNewProvince = async () => {
  // Redirecting unlogged users
  await RedirectWhoAreNotAdmin();

  // Component's states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [province, setProvince] = useState<string>("");

  const handleSubmit = async () => {
    let errorMsg = null;
    if (province === null || province === undefined)
      errorMsg = "لطفا نام استان را وارد نمایید.";
    if (errorMsg === null) {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/authorized/provinces/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          province: province,
        }),
      });
    }
    setError(errorMsg);
  };

  return (
    <div>
      {" "}
      <div className="flex flex-col items-center border border-slate-400 shadow-md py-3 md:py-6 px-3 md:px-6 rounded-md m-5">
        <Alert severity="success">ثبت استان جدید</Alert>
        <Box
          sx={{ display: "flex", alignItems: "flex-end" }}
          className="mb-4">
          <TextField
            id="input-with-sx"
            label="نام استان"
            variant="standard"
            value={province}
            name="usernameOrEmail"
            onChange={(e) => setProvince(e.target.value)}
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
        {!loading && (
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}>
            ثبت
          </Button>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default AddNewProvince;
