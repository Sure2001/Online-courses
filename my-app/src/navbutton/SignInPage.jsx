import { useState } from "react";
import { loginUser, forgotPassword } from "../api";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: "",
        newPassword: ""
    });

    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleForgotPasswordChange = (e) => {
        setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(formData);
        alert(response.message || response.error);
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        const response = await forgotPassword(forgotPasswordData);
        alert(response.message || response.error);
        if (response.message) {
            setIsForgotPassword(false); // Hide forgot password form on success
        }
    };

    return (
        <div>
            <h2>{isForgotPassword ? "Forgot Password" : "Login"}</h2>

            {!isForgotPassword ? (
                <form onSubmit={handleSubmit}> 
                    <label >Email</label><br />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
                    <label >Password</label><br />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
                    <button type="submit">Login</button>

                    
            <button onClick={() => setIsForgotPassword(!isForgotPassword)}>
                {isForgotPassword ? "Back to Login" : "Forgot Password?"}
            </button>  
                </form>
            ) : (
                <form onSubmit={handleForgotPasswordSubmit}>
                    <label >Email</label><br />
                    <input name="email" type="email" placeholder="Email" onChange={handleForgotPasswordChange} required /><br />
                    <label >New Password</label><br />
                    <input name="newPassword" type="password" placeholder="New Password" onChange={handleForgotPasswordChange} required /><br />
                    <button type="submit">Reset Password</button>
                </form>
            )}

        </div>
    );
}