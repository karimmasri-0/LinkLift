import React from "react";
import InputField from "../../components/InputField";
import FormWrapper from "./FormWrapper.tsx";

function NameForm({ first_name, last_name, updateData }) {
  return (
    <FormWrapper title="What's your name?">
      <InputField
        value={first_name}
        updateData={updateData}
        fieldToUpdate="first_name"
        label={"First name"}
        minLength={3}
        required={true}
      />
      <InputField
        value={last_name}
        updateData={updateData}
        fieldToUpdate="last_name"
        label={"Last name"}
        minLength={3}
        required={true}
      />
    </FormWrapper>
  );
}

export default NameForm;
