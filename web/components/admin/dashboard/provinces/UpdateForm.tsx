"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Loading from "@/components/loading";

const UpdateForm = (props) => {
  // Use the handleClose function as needed
  const handleFormClose = () => {
    // Perform any necessary logic
    props.handleClose(); // Call handleClose function from props
  };
  // Component's states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [province, setProvince] = useState<string>(props.provinceName);

  const handleSubmit = async () => {

    let errorMsg = null;
    if (province === null || province === undefined)
      errorMsg = "لطفا نام استان را وارد نمایید.";
      setError(errorMsg);

    if (errorMsg === null) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/admin/authorized/provinces/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            province: province,
            provinceUnique: props.provinceUnique,
          })
        });

        const responseData = await response.json();
        if (responseData.success) {
          setSuccessMessage("استان با موفقیت ثبت شد.");
          setProvince("");
          handleFormClose(); // Close the modal if desired
        } else {
          setError(responseData.error);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
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
        {successMessage && (
          <Alert
            severity="error"
            className="mb-3 md:mb-6">
            {successMessage}
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
  );
};

export default UpdateForm;
