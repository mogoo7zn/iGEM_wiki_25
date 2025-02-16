import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <section id="footer">
      <div className="inner">
        <div className="footer-content">
          {/* Left Column - Social */}
          <div className="footer-social">
            <div className="logo-large">TOMB RAIDER</div>
            <div className="divider"></div>
            <div className="social-icons">
              <a href="#" className="icon" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="icon" aria-label="WeChat">
                <i className="fab fa-weixin"></i>
              </a>
              <a href="#" className="icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="icon" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" className="icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Right Column - Forum */}
          <div className="footer-forum">
            <div className="forum-section">
              <h3>Community</h3>
              <ul>
                <li>
                  <a href="#">Forum Home</a>
                </li>
                <li>
                  <a href="#">News & Updates</a>
                </li>
                <li>
                  <a href="#">Member List</a>
                </li>
                <li>
                  <a href="#">Calendar</a>
                </li>
              </ul>
            </div>
            <div className="forum-section">
              <h3>Categories</h3>
              <ul>
                <li>
                  <a href="#">General Discussion</a>
                </li>
                <li>
                  <a href="#">Game Guides</a>
                </li>
                <li>
                  <a href="#">Technical Support</a>
                </li>
                <li>
                  <a href="https://github.com/mogoo7zn">mogoo7zn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
