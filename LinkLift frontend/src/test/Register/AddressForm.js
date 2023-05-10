import React from "react";
import FormWrapper from "./FormWrapper.tsx";
import InputField from "../../components/InputField";

function AddressForm({ address, updateData }) {
  return (
    <FormWrapper title="Where is your residence?">
      <InputField
        value={address}
        updateData={updateData}
        fieldToUpdate="address"
        label={"City, Street name, Building ..."}
        required={true}
      />
    </FormWrapper>
  );
}

export default AddressForm;
