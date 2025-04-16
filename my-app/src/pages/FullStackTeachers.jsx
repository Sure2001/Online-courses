import React, { useState } from "react";
import "../pages/Teachers.css";
import D1 from "../images/avatar-01.jpg";
import D2 from "../images/avatar-01.jpg";
import D3 from "../images/avatar-01.jpg";
import D4 from "../images/avatar-01.jpg";
import D5 from "../images/avatar-01.jpg";
import D6 from "../images/avatar-01.jpg";

const teachers = [
  {
    name: "Rajakumar",
    title: "MERN Stack Mentor",
    bio: "Expert in MongoDB, Express, React, and Node.js with a passion for teaching.",
    contact: "rajakumar@example.com",
    experience: "8 years teaching experience in full-stack web development.",
    image: D1,
    rating: 5,
    ratingType: "Expert Mentor",
  },
  {
    name: "Divya Sharma",
    title: "React & Node Mentor",
    bio: "Specializes in frontend-backend integration and full-stack projects.",
    contact: "divya@example.com",
    experience: "6 years with modern web technologies.",
    image: D2,
    rating: 4,
    ratingType: "Senior Mentor",
  },
  {
    name: "Amit Verma",
    title: "Backend Mentor",
    bio: "Skilled in REST APIs, security, and database design.",
    contact: "amit@example.com",
    experience: "7 years backend development expertise.",
    image: D3,
    rating: 4,
    ratingType: "Backend Specialist",
  },
  {
    name: "Neha Kapoor",
    title: "UI/UX + Full Stack",
    bio: "Focuses on user experience while mastering full-stack development.",
    contact: "neha@example.com",
    experience: "5 years designing intuitive interfaces.",
    image: D4,
    rating: 5,
    ratingType: "UX Champion",
  },
  {
    name: "Vikram Desai",
    title: "Full Stack & DevOps",
    bio: "Blends full stack knowledge with deployment and scalability techniques.",
    contact: "vikram@example.com",
    experience: "9 years building scalable systems.",
    image: D5,
    rating: 5,
    ratingType: "DevOps Guru",
  },
  {
    name: "Anjali Rao",
    title: "JavaScript & Cloud",
    bio: "Passionate about scalable architecture and modern JS ecosystems.",
    contact: "anjali@example.com",
    experience: "7 years building cloud-native apps.",
    image: D6,
    rating: 4,
    ratingType: "Cloud Architect",
  },
];

const FullStackTeachers = () => {
  const [activeTab, setActiveTab] = useState({});

  const handleTabClick = (index, tab) => {
    setActiveTab((prev) => ({ ...prev, [index]: tab }));
  };

  return (
    <div className="staff-container">
      <h2 className="section-title">Meet Our Full Stack Teachers</h2>
      <div className="teacher-grid">
        {teachers.map((teacher, index) => (
          <div className="teacher-card-custom" key={index}>
            <div className="card-header-custom">
              <img src={teacher.image} alt={teacher.name} className="teacher-img" />
            </div>
            <div className="card-body-custom">
              <h3>{teacher.name}</h3>
              <p className="teacher-title">{teacher.title}</p>

              <div className="teacher-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < teacher.rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="rating-type">{teacher.ratingType}</p>

              <h6 className="tab-label">{(activeTab[index] || "about").toUpperCase()}</h6>

              <div className="tab-content">
                {activeTab[index] === "contact" && (
                  <p><strong>Email:</strong> {teacher.contact}</p>
                )}
                {activeTab[index] === "experience" && (
                  <p>{teacher.experience}</p>
                )}
                {(activeTab[index] === "about" || !activeTab[index]) && (
                  <p>{teacher.bio}</p>
                )}
              </div>

              <div className="tab-buttons">
                <button
                  onClick={() => handleTabClick(index, "about")}
                  className={activeTab[index] === "about" || !activeTab[index] ? "active" : ""}
                >
                  About
                </button>
                <button
                  onClick={() => handleTabClick(index, "contact")}
                  className={activeTab[index] === "contact" ? "active" : ""}
                >
                  Contact
                </button>
                <button
                  onClick={() => handleTabClick(index, "experience")}
                  className={activeTab[index] === "experience" ? "active" : ""}
                >
                  Experience
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullStackTeachers;
