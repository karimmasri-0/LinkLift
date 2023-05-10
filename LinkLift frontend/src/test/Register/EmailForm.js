import React from "react";
import InputField from "../../components/InputField";
import FormWrapper from "./FormWrapper.tsx";

function EmailForm({ email, updateData }) {
  return (
    <div>
      <FormWrapper title="Your first step into Carpooling!">
        <InputField
          value={email}
          updateData={updateData}
          fieldToUpdate="email"
          label={"Email"}
          required={true}
          type={"email"}
        />
      </FormWrapper>
    </div>
  );
}

export default EmailForm;
