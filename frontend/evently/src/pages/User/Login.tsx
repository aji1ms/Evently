import { useEffect, useState } from "react";
import loginImg from "../../assets/images/loginImg.webp";
import Inputs from "../../components/user/Inputs/Inputs";
import { Link, useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../../../utils/helper";
import type { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/slices/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [err, setError] = useState<string>("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("please enter a valid email address");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters with letters and numbers");
            return;
        }
        await dispatch(loginUser({ email, password }));
        toast.success("Login successfull!", { duration: 2000 });
        setError("")
    }

    return (

        <div className="bg-blue-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">

                    <div className="flex-1 p-6 sm:p-8 lg:p-12">
                        <div className="max-w-md mx-auto lg:mx-0">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
                                Evently
                            </h1>
                            <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-700 mb-8 lg:mb-10">
                                Sign in to your account
                            </h3>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <Inputs
                                    value={email}
                                    type="email"
                                    label="Email Address"
                                    placeholder='john123@gmail.com'
                                    onChange={({ target }) => setEmail(target.value)}
                                />
                                <Inputs
                                    value={password}
                                    type="password"
                                    label="Password"
                                    placeholder='Min 6 character'
                                    onChange={({ target }) => setPassword(target.value)}
                                />

                                {err && (
                                    <p className='text-red-500 text-sm font-medium'>
                                        {err}
                                    </p>
                                )}

                                {error && (
                                    <p className='text-red-500 text-sm font-medium'>
                                        {error}
                                    </p>
                                )}

                                <button
                                    disabled={loading}
                                    type='submit'
                                    className='w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors font-medium'
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>

                                <button
                                    type='button'
                                    className='w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition-colors font-medium'
                                >
                                    Sign up with google
                                </button>

                                <p className='text-sm text-slate-800 text-center'>
                                    Don't have an account?{" "}
                                    <Link className='font-medium underline text-blue-600 hover:text-blue-800' to="/signup">
                                        SignUp
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>

                    <div className="flex-1 hidden lg:block relative">
                        <img
                            src={loginImg}
                            alt="login illustration"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login
