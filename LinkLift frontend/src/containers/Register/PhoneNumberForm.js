import React from "react";
import InputField from "../../components/InputField";
import FormWrapper from "./FormWrapper.tsx";

function PhoneNumberForm({ phone_number, updateData }) {
  return (
    <div>
      <FormWrapper title="What's your phone number?">
        <InputField
          value={phone_number}
          updateData={updateData}
          fieldToUpdate="phone_number"
          label={"Phone Number"}
          required={true}
          type={"tel"}
          minLength={8}
        />
      </FormWrapper>
    </div>
  );
}

export default PhoneNumberForm;
