import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../redux/ApiCalls/AuthApiCall";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const { isEmailVerified } = useSelector(state => state.auth);
    const { userId, token } = useParams();

    useEffect(() => {
        dispatch(verifyEmail(userId, token));
    }, [dispatch, userId, token]);

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
                {isEmailVerified ? (
                    <>
                        <i className="bi bi-patch-check verify-email-icon text-6xl text-green-500 mb-4"></i>
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">
                            Your email has been successfully verified!
                        </h1>
                        <Link
                            to="/"
                            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Go To Login Page
                        </Link>
                    </>
                ) : (
                    <>
                        <i className="bi bi-exclamation-triangle-fill text-6xl text-red-500 mb-4"></i>
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">
                            Verification Failed
                        </h1>
                        <p className="text-gray-600 mb-4">
                            The email verification link is invalid or expired.
                        </p>
                        <Link
                            to="/"
                            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Go To Home
                        </Link>
                    </>
                )}
            </div>
        </section>
    );
};

export default VerifyEmail;
