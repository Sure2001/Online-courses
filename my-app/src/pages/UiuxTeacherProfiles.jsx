import React from "react";
import "../pages/uiux.css";
import { FaTwitter, FaLinkedin, FaBehance } from "react-icons/fa";

const teachers = [
  {
    name: "Emma Watson",
    title: "Senior UX Designer",
    bio: "Passionate about creating seamless digital experiences.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience:
      "8+ years in UX Design, focusing on accessibility and research.",
    contact: "emma.watson@example.com",
    about:
      "Emma has led UX teams at top tech companies, pioneering inclusive design systems that serve millions.",
  },
  {
    name: "Liam Carter",
    title: "UI Specialist",
    bio: "Crafting pixel-perfect interfaces and smooth user flows.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience: "6 years of UI design in mobile and web applications.",
    contact: "liam.carter@example.com",
    about:
      "Liam’s interfaces are not just beautiful—they are backed by thoughtful usability studies and feedback cycles.",
  },
  {
    name: "Sophia Lin",
    title: "UX Researcher",
    bio: "Turning complex user data into design decisions.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience: "5+ years of user research in SaaS and fintech.",
    contact: "sophia.lin@example.com",
    about:
      "Sophia has conducted hundreds of interviews, turning insights into product breakthroughs.",
  },
  {
    name: "Noah Patel",
    title: "Product Designer",
    bio: "Blending design thinking with agile development.",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience: "7 years designing and shipping digital products.",
    contact: "noah.patel@example.com",
    about:
      "Noah works at the intersection of business goals and user needs to deliver value through design.",
  },
  {
    name: "Ava Kim",
    title: "Visual Designer",
    bio: "Lover of clean, bold, minimal storytelling.",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience: "4+ years in brand identity and marketing design.",
    contact: "ava.kim@example.com",
    about:
      "Ava’s visual work has helped startups shape memorable, modern brands in competitive markets.",
  },
  {
    name: "Ethan Zhao",
    title: "Interaction Designer",
    bio: "Designs intuitive interactions and micro-animations.",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience: "6 years of interaction and motion design.",
    contact: "ethan.zhao@example.com",
    about:
      "Ethan bridges design and development with motion that enhances the user journey.",
  },
  {
    name: "Maya Singh",
    title: "UX Strategist",
    bio: "Aligns user needs with business strategy.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience: "9+ years in enterprise UX strategy.",
    contact: "maya.singh@example.com",
    about:
      "Maya has built UX teams and roadmaps for large organizations across healthcare and logistics.",
  },
  {
    name: "Carlos Rivera",
    title: "UI/UX Mentor",
    bio: "Mentoring junior designers to reach their potential.",
    img: "https://randomuser.me/api/portraits/men/56.jpg",
    twitter: "#",
    linkedin: "#",
    behance: "#",
    experience: "10+ years in design leadership and mentoring.",
    contact: "carlos.rivera@example.com",
    about:
      "Carlos has coached dozens of designers, helping them level up their skills and portfolios.",
  },
];

const UiuxTeacherProfiles = () => {
  return (
    <div className="uiux-container">
      {teachers.map((teacher, index) => (
        <div key={index} className="teacher-card">
          <img
            src={teacher.img}
            alt={teacher.name}
            className="teacher-avatar"
          />
          <h2 className="teacher-name">{teacher.name}</h2>
          <p className="teacher-title">{teacher.title}</p>
          <p className="teacher-bio">{teacher.bio}</p>
          <p className="teacher-experience">{teacher.experience}</p>
          <p className="teacher-about">{teacher.about}</p>
          <p className="teacher-contact">
            <strong>Contact:</strong> {teacher.contact}
          </p>
          <div className="teacher-socials">
            <a href={teacher.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a
              href={teacher.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a href={teacher.behance} target="_blank" rel="noopener noreferrer">
              <FaBehance />
            </a>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default UiuxTeacherProfiles;
