import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { FaEdit, FaSave, FaUser } from "react-icons/fa";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch user details when the page loads
    axios
      .get("http://localhost:5000/api/admin/profile")
      .then((res) => {
        setUser(res.data);
        setNewName(res.data.name);
        setNewEmail(res.data.email);
        setNewPhone(res.data.phone);
      })
      .catch((err) => setError("Failed to fetch profile"));
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSaveProfile = () => {
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("email", newEmail);
    formData.append("phone", newPhone);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    axios
      .put("http://localhost:5000/api/admin/profile", formData)
      .then((res) => {
        setUser(res.data);
        setSuccess("Profile updated successfully");
        setError("");
        setEditMode(false);
      })
      .catch((err) => {
        setError("Failed to update profile");
        setSuccess("");
      });
  };

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {user && (
        <div className="profile-container">
          <div className="profile-header">
            <h3>Admin Profile</h3>
            <Button variant="primary" onClick={handleEditToggle}>
              {editMode ? "Cancel" : <><FaEdit /> Edit Profile</>}
            </Button>
          </div>

          <div className="profile-details">
            <div className="profile-picture">
              <img
                src={user.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="profile-image"
              />
              {editMode && (
                <Form.Group>
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleProfilePictureChange}
                  />
                </Form.Group>
              )}
            </div>

            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editMode ? newName : user.name}
                  onChange={(e) => setNewName(e.target.value)}
                  disabled={!editMode}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editMode ? newEmail : user.email}
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled={!editMode}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={editMode ? newPhone : user.phone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  disabled={!editMode}
                />
              </Form.Group>

              {editMode && (
                <Button
                  variant="success"
                  onClick={handleSaveProfile}
                  className="mt-3"
                >
                  <FaSave /> Save Changes
                </Button>
              )}
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
