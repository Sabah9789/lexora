// import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Password must be at least 8 characters").required("Password is required"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });
  //   const resetPass = (values) => {
  //     let domain = "http://localhost:1337";
  //     let endPoint = "/api/auth/reset-password";
  //     let url = domain + endPoint;
  //     axios
  //       .post(url, { code: values.code, password: values.password, passwordConfirmation: values.passwordConfirmation })
  //       .then((res) => {
  //         console.log("success" );
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  const resetPass = (values) => {
    console.log(values);
    console.log("Password reset successfully!");
    navigate("/login");
  };
  return (
    <div>
      <div className="w-full h-screen bg-[#132B25] flex items-center justify-center">
        <Formik validationSchema={validationSchema} onSubmit={resetPass} initialValues={{ password: "", passwordConfirmation: "", code: "" }}>
          <Form className=" w-100 flex flex-col gap-3 p-4 ">
            <h1 className="text-[#F5F2EC]  font-bold  text-[14px] p-4">
              Reset Password{" "}
              <span className="text-[#A7B0AB]">
                <br />
                Create a new password for your Lexora account.
              </span>
            </h1>
            <div className="relative">
              <Field name="password" type={showPassword ? "text" : "password"} className="input w-full h-[48px] rounded-2xl pl-7 pr-12 text-[#A7B0AB]" placeholder="Enter Your Password" style={{ border: "1px solid rgba(167, 176, 171, 0.3)" }} />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 cursor-pointer">
                {showPassword ? <GoEye size={20} className="text-[#A7B0AB]" /> : <GoEyeClosed size={20} className="text-[#A7B0AB]" />}
              </span>
            </div>
            <ErrorMessage name="password" component="div" className="text-red-300 text-sm mt-1" />
            <div className="relative">
              <Field name="passwordConfirmation" type={showPassword ? "text" : "password"} className="input w-full h-[48px] rounded-2xl pl-7 pr-12 text-[#A7B0AB]" placeholder="Enter Your Password" style={{ border: "1px solid rgba(167, 176, 171, 0.3)" }} />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 cursor-pointer">
                {showPassword ? <GoEye size={20} className="text-[#A7B0AB]" /> : <GoEyeClosed size={20} className="text-[#A7B0AB]" />}
              </span>
            </div>
            <ErrorMessage name="passwordConfirmation" component="div" className="text-red-300 text-sm mt-1" />
            <button
              type="submit"
              // to="/admin"
              className="  w-full h-[47.9883px] bg-[#F05A22] rounded-2xl text-[16px] font-bold text-[#F5F2EC] gap-3 flex justify-center items-center"
              style={{ border: "1px solid rgba(167, 176, 171, 0.3)" }}
            >
              Reset Password
              <IoIosArrowForward className="text-[#F5F2EC] " />
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
