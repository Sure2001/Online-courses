import React from "react";
import { Container,Col } from "react-bootstrap";
import Slider from "react-slick";
import "./Footer.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import G from "../images/avatar-01.jpg";

const testimonials = [
  {
    image: G ,
    name: " Alexa Rodriguez",
    coures: "Web Developer",
    star: "⭐⭐⭐⭐⭐",
    content:"Enrolling in courses at this eLearning platform was a game-changer for me. Absolutely transformative experience!",
  },
  {
    image: G ,
    name: " Emily chen",
    coures: "ui/ux designer",
    star: "⭐⭐⭐⭐⭐",
    content:"Exceptional courses! The practical insights and flexible learning structure have been instrumental in my professional growth"
  },
  {
    image: G,
    name: " James Johnson",
    coures: "Web Developer",
    star: "⭐⭐⭐⭐⭐",
    content:"Highly recommend! The personalized feedback and real-world application in the courses have elevated my understanding..."
  },
 
];

function Footer() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="footer">
      <Container className="footer-container">
        <h2>Student's Testimonials</h2>
        <p>
          Here’s what our students have to say about their transformative
          learning experience: Real stories, real growth. Discover firsthand the
          impact our courses have had on their lives.
        </p>
      </Container>
      <div className="testimonial-slider mt-4">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index}>
              <div className="testimonial-card">
                <img
                  src={item.image}
                  className="testimonial-img"
                />
                <h5>{item.name}</h5>
                <p>{item.coures}</p>
                <span>{item.star}</span>
              
              <div className="testimonial-card-01">
                <h6>{item.content}</h6>
              </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="footer-card">
        <div className="footer-card-1">
          <h2>Get In Touch!</h2>
          <p>
            Subscribe Us to get in touch and to enjoy discounts, promos and much
            more!
          </p>
          <input type="email" placeholder="Enter your email...." />
          <button className="footer-button">Subscribe</button>
        </div>
      </div>

      <Container className="footer-list">
        <Col className="footer-section">
          <h2 class="logo">Etech.</h2>
          <p>
            Explore a transformative approach to skill development on our online
            learning platform.
          </p>
          <div class="social-icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-whatsapp"
              viewBox="0 0 16 16"
            >
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-linkedin"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </div>
        </Col>

        <Col className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
          </ul>
        </Col>

        <Col className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Tweet @ Us</a>
            </li>
            <li>
              <a href="#">Webinars</a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </Col>

        <Col className="footer-section">
          <h3>Links</h3>
          <ul>
            <li>
              <a href="#">Courses</a>
            </li>
            <li>
              <a href="#">Become Teacher</a>
            </li>
            <li>
              <a href="#">Service</a>
            </li>
            <li>
              <a href="#">All in One</a>
            </li>
          </ul>
        </Col>

        <Col className="footer-section">
          <h3>Contact Us</h3>
          <p>+1 (555) 123-4567</p>
          <p>etechinfo@gmail.com</p>
        </Col>
        
        </Container>
        <div class="footer-bottom">
          <p>Copyright © 2023 Etech. All rights reserved</p>
        </div>
      
    </div>
    
  );
}

export default Footer;
