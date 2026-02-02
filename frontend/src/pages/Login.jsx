import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/Slices/cartSlice";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: false, password: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, error, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      toast.success("Login successful!");
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, navigate, isCheckoutRedirect, dispatch, cart, guestId]);

  useEffect(() => {
    if (error && error !== "Server Error") {
      setFormError(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    const errors = { email: false, password: false };

    if (!email.trim()) {
      setFormError("Email is required");
      errors.email = true;
      setFieldErrors(errors);
      return;
    }

    if (!/\S+@gmail\.com/.test(email)) {
      setFormError("Please enter a valid email address");
      errors.email = true;
      setFieldErrors(errors);
      return;
    }

    if (!password.trim()) {
      setFormError("Password is required");
      errors.password = true;
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({ email: false, password: false });
    dispatch(loginUser({ email, password }));
  };

  if (error === "Server Error") {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-base font-medium tracking-wider text-gray-700">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center w-full p-8 md:w-1/2 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 border rounded-xl shadow-xl shadow-black/25 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Obsidian</h2>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-center">Hey there!</h2>
          <p className="mb-6 text-center text-gray-600">
            Enter your username and password to Login.
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormError("");
                setFieldErrors((prev) => ({ ...prev, email: false }));
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
              placeholder="enter your email address"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFormError("");
                setFieldErrors((prev) => ({ ...prev, password: false }));
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-black"
              }`}
              placeholder="enter your password" 
            />
          </div>

          {formError && (
            <p className="py-2 mb-4 text-sm text-center text-red-600 border border-red-200 rounded-md bg-red-50">
              {formError}
            </p>
          )}    

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 mt-3 font-semibold text-white transition bg-black rounded-lg hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden w-1/2 bg-gray-800 md:block">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={login}
            alt="Login"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
