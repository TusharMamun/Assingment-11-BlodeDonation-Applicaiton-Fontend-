import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { FiUser, FiShield, FiLogIn } from "react-icons/fi";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isFillingAdmin, setIsFillingAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "", remember: false },
  });

  // Admin credentials
  const adminCredentials = {
    email: "blooddonationadmin@gmail.com",
    password: "ProgrammingHeroStudent345@"
  };

  // Function to fill admin credentials
  const fillAdminCredentials = () => {
    setIsFillingAdmin(true);
    setValue("email", adminCredentials.email, { shouldValidate: true });
    setValue("password", adminCredentials.password, { shouldValidate: true });
    
    // Show success message
    Swal.fire({
      icon: "success",
      title: "Admin Credentials Filled!",
      text: "Click Login to continue as Administrator",
      timer: 1500,
      showConfirmButton: false,
    });

    // Auto-hide the filling state after 1 second
    setTimeout(() => setIsFillingAdmin(false), 1000);
  };

  const onSubmit = async (data) => {
    try {
      const res = await signIn(data.email, data.password);
      console.log("Logged in user:", res.user);

      await Swal.fire({
        icon: "success",
        title: "Login successful!",
        text: "Welcome back 🙂",
        timer: 1500,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f9fafb",
      });

      const redirectTo = location.state?.from?.pathname || "/";    
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.log("Login error:", err?.message);

      await Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: err?.message || "Invalid email or password",
        confirmButtonText: "Try again",
        background: "#1f2937",
        color: "#f9fafb",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left: Attractive side panel */}
          <div className="hidden lg:block">
            <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-pink-600">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 2s6 6.6 6 12a6 6 0 1 1-12 0c0-5.4 6-12 6-12z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M12 9v6" strokeLinecap="round" />
                    <path d="M9 12h6" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="leading-tight">
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Blood Donation
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Save Lives Together
                  </div>
                </div>
              </div>

              <h1 className="mt-8 text-4xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
                Log in to manage blood donation requests, track funding, and access your personalized dashboard.
              </p>

              {/* Admin Login Button - Prominent */}
              <div className="mt-8">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-lg">
                  <button
                    onClick={fillAdminCredentials}
                    disabled={isFillingAdmin}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-transform ${isFillingAdmin ? 'scale-110' : 'group-hover:scale-110'}`}>
                      <FiShield className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">Quick Admin Login</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {isFillingAdmin ? "Credentials filled! ✓" : "Click to auto-fill admin credentials"}
                      </div>
                    </div>
                    <FiLogIn className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform ${isFillingAdmin ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 border border-blue-100 dark:border-blue-900/30">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Security Tips
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        • Keep your account secure with a strong password<br/>
                        • Never share your login credentials<br/>
                        • Log out from public computers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    New to our platform?
                    <Link to="/regester" className="ml-2 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      Create your account now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login card */}
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sign In
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className={`w-full px-4 py-3 pl-12 rounded-xl border ${
                      errors.email 
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-all`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pl-12 pr-12 rounded-xl border ${
                      errors.password 
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-all`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-600"
                    {...register("remember")}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FiLogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>

              {/* Mobile Admin Button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={fillAdminCredentials}
                  disabled={isFillingAdmin}
                  className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiShield className="w-5 h-5" />
                  {isFillingAdmin ? "Admin Credentials Filled ✓" : "Fill Admin Credentials"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                    New to our platform?
                  </span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <Link 
                  to="/regester" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create New Account
                </Link>
              </div>

              {/* Admin Info Note */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-start gap-3">
                  <FiShield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Admin Access
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Use the "Quick Admin Login" button to test admin features with pre-filled credentials.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;