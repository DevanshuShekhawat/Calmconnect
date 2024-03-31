import React from 'react'

export default function Header() {
  return (
    <section id="header">
      <div className="header container">
        <div className="nav-bar">
          <div className="brand">
            <a href="#hero">
              <h1 className='main-logo'><span>C</span>alm<span>C</span>onnect</h1>
            </a>
          </div>
          <div className="nav-list">
            <div className="hamburger">
              <div className="bar"></div>
            </div>
            <ul>
              <li><a href="#home" data-after="Home">Home</a></li>
              <li><a href="#abouts" data-after="About">About</a></li>
              <li><a href="#blogs" data-after="blogs">blogs</a></li>
              <li><a href="#ourstory" data-after="Our Story">Our Story</a></li>
              <li><a href="#contact" data-after="Contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
