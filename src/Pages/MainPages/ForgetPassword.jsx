import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email").required("Email is required"),
  });
  const Forget = (values) => {
    let endPoint = "/api/auth/forgot-password";
    let domain = "http://localhost:1337";
    let url = domain + endPoint;
    axios
      //  { email: values.email }  <= values
      .post(url, { email: values.email })
      .then((res) => {
        console.log("Success");
        console.log(res.data);
        navigate("/reset");
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
    //  API اشتغل    =>
    //  مش مربوط بخدمة إرسال إيميلات (SMTP)
    //   Object   ok : true
  };
  return (
    <div>
      <div className="w-full h-screen bg-[#132B25] flex items-center justify-center">
        <Formik validationSchema={validationSchema} onSubmit={Forget} initialValues={{ email: "" }}>
          <Form className=" w-100 flex flex-col gap-3 p-4 ">
            <h1 className="text-[#F5F2EC]  font-bold  text-[14px]">Email Address</h1>
            <Field name="email" type="email" className=" input w-full h-[47.9883px] rounded-2xl text-[#A7B0AB] placeholder:text-[#A7B0AB] pl-7" placeholder="attorney@lexora.legal" style={{ border: "1px solid rgba(167, 176, 171, 0.3)" }} />
            <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
            <button
              type="submit"
              // to="/admin"
              className="  w-full h-[47.9883px] bg-[#F05A22] rounded-2xl text-[16px] font-bold text-[#F5F2EC] gap-3 flex justify-center items-center"
              style={{ border: "1px solid rgba(167, 176, 171, 0.3)" }}
            >
              Send Reset Link
              <IoIosArrowForward className="text-[#F5F2EC] " />
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
