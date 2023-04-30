import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { TiEdit } from "react-icons/ti";
import ProfileTextInput from "./ProfileTextInput";
import { toast } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import Layout from "../../components/Layout";
import driverInfo from "../../assets/driver-info.png";
import ProfileSelectInput from "./ProfileSelectInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileFileInput from "./ProfileFileInput";
import { MdOutlineCameraswitch } from "react-icons/md";

function Profile() {
  const [certificateImageURL, setCertificateImageURL] = useState("");
  const [carImageURL, setCarImageURL] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [imageHover, setImageHover] = useState(false);
  const [changedProfilePicture, setChangedProfilePicture] = useState(false);
  const profileImageRef = useRef(null);
  const FILE_SIZE = 2_000_000;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const postData = async (values) => {
    await axios.post(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/update-user`,
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzY5NDQyNzhkYWYzM2MyODM5OGI2YyIsImlhdCI6MTY4MTI5ODQ5OCwiZXhwIjoxNjgzODkwNDk4fQ.VnWEcKzG8qJ3-jjFKKp5BIcZRTXi_hDLy0RFJIk8T4w",
        data: { ...values },
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "--Gender--",
      // password: "",
      // confirmPassword: "",
      position: "--Position--",
      picture: "",
      age: "",
      vehiculeType: "--Vehicule Type--",
      registrationNumber: "",
      certificate: new File([undefined], undefined, {
        lastModified: 0,
        name: undefined,
        size: 0,
        type: "image/jpg",
        webkitRelativePath: "",
      }),
      carImage: new File([undefined], undefined, {
        lastModified: 0,
        name: undefined,
        size: 0,
        type: "image/jpg",
        webkitRelativePath: "",
      }),
      preferences: [],
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "must be at least 3 characters long")
        .max(20, "First name must be less than 20 characters long")
        .required("First Name required"),
      lastName: Yup.string()
        .required("required")
        .min(3, "must be at least 3 characters long")
        .max(20, "must be less than 20 characters long")
        .required("Last Name required"),
      picture: Yup.mixed()
        .nullable()
        .notRequired()
        .test("FILE_SIZE", "Uploaded file is too big.", (value) => {
          if (value.size === undefined) return true;
          return !value || (value && value.size <= FILE_SIZE);
        })
        .test(
          "FILE_FORMAT",
          "Uploaded file has unsupported format.",
          (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
        ),
      email: Yup.string()
        .email()
        .min(8, "must be at least 8 characters long")
        .required("Email required"),
      phone: Yup.number()
        .positive()
        .integer()
        .min(8, "must be at least 8 characters long"),
      gender: Yup.string(),
      // password: Yup.string().min(6, "must be at least 6 characters long"),
      // confirmPassword: Yup.string()
      //   .min(6, "must be at least 6 characters long")
      //   .oneOf([Yup.ref("password")], "Password did not match."),
      position: Yup.string(),
      age: Yup.number("Age must be a number")
        .typeError("Age must be a number")
        .positive("Age must be a number")
        .integer("Age must be a number")
        .min(18, "Too young")
        .max(100, "Too old"),
      vehiculeType: Yup.string(),
      registrationNumber: Yup.string(),
      carImage: Yup.mixed()
        .nullable()
        .notRequired()
        .test(
          "FILE_SIZE",
          "Uploaded file is too big.",
          (value) => !value || (value && value.size <= FILE_SIZE)
        )
        .test(
          "FILE_FORMAT",
          "Uploaded file has unsupported format.",
          (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
        ),
      certificate: Yup.mixed()
        .nullable()
        .notRequired()
        .test(
          "FILE_SIZE",
          "Uploaded file is too big.",
          (value) => !value || (value && value.size <= FILE_SIZE)
        )
        .test(
          "FILE_FORMAT",
          "Uploaded file has unsupported format.",
          (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (Array.isArray(values[key])) {
          for (var i = 0; i < values[key].length; i++) {
            formData.append(key, values[key][i]);
          }
          continue;
        }
        if (
          values.hasOwnProperty(key) &&
          (key === "carImage" || key === "certificate" || key === "picture")
        ) {
          if (key === "picture" && changedProfilePicture === false) continue;
          formData.append("images", values[key]);
          continue;
        }
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }
      console.log(formData);
      await axios
        .post(
          `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/update-user`,
          formData,
          {
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzY5NDQyNzhkYWYzM2MyODM5OGI2YyIsImlhdCI6MTY4MTI5ODQ5OCwiZXhwIjoxNjgzODkwNDk4fQ.VnWEcKzG8qJ3-jjFKKp5BIcZRTXi_hDLy0RFJIk8T4w",
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            },
          }
        )
        .then((resp) => {
          console.log(JSON.stringify(resp.data.user_data));
          localStorage.setItem(
            "user_data",
            JSON.stringify(resp.data.user_data)
          );
        })
        .catch((error) => console.log(error));
    },
  });

  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [disabled, setDisabled] = useState(true);

  const fetchAPI = async () => {
    try {
      const url = new URL(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/user`
      );
      url.searchParams.set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzY5NDQyNzhkYWYzM2MyODM5OGI2YyIsImlhdCI6MTY4MTI5ODQ5OCwiZXhwIjoxNjgzODkwNDk4fQ.VnWEcKzG8qJ3-jjFKKp5BIcZRTXi_hDLy0RFJIk8T4w"
      );
      const response = await axios.get(url);
      console.log(response.data.user_data);
      setUserData(response.data.user_data);
      formik.values.firstName = response.data.user_data.first_name;
      formik.values.lastName = response.data.user_data.last_name;
      formik.values.email = response.data.user_data.email;
      formik.values.phone = response.data.user_data?.phone_number ?? "";
      formik.values.gender = response.data.user_data?.gender ?? "";
      formik.values.position = response.data.user_data?.position ?? "";
      formik.values.picture = response.data.user_data?.picture ?? "";
      formik.values.age = response.data.user_data?.age ?? "";
      formik.values.vehiculeType = response.data.user_data?.vehicule_type ?? "";
      formik.values.registrationNumber =
        response.data.user_data?.registration_number ?? "";
      formik.values.carImage = response.data.user_data?.carImage ?? "";
      formik.values.certificate = response.data.user_data?.certificate ?? "";
      formik.values.preferences = response.data.user_data?.preferences ?? "";
      console.log("formik.values.preferences >>> ", formik.values.preferences);
      if (formik.values.picture) {
        axios
          .get(formik.values.picture, { responseType: "blob" })
          .then((response) => {
            const file = new File([response.data], "image.jpg", {
              type: "image/jpeg",
            });
            formik.setFieldValue("picture", file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setPictureURL(reader.result);
            };
            reader.readAsDataURL(file);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => console.log(formik.values), [formik.values]);

  const handleImageUpload = (event, field, setValue) => {
    const file = new File(
      [event.currentTarget.files[0]],
      `__${field.toUpperCase()}__${event.currentTarget.files[0].name}`,
      {
        type: event.currentTarget.files[0].type,
      }
    );
    formik.setFieldValue(field, file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      {userData ? (
        formik.values.position === "Passenger" ? (
          <div className="flex justify-center my-20">
            <div className="p-12 relative">
              <div className="bg-gray-200 border border-cblue-100 shadow-xl rounded">
                <TiEdit
                  className="text-green-400 float-right m-2 cursor-pointer hover:bg-gray-300 active: rounded p-1 text-3xl transition-all"
                  onClick={() => setDisabled((v) => !v)}
                />
                <input
                  disabled={disabled}
                  type="file"
                  ref={profileImageRef}
                  accept={["image/jpg", "image/jpeg", "image/png"]}
                  onChange={(e) => {
                    setChangedProfilePicture(true);
                    handleImageUpload(e, "picture", setPictureURL);
                  }}
                  onBlur={formik.handleBlur("picture")}
                  hidden
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  {imageHover && (
                    <div
                      className={`z-0 ${
                        imageHover ? "block" : "display-none"
                      } transition-all`}
                    >
                      <MdOutlineCameraswitch
                        className="absolute  top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-black"
                        size={30}
                      />
                    </div>
                  )}
                  <img
                    src={pictureURL}
                    onClick={() => profileImageRef.current.click()}
                    className={`w-24 h-24 z-10 border-2 rounded-full hover:opacity-40 transition-all cursor-pointer ${
                      formik.touched.picture && formik.errors.picture
                        ? " border-red-500 "
                        : " border-gray-500"
                    }`}
                    alt="Preview Profile"
                    onMouseEnter={() => setImageHover(true)}
                    onMouseLeave={() => setImageHover(false)}
                  />

                  {formik.touched.picture && formik.errors.picture && (
                    <div className="absolute text-red-500 text-sm">
                      {formik.errors.picture}
                      {console.log(typeof formik.values.picture)}
                    </div>
                  )}
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  onReset={formik.handleReset}
                  className="mt-16 px-6 py-4 flex flex-col gap-3"
                >
                  <ProfileTextInput
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    touched={formik.touched.firstName}
                    error={formik.errors.firstName}
                    disabled={disabled}
                    placeholder={"Nikola"}
                    required={true}
                  />
                  <ProfileTextInput
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    touched={formik.touched.lastName}
                    error={formik.errors.lastName}
                    disabled={disabled}
                    placeholder={"Tesla"}
                    required={true}
                  />
                  <ProfileTextInput
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    touched={formik.touched.email}
                    error={formik.errors.email}
                    disabled={disabled}
                    placeholder={"email@example.com"}
                    required={true}
                  />
                  <ProfileTextInput
                    label="Phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    touched={formik.touched.phone}
                    error={formik.errors.phone}
                    disabled={disabled}
                    placeholder={"00 000 000"}
                  />

                  <ProfileSelectInput
                    firstOption={"--Gender--"}
                    elements={["Male", "Female"]}
                    label="Gender"
                    value={formik.values.gender}
                    touched={formik.touched.gender}
                    error={formik.errors.gender}
                    onChange={formik.handleChange("gender")}
                    onBlur={formik.handleBlur("gender")}
                    disabled={disabled}
                  />
                  <ProfileSelectInput
                    firstOption={"--Position--"}
                    elements={["Passenger", "Driver"]}
                    label="Position"
                    value={formik.values.position}
                    touched={formik.touched.position}
                    error={formik.errors.position}
                    onChange={formik.handleChange("position")}
                    onBlur={formik.handleBlur("position")}
                    disabled={disabled}
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setDisabled(true)}
                      disabled={disabled}
                      type="reset"
                      className={`px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:shadow-lg font-bold shadow-gray-500/20 hover:shadow-gray-500/40 transition-all ${
                        disabled
                          ? "opacity-0 cursor-default"
                          : "opacity-100 cursor-pointer"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={disabled}
                      className={`px-6 py-2 bg-green-400 text-white rounded-lg shadow-md hover:shadow-lg font-bold shadow-green-400/20 hover:shadow-green-400/40 transition-all focus:opacity-[0.85] focus:shadow-none ${
                        disabled
                          ? "opacity-0 cursor-default"
                          : "opacity-100 cursor-pointer"
                      }`}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            className="lg:grid grid-cols-2 px-20"
          >
            <div className="grid place-content-center lg:col-span-1">
              <img src={driverInfo} alt="Driver Profile" className="max-w-md" />
            </div>
            <div className="bg-cyan-50 h-screen overflow-scroll my-16 lg:col-span-1">
              <div className="space-y-3 relative">
                <h2 className="bg-cblue-100 text-white text-2xl py-4 px-8">
                  Personal Information
                </h2>
                <div className="space-y-5 pl-4 w-2/3 ">
                  <input
                    type="file"
                    ref={profileImageRef}
                    accept={["image/jpg", "image/jpeg", "image/png"]}
                    onChange={(e) => {
                      setChangedProfilePicture(true);
                      handleImageUpload(e, "picture", setPictureURL);
                    }}
                    onBlur={formik.handleBlur("picture")}
                    hidden
                  />
                  <div className="absolute top-20 right-5">
                    {imageHover && (
                      <div
                        className={`z-0 ${
                          imageHover ? "block" : "display-none"
                        } transition-all`}
                      >
                        <MdOutlineCameraswitch
                          className="absolute  top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-black"
                          size={30}
                        />
                      </div>
                    )}
                    <img
                      src={pictureURL}
                      onClick={() => profileImageRef.current.click()}
                      className={`w-24 h-24 z-10 border-2 rounded-full hover:opacity-40 transition-all cursor-pointer ${
                        formik.touched.picture && formik.errors.picture
                          ? " border-red-500 "
                          : " border-gray-500"
                      }`}
                      alt="Preview Profile"
                      onMouseEnter={() => setImageHover(true)}
                      onMouseLeave={() => setImageHover(false)}
                    />

                    {formik.touched.picture && formik.errors.picture && (
                      <div className="absolute text-red-500 text-sm">
                        {formik.errors.picture}
                        {console.log(typeof formik.values.picture)}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                      <ProfileTextInput
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur("firstName")}
                        touched={formik.touched.firstName}
                        error={formik.errors.firstName}
                        placeholder={"Nikola"}
                        required={true}
                      />
                    </div>
                    <div className="w-1/2">
                      <ProfileTextInput
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                        touched={formik.touched.lastName}
                        error={formik.errors.lastName}
                        placeholder={"Tesla"}
                        required={true}
                      />
                    </div>
                  </div>
                  <ProfileTextInput
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    touched={formik.touched.email}
                    error={formik.errors.email}
                    placeholder={"email@example.com"}
                    required={true}
                  />
                  <ProfileTextInput
                    label="Phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    touched={formik.touched.phone}
                    error={formik.errors.phone}
                    placeholder={"00 000 000"}
                  />
                  <ProfileSelectInput
                    firstOption={"--Gender--"}
                    elements={["Male", "Female"]}
                    label="Gender"
                    value={formik.values.gender}
                    touched={formik.touched.gender}
                    error={formik.errors.gender}
                    onChange={formik.handleChange("gender")}
                    onBlur={formik.handleBlur("gender")}
                    required={true}
                  />
                  <ProfileSelectInput
                    firstOption={"--Position--"}
                    elements={["Passenger", "Driver"]}
                    label="Position"
                    value={formik.values.position}
                    touched={formik.touched.position}
                    error={formik.errors.position}
                    onChange={formik.handleChange("position")}
                    onBlur={formik.handleBlur("position")}
                    required={true}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-3 ">
                <h2 className="bg-cblue-100 text-white text-2xl py-4 px-8">
                  Driving Consent
                </h2>
                <div className="space-y-3 pl-4 pr-44">
                  <ProfileTextInput
                    label="Age"
                    value={formik.values.age}
                    touched={formik.touched.age}
                    error={formik.errors.age}
                    onChange={formik.handleChange("age")}
                    onBlur={formik.handleBlur("age")}
                  />
                  <ProfileSelectInput
                    firstOption={"--Vehicule Type--"}
                    label="Vehicule Type"
                    elements={[
                      "SUV",
                      "Crossover",
                      "Sedan",
                      "Truck",
                      "Wagon / Hatchback",
                      "Convertible",
                      "Luxury",
                      "Coupe",
                      "Hybrid / Electric",
                      "Van / Minivan",
                      "Sports car",
                    ].sort()}
                    value={formik.values.vehiculeType}
                    touched={formik.touched.vehiculeType}
                    error={formik.errors.vehiculeType}
                    onChange={formik.handleChange("vehiculeType")}
                    onBlur={formik.handleBlur("vehiculeType")}
                  />
                  <ProfileTextInput
                    label="Registration Number"
                    value={formik.values.registrationNumber}
                    touched={formik.touched.registrationNumber}
                    error={formik.errors.registrationNumber}
                    onChange={formik.handleChange("registrationNumber")}
                    onBlur={formik.handleBlur("registrationNumber")}
                  />
                  <ProfileFileInput
                    label="Car Image"
                    touched={formik.touched.carImage}
                    error={formik.errors.carImage}
                    onChange={(e) =>
                      handleImageUpload(e, "carImage", setCarImageURL)
                    }
                    onBlur={formik.handleBlur("carImage")}
                    imageURL={carImageURL}
                  />
                  <ProfileFileInput
                    label="Certificate"
                    touched={formik.touched.certificate}
                    error={formik.errors.certificate}
                    onChange={(e) =>
                      handleImageUpload(
                        e,
                        "certificate",
                        setCertificateImageURL
                      )
                    }
                    onBlur={formik.handleBlur("certificate")}
                    imageURL={certificateImageURL}
                  />
                  <div className="pl-1">
                    I alllow the following in my vehicule:
                    <ul className="pl-5">
                      <li>
                        <input
                          checked={formik.values.preferences.includes(
                            "animals_allowed"
                          )}
                          onChange={formik.handleChange("preferences")}
                          type="checkbox"
                          name="animals"
                          value="animals_allowed"
                          className="w-3 h-3 text-cblue-100 focus:border-cblue-100 focus:ring-transparent"
                        />
                        <label htmlFor="animals" className="ml-2 text-sm">
                          Animals
                        </label>
                      </li>
                      <li>
                        <input
                          checked={formik.values.preferences.includes(
                            "kids_allowed"
                          )}
                          onChange={formik.handleChange("preferences")}
                          type="checkbox"
                          name="kids"
                          value="kids_allowed"
                          className="w-3 h-3 text-cblue-100 focus:border-cblue-100 focus:ring-cblue-100"
                        />
                        <label htmlFor="kids" className="ml-2 text-sm">
                          Kids
                        </label>
                      </li>
                      <li>
                        <input
                          checked={formik.values.preferences.includes(
                            "smoking_allowed"
                          )}
                          onChange={formik.handleChange("preferences")}
                          type="checkbox"
                          name="smoking"
                          value="smoking_allowed"
                          className="w-3 h-3 text-cblue-100 focus:border-cblue-100 focus:ring-cblue-100"
                        />
                        <label htmlFor="smoking" className="ml-2 text-sm">
                          Smoking
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid place-items-center my-6">
                <button
                  type="submit"
                  className="px-40 py-2 text-lg bg-cyan-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 trasnition-all focus:opacity-[0.85] focus:shadow-none"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )
      ) : (
        <div className="flex justify-center mt-44">
          <div>
            <ScaleLoader color="#7985e6" />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
