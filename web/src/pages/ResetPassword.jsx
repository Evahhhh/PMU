import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
    } catch (err) {
      enqueueSnackbar("Token invalide", { variant: "error" });
      navigate("/");
    }
  }, [location, navigate, enqueueSnackbar]);

  return <h1>Reset</h1>;
}

export default ResetPassword;
