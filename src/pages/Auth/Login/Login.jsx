import { Link, useNavigate } from "react-router-dom";
import { LoginImg, loginLogo, logo } from "../../../assets/images/images";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../../Reducer/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import AfterLoginModal from "./AfterLoginModal";
import { Checkbox, Label } from "flowbite-react";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  // const domainStatus = localStorage.getItem("domain_status");
  // console.log("domainStatus: ", domainStatus);

  // const subDomainStatus = domainStatus
  //   ? JSON.parse(Base64.decode(domainStatus))
  //   : null;
  // console.log("subDomainStatus: ", subDomainStatus);

  // const signinHandler = () => {
  //   navigate("/dashboard");
  // };
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(" ");
  const [openModal, setOpenModal] = useState(false);

  const { loadingLogin } = useSelector((state) => state?.auth);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const savedUsername = Cookies.get("username");
    const savedPassword = Cookies.get("password");

    if (savedUsername && savedPassword) {
      setValue("username", savedUsername);
      setValue("password", savedPassword);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    dispatch(login(data)).then((res) => {
      console.log("Res: ", res);
      if (res?.payload?.status_code === 200) {
        if (res?.payload?.sub_domain === false) {
          setOpenModal(true);
        } else {
          if (data?.rememberMe) {
            Cookies.set("username", data?.username, { expires: 7 });
            Cookies.set("password", data?.password, { expires: 7 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
          }
          navigate("/dashboard");
        }
      } else if (res?.payload?.status_code === 400) {
        setErrorMessage(res?.payload?.message);
      } else if (res?.payload?.response?.data?.status_code === 422) {
        setErrorMessage(
          res?.payload?.response?.data?.data?.[0]?.message
            ? res?.payload?.response?.data?.data?.[0]?.message
            : res?.payload?.response?.data?.message
        );
      }
    });
  };
  return (
    <div className="my-0 lg:my-0 mx-4 lg:mx-0 flex justify-center items-center wrapper_bg_area">
      <div className="w-full my-0 mx-auto login_area">
        <div className="flex h-screen">
          <div className="w-6/12 flex justify-center items-center">
            <div className="w-7/12">
              <div className="text-center mb-16">
                <img
                  src={loginLogo}
                  alt="loginLogo"
                  className="inline-block w-5/12 "
                />
              </div>
              <h1 className="text-left font-semibold text-[38px] leading-[45px] text-black pb-4">
                Login with <span className="text-[#536EFF]">EARNO</span>
              </h1>
              {/* <p className="text-[15px] text-[#8E8E8E]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p> */}
              <div className="login_area">
                {errorMessage && (
                  <h6 className="text-[#ff1a03] text-center mb-4">
                    {errorMessage}
                  </h6>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <Label className="text-base text-[#263A43] font-medium pb-2 block">
                      User name
                    </Label>
                    <input
                      type="text"
                      id="email"
                      className="bg-white border border-[#dfdfdf] text-[#888888] text-sm rounded-lg focus:ring-[#f1d9ff] focus:border-[#f1d9ff] block w-full py-3 px-3"
                      placeholder="Enter Your User Name"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <small className="text-red-500">
                        User Name is required
                      </small>
                    )}
                  </div>
                  <div className="mb-1">
                    {/* <div className="flex justify-between">
                      <div className="block md:hidden">
                        <Link
                          className="text-base md:text-xl text-teal-400 font-bold hover:text-teal-500"
                          to="/forgot-password"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div> */}
                    <Label className="text-base text-[#263A43] font-medium pb-2 block">
                      Your Password
                    </Label>
                    <input
                      placeholder="Password"
                      type="password"
                      id="password"
                      className="bg-white border border-[#dfdfdf] text-[#888888] text-sm rounded-lg focus:ring-[#f1d9ff] focus:border-[#f1d9ff] block w-full py-3 px-3"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <small className="text-red-500">
                        Password is required
                      </small>
                    )}
                  </div>

                  <div className="flex justify-between mb-6">
                    <div className="flex items-center">
                      <div className="flex items-center gap-1">
                        <Checkbox id="remember" {...register("rememberMe")} />
                        <Label
                          htmlFor="remember"
                          className="text-[#8E8E8E] font-normal text-sm"
                        >
                          Remember me!
                        </Label>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <Link
                        className="text-[#8E8E8E] text-sm font-normal hover:text-black"
                        to="/forgot-password"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-[#536EFF] font-medium text-[23px] mb-2 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-[18px] w-full px-5 py-3.5 text-center"
                  >
                    {loadingLogin ? "Wait..." : "Log In"}
                  </button>
                </form>
                {/* <div className="break_area relative">
                  <p className="text-[#BABABA] text-[22px] uppercase bg-white px-4 relative z-10 text-center w-[100px] mx-auto">
                    Or
                  </p>
                </div> */}
                {/* <div className="break_area relative pt-2 pb-2">
                  <p className="text-[#525252] text-sm leading-[22px] px-4 relative z-10 text-center w-[160px] mx-auto bg-white">
                    Or Continue With
                  </p>
                </div> */}
                {/* <div className="flex justify-center items-center mt-4">
                  <div className="flex justify-center items-center border border-[#747474] px-4 py-2 rounded-md">
                    <FcGoogle className="text-2xl mr-1.5" />
                    <p className="text-black text-base">Google</p>
                  </div>
                </div> */}

                {/* <div className="text-center mt-10">
                  <p className="text-[#615D5D] text-sm">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      className="text-[#000000] hover:text-[#615D5D]"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className="w-6/12 bg-cover bg-no-repeat bg-right"
            style={{ backgroundImage: `url("${LoginImg}")` }}
          >
            &nbsp;
          </div>
        </div>
      </div>
      {openModal && (
        <AfterLoginModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default Login;
