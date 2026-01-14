import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Uicomponent/Loadding";
import { imageUpload } from "../../utils";
import { FaPhone } from "react-icons/fa";

const Regestration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const locaitondata = useLoaderData();
  const AxiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ redirect target (PrivateRoute should send: state={{ from: location }})
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const bloodGroups = useMemo(
    () => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    []
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      ProfileImage: null,
      bloodGroup: "",
      district: "",
      upazila: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control, name: "password" });
  const districtId = useWatch({ control, name: "district" });

  const selectedDistrict = useMemo(() => {
    return locaitondata?.find((d) => String(d.id) === String(districtId));
  }, [locaitondata, districtId]);

  const upazilas = selectedDistrict?.upazilas ?? [];

  useEffect(() => {
    setValue("upazila", "");
  }, [districtId, setValue]);

  const hendelRegestration = async (data) => {
    const districtObj = locaitondata?.find(
      (d) => String(d.id) === String(data.district)
    );

    const districtName = districtObj?.name || "";
    const { name, email, password, phone, ProfileImage } = data;

    const imageFile = ProfileImage?.[0];
    if (!imageFile) {
      Swal.fire({
        icon: "error",
        title: "Image required",
        text: "Please select a profile image!",
      });
      return;
    }

    try {
      setPageLoading(true);

      // 1) upload image
      const photoURL = await imageUpload(imageFile);

      // 2) create user
      await createUser(email, password);

      // 3) make profile object
      const userProfile = {
        displayName: name,
        photoURL: photoURL || "",
      };

      // 4) update profile
      await updateUserProfile(userProfile);

      // 5) save donor to DB
      const donorPayload = {
        email,
        name,
        phone: phone || "",
        bloodGroup: data.bloodGroup,
        district: districtName,
        upazila: data.upazila,
        photoURL,
        role: "donor",
        status: "active",
      };

      await AxiosSecure.post("/regesterDoner", donorPayload);

      await Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "Your account has been created.",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();

      // ✅ small wait so firebase user state is ready (prevents redirect back to login)
      await new Promise((r) => setTimeout(r, 300));

      // ✅ redirect after success
      navigate(redirectTo);

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        err?.message ||
        "Something went wrong!";

      const isDuplicate = err?.response?.status === 409;

      Swal.fire({
        icon: "error",
        title: isDuplicate
          ? "You are already registered as donor"
          : "Registration failed",
        text: msg,
      });

      console.error("Registration error:", err);
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading)
    return <Loading label="Uploading photo & creating account..." />;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-200">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-base-100 p-8 shadow-lg border border-base-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-4">
              <FaPhone className="text-sm" />
              Donor Registration
            </div>
            <h2 className="text-3xl font-bold text-base-content mb-2">
              Join as a Lifesaver
            </h2>
            <p className="text-base-content/70">
              Complete your profile to start saving lives today
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(hendelRegestration)}
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="text-sm text-base-content/70">
                Fill all required fields (*)
              </div>

              <Link to="/loging" className="link link-primary text-sm font-medium">
                Already have an account?
              </Link>
            </div>

            {/* Personal Information Card */}
            <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                Personal Information
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Full Name *</span>
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`input input-bordered w-full ${
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.name.message}
                      </span>
                    </div>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Email Address *</span>
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`input input-bordered w-full ${
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    </div>
                  )}
                </label>

                {/* Phone Number Section - Added Here */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Phone Number *</span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <FaPhone className="text-base-content/50 text-sm" />
                      <span className="text-sm text-base-content/50">+880</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="1XXXXXXXXX"
                      className={`input input-bordered w-full pl-20 ${
                        errors.phone ? "input-error" : ""
                      }`}
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit phone number",
                        },
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.phone.message}
                      </span>
                    </div>
                  )}
                  <div className="label">
                    <span className="label-text-alt text-base-content/50">
                      Format: 017XXXXXXXX (10 digits without +880)
                    </span>
                  </div>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Blood Group *</span>
                  </div>
                  <select
                    className={`select select-bordered w-full ${
                      errors.bloodGroup ? "select-error" : ""
                    }`}
                    defaultValue=""
                    {...register("bloodGroup", {
                      required: "Blood group is required",
                    })}
                  >
                    <option value="" disabled>
                      Select your blood type
                    </option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.bloodGroup.message}
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Location Information Card */}
            <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold">2</span>
                </div>
                Location Details
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">District *</span>
                  </div>
                  <select
                    className={`select select-bordered w-full ${
                      errors.district ? "select-error" : ""
                    }`}
                    defaultValue=""
                    {...register("district", {
                      required: "District is required",
                    })}
                  >
                    <option value="" disabled>
                      Select your district
                    </option>
                    {locaitondata?.map((dis) => (
                      <option key={dis.id} value={dis.id}>
                        {dis.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.district.message}
                      </span>
                    </div>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Upazila *</span>
                  </div>
                  <select
                    className={`select select-bordered w-full ${
                      errors.upazila ? "select-error" : ""
                    }`}
                    disabled={!districtId}
                    defaultValue=""
                    {...register("upazila", { required: "Upazila is required" })}
                  >
                    <option value="" disabled>
                      {districtId ? "Select your upazila" : "Select district first"}
                    </option>
                    {upazilas.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  {errors.upazila && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.upazila.message}
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Profile Picture Card */}
            <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">3</span>
                </div>
                Profile Picture
              </h3>
              
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Upload Profile Photo *</span>
                  <span className="label-text-alt text-base-content/60">
                    Recommended: 500×500px
                  </span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  accept="image/*"
                  {...register("ProfileImage", {
                    required: "Profile image is required",
                  })}
                />
                {errors.ProfileImage && (
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {errors.ProfileImage.message}
                    </span>
                  </div>
                )}
                <div className="label">
                  <span className="label-text-alt text-base-content/50">
                    This helps recipients identify donors
                  </span>
                </div>
              </label>
            </div>

            {/* Security Information Card */}
            <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <span className="text-success font-bold">4</span>
                </div>
                Account Security
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Password *</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`input input-bordered w-full pr-12 ${
                        errors.password ? "input-error" : ""
                      }`}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                          message:
                            "Password must have uppercase, lowercase, number & special character (min 6)",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="text-lg" />
                      ) : (
                        <AiOutlineEye className="text-lg" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.password.message}
                      </span>
                    </div>
                  )}
                  <div className="label">
                    <span className="label-text-alt text-base-content/50">
                      Min 6 chars with mixed case, numbers & symbols
                    </span>
                  </div>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">
                      Confirm Password *
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className={`input input-bordered w-full pr-12 ${
                        errors.confirmPassword ? "input-error" : ""
                      }`}
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === password || "Password does not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      {showConfirm ? (
                        <AiOutlineEyeInvisible className="text-lg" />
                      ) : (
                        <AiOutlineEye className="text-lg" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword.message}
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mt-1"
                    required
                  />
                  <div>
                    <span className="font-medium text-base-content">
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                    <p className="text-sm text-base-content/70 mt-1">
                      By registering, you agree to be contacted for blood donation requests and understand the importance of accurate information.
                    </p>
                  </div>
                </label>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full rounded-xl text-lg font-semibold h-14 hover:shadow-lg transition-all"
                >
                  Complete Registration
                </button>

                <div className="text-center">
                  <p className="text-sm text-base-content/70">
                    Already have an account?{" "}
                    <Link to="/loging" className="link link-primary font-medium">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Regestration;