import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineClose,
  AiFillEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidation";
import { loginUser, registerUser } from "../config/api";
import { toast } from "react-hot-toast";
import { useStore } from "../config/store";

const Account = () => {
  const [show, setShow] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useStore();
  const from = location.state?.from || "/"; //redirect user to home

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  const handleClose = () => setShow(false);

  const onSubmitHandler = async ({ username, email, password }) => {
    setLoading(true);
    try {
      if (isSignup) {
        const res = await registerUser(username, email, password);
        if (res.status === 201) {
          setCurrentUser(res.data);
          toast.success("Registration successful");
          navigate(from, { replace: true });
          handleClose();
        }
      } else {
        const res = await loginUser(username, password);
        if (res.status === 200) {
          setCurrentUser(res.data);
          toast.success("Login successful");
          navigate(from, { replace: true });
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid details");
    } finally {
      setLoading(false);
    }
  };
  // const bag = useLocation("/bag")

  return (
    <>
      <BiUser
        style={{ cursor: "pointer" }}
        size="24px"
        onClick={() => setShow(!show)}
      />

      
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Body>
            <div className="w-100 text-end">
              <AiOutlineClose
                size="24px"
                style={{ cursor: "pointer" }}
                onClick={handleClose}
              />
            </div>
            <div>
              <h1 className="text-center">
                {isSignup ? "Create Account" : "Login"}
              </h1>

              <form
                className="d-flex flex-column align-items-center w-100"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <div className="mb-2 inputRegBox">
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    autoFocus
                    className="w-100 inputReg mb-0"
                    {...register("username", registerOptions.username)}
                  />
                  {errors?.username?.message && (
                    <span className="text-danger fs-6">
                      {errors.username.message}
                    </span>
                  )}
                </div>

                {isSignup && (
                  <div className="mb-2 inputRegBox">
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      className="w-100 mb-0 inputReg"
                      {...register("email", registerOptions.email)}
                    />
                    {errors?.email?.message && (
                      <span className="text-danger fs-6">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                )}

                <div className="mb-2 inputRegBox position-relative">
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="password"
                    className="w-100 inputReg mb-0"
                    id="password"
                    {...register("password", registerOptions.password)}
                  />
                  {passwordShown ? (
                    <AiOutlineEye
                      onClick={togglePassword}
                      size="24px"
                      style={{ cursor: "pointer", top: "50%" }}
                      className="position-absolute end-0 translate-middle"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={togglePassword}
                      size="24px"
                      style={{ cursor: "pointer", top: "50%" }}
                      className="position-absolute end-0 translate-middle"
                    />
                  )}
                </div>
                {errors?.password?.message && (
                  <span className="text-danger fs-6 mb-1 inputRegBox">
                    {errors.password.message}
                  </span>
                )}
                <Button
                  variant="dark"
                  type="submit"
                  size="lg"
                  className="my-4 rounded-0 inputRegBox"
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : isSignup ? (
                    "Create"
                  ) : (
                    "Sign-in"
                  )}
                </Button>
                {isSignup ? (
                  <p
                    className="fs-6 text-secondary-subtle"
                    type="button"
                    onClick={switchMode}
                  >
                    Already have an account{" "}
                    <span className="text-black text-decoration-underline fs-5">
                      Sign in here
                    </span>
                  </p>
                ) : (
                  <p
                    className="fs-5 text-decoration-underline"
                    type="button"
                    onClick={switchMode}
                  >
                    Create Account
                  </p>
                )}
              </form>
            </div>
          </Modal.Body>
        </Modal>
    </>
  );
};

export { Account };
