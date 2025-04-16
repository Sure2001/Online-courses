import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import STUDENT from "../images/student.png";
import "./search.css";

function Search() {
  return (
    <Container className="search-container">
      <div className="search-box">
        <h2>Search Courses</h2>
        <div className="search-input">  
          <input type="text" placeholder="search for over 50+ courses " />
          <button className="mani-4">Search</button>
        </div>
      </div>
      <Row className="search-row">
        <Col xs={12} md={12} lg={6}>
          <div className="grid">
            <div className="grid-item-1" style={{ backgroundColor: "#f78da7" }}>
              <img src={STUDENT} className="round-img" />
            </div>
            <div className="grid-item-2" style={{ backgroundColor: "#8261ee" }}>
              <img src={STUDENT} className="round-img" />
            </div>
            <div className="grid-item-3" style={{ backgroundColor: "#8261ee" }}>
              <img src={STUDENT} className="round-img" />
            </div>
            <div className="grid-item-4" style={{ backgroundColor: "#f78da7" }}>
              <img src={STUDENT} className="round-img" />
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <div className="list">
            <h1>
              <span>Benefits</span> From Our Online Learning
            </h1>
            <div className="item">
              <div className="circle-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-mortarboard-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z" />
                  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z" />
                </svg>
              </div>
              <div className="list-item">
                <h5>Online Degrees</h5>
                <p>
                  Earn accredited degrees from the comfort of your home, opening
                  doors to a world of possibilities.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="circle-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-book"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                </svg>
              </div>
              <div className="list-item">
                <h5>Short Courses</h5>
                <p>
                  Enhance your skills with our concise and focused short
                  courses, designed for quick and effective learning.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="circle-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </div>
              <div className="list-item">
                <h5>Training From Experts</h5>
                <p>
                  Immerse yourself in knowledge with industry experts guiding
                  you through hands-on experience.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="circle-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
              <div className="list-item">
                <h5>1.5k+ Video Courses</h5>
                <p>
                  Dive into a vast library of over 1.5k video courses covering
                  many subjects, offering a visual learning experience.
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Search;
