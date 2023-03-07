import React, { useState } from "react";
import CustomButton from "../../src/components/CustomButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../../src/components/Layout";
import { RegisterAPI } from "../../src/apis/registerAPI";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Invalid username"
    ),

  email: Yup.string()
    .email()
    .trim()
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
    .required("Required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 characters minimum.")
    .max(20, "Password is too long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const response = await RegisterAPI.register({
            ...values,
            name: values.username,
          });
          setSubmitting(false);
          router.push("/login");
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.message}`,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
          console.log(err.response.data.message);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
              Register an Account
            </h1>
          </div>
          <Form className="w-full mt-[65px] flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[40px]">
              <label className="flex-1 w-full flex flex-col">
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                  username
                </span>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-[red] text-sm"
                />
                <Field
                  type="text"
                  name="username"
                  placeholder="username"
                  className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />
              </label>

              <label className="flex-1 w-full flex flex-col">
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                  Email
                </span>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-[red] text-sm"
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-[40px]">
              <label className="flex-1 w-full flex flex-col">
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                  Password
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-[red] text-sm"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />
              </label>
              <label className="flex-1 w-full flex flex-col">
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                  Password
                </span>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-[red] text-sm"
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />
              </label>
            </div>

            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Register"
                styles="bg-[#1dc071]"
                isDisabled={isSubmitting}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;

Register.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
