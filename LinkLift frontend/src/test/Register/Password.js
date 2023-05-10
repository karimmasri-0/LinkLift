import React from "react";
import InputField from "../../components/InputField";
import FormWrapper from "./FormWrapper.tsx";

function PasswordForm({ password, password_confirm, updateData }) {
  return (
    <div>
      <FormWrapper title="Set up a secure password!">
        <InputField
          value={password}
          updateData={updateData}
          fieldToUpdate="password"
          label={"Password"}
          required={true}
          type={"password"}
        />
        <InputField
          value={password_confirm}
          updateData={updateData}
          fieldToUpdate="password_confirm"
          label={"Password Confirm"}
          confirm={password}
          required={true}
          type={"password"}
        />
      </FormWrapper>
    </div>
  );
}

export default PasswordForm;
