import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaPhone, FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendar, FaClock, FaHospital, FaComment, FaTint, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const locationData = useLoaderData();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const bloodGroups = useMemo(
    () => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    []
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      requesterName: "",
      requesterEmail: "",
      requesterPhone: "",
      recipientName: "",
      recipientDistrict: "",
      recipientUpazila: "",
      hospitalName: "",
      fullAddress: "",
      bloodGroup: "",
      donationDate: "",
      donationTime: "",
      requestMessage: "",
    },
  });

  // Set current date as minimum for date picker
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  // ✅ FIX: set requester fields AFTER user loads
  useEffect(() => {
    if (user?.email) {
      setValue("requesterName", user?.displayName || "");
      setValue("requesterEmail", user?.email || "");
      setValue("requesterPhone", user?.phoneNumber || "");
    }
  }, [user, setValue]);

  // district -> upazila
  const districtId = useWatch({ control, name: "recipientDistrict" });

  const selectedDistrict = useMemo(() => {
    return locationData?.find((d) => String(d.id) === String(districtId));
  }, [locationData, districtId]);

  const upazilas = selectedDistrict?.upazilas ?? [];

  useEffect(() => {
    setValue("recipientUpazila", "");
  }, [districtId, setValue]);

  const onSubmit = async (data) => {
    // ✅ check auth
    if (!user?.email) {
      return Swal.fire("Login Required", "Please login first.", "info");
    }

    const districtObj = locationData?.find(
      (d) => String(d.id) === String(data.recipientDistrict)
    );

    const payload = {
      requesterName: data.requesterName,
      requesterEmail: data.requesterEmail,
      requesterPhone: data.requesterPhone,
      recipientName: data.recipientName,
      recipientDistrict: districtObj?.name || "",
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
    };

    const confirm = await Swal.fire({
      title: "Confirm Donation Request?",
      text: "Please review all details before submitting.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#C62828",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Submit Request",
      cancelButtonText: "Review Details",
      background: "#1f2937",
      color: "#f9fafb",
    });

    if (!confirm.isConfirmed) return;

    try {
      setSubmitting(true);

      const res = await axiosSecure.post("/CreatedBloadDonation", payload);

      await Swal.fire({
        icon: "success",
        title: "Request Created!",
        text: "Your donation request has been submitted successfully.",
        showConfirmButton: true,
        confirmButtonColor: "#10b981",
        timer: 2000,
        timerProgressBar: true,
        background: "#1f2937",
        color: "#f9fafb",
      });

      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";

      let title = "Submission Failed";
      if (status === 403) title = "Access Denied";
      if (status === 404) title = "User Not Found";
      if (status === 400) title = "Invalid Input";

      Swal.fire({
        icon: "error",
        title,
        text: message,
        confirmButtonColor: "#C62828",
        confirmButtonText: "Try Again",
        background: "#1f2937",
        color: "#f9fafb",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Custom input styling
  const inputClasses = (hasError = false) => `
    input input-bordered w-full rounded-xl 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-white 
    border-gray-300 dark:border-gray-600
    placeholder-gray-500 dark:placeholder-gray-400
    focus:border-red-500 dark:focus:border-red-400
    focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-400/20
    transition-all duration-300
    ${hasError ? "border-red-500 dark:border-red-400" : ""}
  `;

  const selectClasses = (hasError = false) => `
    select select-bordered w-full rounded-xl
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-white 
    border-gray-300 dark:border-gray-600
    focus:border-red-500 dark:focus:border-red-400
    focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-400/20
    transition-all duration-300
    ${hasError ? "border-red-500 dark:border-red-400" : ""}
  `;

  const textareaClasses = (hasError = false) => `
    textarea textarea-bordered w-full rounded-xl 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-white 
    border-gray-300 dark:border-gray-600
    placeholder-gray-500 dark:placeholder-gray-400
    focus:border-red-500 dark:focus:border-red-400
    focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-400/20
    transition-all duration-300
    min-h-[140px]
    ${hasError ? "border-red-500 dark:border-red-400" : ""}
  `;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl z-10">
        {/* Header with Animation */}
        <div className="mb-10 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 mb-6 shadow-2xl animate-pulse-slow">
            <FaTint className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Create Blood Donation Request
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Your request could save a life. Please provide accurate details to connect with potential donors.
          </p>
          
          {/* Progress Steps */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === 1 
                    ? "bg-red-600 text-white shadow-lg" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {step}
                </div>
                {step < 5 && (
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl">
          {/* Form Header with Gradient */}
          <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
            
            <div className="relative z-10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <FaInfoCircle className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Life-Saving Request Form</h2>
                <p className="text-red-100 mt-1">Complete all sections to submit your request</p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Section 1: Requester Info */}
              <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    <FaUser className="text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Requester Information</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your contact details</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Requester Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaUser className="text-red-500 text-sm" /> Your Name
                      </span>
                    </label>
                    <input
                      readOnly
                      className={inputClasses()}
                      {...register("requesterName")}
                    />
                  </div>

                  {/* Requester Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaEnvelope className="text-red-500 text-sm" /> Your Email
                      </span>
                    </label>
                    <input
                      readOnly
                      className={inputClasses()}
                      {...register("requesterEmail")}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaPhone className="text-red-500 text-sm" /> Phone Number *
                      </span>
                    </label>
                    <input
                      type="tel"
                      className={inputClasses(!!errors.requesterPhone)}
                      placeholder="+8801XXXXXXXXX"
                      {...register("requesterPhone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+]?[0-9\s\-\(\)]{10,20}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                    />
                    {errors.requesterPhone && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.requesterPhone.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Recipient & Blood Group */}
              <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
                    <FaTint className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recipient & Blood Details</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Information about who needs blood</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recipient Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        Recipient Full Name *
                      </span>
                    </label>
                    <input
                      className={inputClasses(!!errors.recipientName)}
                      placeholder="Enter recipient's full name"
                      {...register("recipientName", {
                        required: "Recipient name is required",
                      })}
                    />
                    {errors.recipientName && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.recipientName.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Blood Group */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        Required Blood Group *
                      </span>
                    </label>
                    <select
                      className={selectClasses(!!errors.bloodGroup)}
                      defaultValue=""
                      {...register("bloodGroup", {
                        required: "Blood group is required",
                      })}
                    >
                      <option value="" disabled className="text-gray-400 dark:text-gray-500">
                        Select blood group
                      </option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg} className="text-gray-900 dark:text-white py-2">
                          {bg}
                        </option>
                      ))}
                    </select>
                    {errors.bloodGroup && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.bloodGroup.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Location Details */}
              <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Location Details</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Where the donation is needed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* District */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        District *
                      </span>
                    </label>
                    <select
                      className={selectClasses(!!errors.recipientDistrict)}
                      defaultValue=""
                      {...register("recipientDistrict", {
                        required: "District is required",
                      })}
                    >
                      <option value="" disabled className="text-gray-400 dark:text-gray-500">
                        Select district
                      </option>
                      {locationData?.map((d) => (
                        <option key={d.id} value={d.id} className="text-gray-900 dark:text-white py-2">
                          {d.name}
                        </option>
                      ))}
                    </select>
                    {errors.recipientDistrict && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.recipientDistrict.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Upazila */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                        Upazila *
                      </span>
                    </label>
                    <select
                      className={selectClasses(!!errors.recipientUpazila)}
                      disabled={!districtId}
                      defaultValue=""
                      {...register("recipientUpazila", {
                        required: "Upazila is required",
                      })}
                    >
                      <option value="" disabled className="text-gray-400 dark:text-gray-500">
                        {districtId ? "Select upazila" : "Select district first"}
                      </option>
                      {upazilas.map((u) => (
                        <option key={u} value={u} className="text-gray-900 dark:text-white py-2">
                          {u}
                        </option>
                      ))}
                    </select>
                    {errors.recipientUpazila && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.recipientUpazila.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Hospital Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaHospital className="text-emerald-500" /> Hospital Name *
                      </span>
                    </label>
                    <input
                      className={inputClasses(!!errors.hospitalName)}
                      placeholder="Enter hospital/clinic name"
                      {...register("hospitalName", {
                        required: "Hospital name is required",
                      })}
                    />
                    {errors.hospitalName && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.hospitalName.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Full Address */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-emerald-500" /> Full Address *
                      </span>
                    </label>
                    <input
                      className={inputClasses(!!errors.fullAddress)}
                      placeholder="Street, area, city details"
                      {...register("fullAddress", {
                        required: "Full address is required",
                      })}
                    />
                    {errors.fullAddress && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.fullAddress.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Date & Time */}
              <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    <FaCalendar className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Date & Time</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">When donation is needed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Donation Date */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaCalendar className="text-purple-500" /> Donation Date *
                      </span>
                    </label>
                    <input
                      type="date"
                      min={currentDate}
                      className={inputClasses(!!errors.donationDate)}
                      {...register("donationDate", { required: "Donation date is required" })}
                    />
                    {errors.donationDate && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.donationDate.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Donation Time */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaClock className="text-purple-500" /> Donation Time *
                      </span>
                    </label>
                    <input
                      type="time"
                      className={inputClasses(!!errors.donationTime)}
                      {...register("donationTime", { required: "Donation time is required" })}
                    />
                    {errors.donationTime && (
                      <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                        <FaExclamationCircle />
                        <span>{errors.donationTime.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 5: Additional Information */}
              <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                    <FaComment className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Additional Information</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Provide important details for donors</p>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                      Request Message *
                    </span>
                  </label>
                  <textarea
                    className={textareaClasses(!!errors.requestMessage)}
                    placeholder="Please provide details about why blood is needed, any specific requirements, medical condition details, or additional information that donors should know. This helps donors understand the urgency and importance."
                    {...register("requestMessage", {
                      required: "Request message is required",
                      minLength: { value: 30, message: "Please write at least 30 characters" },
                      maxLength: { value: 1000, message: "Message must be less than 1000 characters" },
                    })}
                  />
                  {errors.requestMessage && (
                    <div className="mt-2 flex items-center gap-1 text-red-500 dark:text-red-400 text-sm">
                      <FaExclamationCircle />
                      <span>{errors.requestMessage.message}</span>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Tip: Include details about patient condition, urgency level, and any special requirements.
                  </div>
                </div>
              </div>

              {/* Submit Button Section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <FaInfoCircle className="text-red-500" />
                      <span className="font-semibold">Important:</span>
                    </div>
                    <p>Your request will be visible to potential donors. Ensure all information is accurate.</p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`relative overflow-hidden px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] group ${
                      submitting 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 shadow-2xl hover:shadow-3xl"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {submitting ? (
                      <span className="relative flex items-center justify-center gap-3">
                        <div className="loading loading-spinner loading-md"></div>
                        <span className="text-lg">Processing Request...</span>
                      </span>
                    ) : (
                      <span className="relative flex items-center justify-center gap-3">
                        <FaTint className="text-xl animate-pulse" />
                        <span className="text-lg">Submit Life-Saving Request</span>
                        <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Information Card */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 via-emerald-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600">
              <FaTint className="text-white text-2xl" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Before You Submit</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Accuracy Checklist
                  </h5>
                  <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      </div>
                      <span>Contact information is correct and active</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      </div>
                      <span>Blood group is accurately specified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      </div>
                      <span>Hospital address is complete and clear</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    What Happens Next
                  </h5>
                  <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      </div>
                      <span>Your request will be visible to donors in the area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      </div>
                      <span>Potential donors can contact you directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      </div>
                      <span>You'll receive notifications about donor responses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;