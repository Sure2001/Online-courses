import { useState } from "react";
import { addUser } from "../api.js";

export default function AddUser() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        city: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await addUser(formData);
      if (response.error) {
        alert(`Error: ${response.error}`);
      } else {
        alert(response.message || "User successfully signed up!");
      }
    };

    return (
        <div className="add-user-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label >UserName</label><br />
                <input name="username" placeholder="Username" onChange={handleChange} required /> <br />
                <label >Email</label><br />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /> <br />
                <label >Password</label><br />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required /> <br />
                <label >Phone</label><br />
                <input name="phone" placeholder="Phone" onChange={handleChange} required /><br />
                <label >City</label><br />
                <input name="city" placeholder="City" onChange={handleChange} required /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}