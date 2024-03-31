import React, { useEffect } from "react";
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Blogs from '../Components/Blogs';
import OurStory from '../Components/OurStory';
import Contact from '../Components/Contact';


function HomeMain() {
    useEffect(() => {
      const handleHamburgerClick = () => {
        const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
        const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
      };
  
      const handleScroll = () => {
       const scroll_position = window.scrollY;
        const header = document.querySelector('.header.container');
        if (header) {
          if (scroll_position > 250) {
            header.style.backgroundColor = '#29323c';
          } else {
            header.style.backgroundColor = 'transparent';
          }
        }
      };
  
      const handleMenuItemClick = () => {
        const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
        const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
      };
  
      // Attach event listeners
      const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
      const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
  
      if (hamburger) {
        hamburger.addEventListener('click', handleHamburgerClick);
      }
  
      document.addEventListener('scroll', handleScroll);
  
      if (menu_item) {
        menu_item.forEach((item) => {
          item.addEventListener('click', handleMenuItemClick);
        });
      }
  
      // Clean up event listeners on component unmount
      return () => {
        document.removeEventListener('scroll', handleScroll);
  
        if (hamburger) {
          hamburger.removeEventListener('click', handleHamburgerClick);
        }
  
        if (menu_item) {
          menu_item.forEach((item) => {
            item.removeEventListener('click', handleMenuItemClick);
          });
        }
      };
    }, []);
  
    return (
      <>
        <Header />
        <Hero />
        <About />
        <Blogs />
        <OurStory />
        <Contact />
        <Footer />
      </>
    );
  }
  
  export default HomeMain;