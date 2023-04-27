import React from "react";

function index() {
  return (
    <div>
      <ProfileTextInput
        label="Change Password"
        value={formik.values.password}
        onChange={formik.handleChange("password")}
        error={formik.errors.password}
        placeholder={"********"}
        type={"password"}
      />
      <ProfileTextInput
        label="Confirm Change"
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange("confirmPassword")}
        error={formik.errors.confirmPassword}
        placeholder={"********"}
        type={"password"}
      />
    </div>
  );
}

export default index;
