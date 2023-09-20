import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "react-bootstrap";
import { useStore } from "../config/store";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, uploadToCloudinary } from "../config/api";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import registerOptions from "../utils/formValidation";

export default function UpdateProfile() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [imgPic, setImgPic] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { currentUser, setCurrentUser } = useStore();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (imgPic !== "") {
      const handleImgUpload = async () => {
        try {
          const upload = await uploadToCloudinary(imgPic);
          const updatedProfileImg = upload.data.secure_url;
          setImgLink(updatedProfileImg);
        } catch (error) {
          console.log(error);
          toast.error("Error uploading profile image");
        }
      };
      handleImgUpload();
    }
  }, [imgPic]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.user?.username,
      email: currentUser?.user?.email,
    },
  });

  const onSubmitHandler = async (data) => {
    const updatedProfile = {
      _id: currentUser?.user?._id,
      username: data.username,
      email: data.email,
      password: data.password,
      profileImg: imgLink,
    };
    try {
      setLoading(true);
      const res = await updateUserProfile(
        updatedProfile,
        currentUser.access_Token
      );
      if (res.status === 201) {
        setCurrentUser(res.data);
        toast.success("Your Profile was updated successfully");
        navigate(`/account/user-profile/${res.data?.user?.username}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating your profile");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="inputRegBox mx-auto">
        <h1 className="text-center">Update Profile</h1>
      </div>
      <form
        className="d-flex flex-column align-items-center w-100"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="mb-3 inputRegBox">
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            className="w-100 mb-0 inputReg"
            autoFocus
            {...register("username", registerOptions.username)}
          />
          {errors?.username?.message && (
            <p className="text-danger fs-6">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-3 inputRegBox">
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            className="w-100 mb-0 inputReg"
            {...register("email", registerOptions.email)}
          />
          {errors?.email?.message && (
            <p className="text-danger fs-6">{errors.email.message}</p>
          )}
        </div>
        <div
          className="inputRegBox mb-1 fs-6"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPass(!showPass)}
        >
          Update passsword?{" "}
          <span
            className={
              showPass
                ? "text-success fw-medium fs-5"
                : "text-black fw-medium fs-5"
            }
          >
            {showPass ? "Hide" : "Click to update"}
          </span>
        </div>
        {showPass && (
          <div className="mb-3 inputRegBox position-relative">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              name="password"
              id="password"
              className="w-100 mb-0 inputReg"
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
        )}

        {errors?.password?.message && (
          <p className="text-danger fs-6">{errors.password.message}</p>
        )}
        <div className="my-3 inputRegBox">
          <label htmlFor="profilepic">Update profile image</label>
          <input
            type="file"
            name="profile-pic"
            accept="image/png image/jpeg image/webp"
            className="border p-2 w-100 border-black"
            onChange={(e) => setImgPic(e.target.files[0])}
          />
        </div>
        <div className="mb-3 inputRegBox">
          <Button type="submit" variant="dark" className="w-100 rounded-0">
            {loading ? <Spinner animation="border" size="sm" /> : "Update"}
          </Button>
        </div>
      </form>
    </>
  );
}
