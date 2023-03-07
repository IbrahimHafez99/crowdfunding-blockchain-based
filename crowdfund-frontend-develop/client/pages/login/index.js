import React, { useState, useEffect } from "react";
import CustomButton from "../../src/components/CustomButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../../src/components/Layout";
import { useLogin } from "../../src/hooks/useLogin";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
const LoginSchema = Yup.object().shape({
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
});

const Login = () => {
  const router = useRouter();
  const login = useLogin();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await login(values);
          router.push("/");
          setSubmitting(false);
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.message}`,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
              Login
            </h1>
          </div>
          <Form className="w-full mt-[65px] flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[40px]">
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
            </div>

            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Login"
                styles="bg-[#1dc071]"
                isDisabled={isSubmitting}
              />
            </div>
            <div className="flex justify-center items-center mt-[10px]">
              <CustomButton
                btnType="button"
                title="Register"
                styles="bg-transparent"
                handleClick={() => router.push("/register")}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;

Login.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
