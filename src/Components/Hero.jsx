import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  let navigate = useNavigate();
  return (
    <div>
      <section id="home">
    <div className="home container">
      <div>
        <h1>It <span></span></h1>
        <h1>Connects You  <span></span></h1>
        <h1>To The World <span></span></h1>
        <a href="#" type="button" target="_blank" className="cta" onClick={() => navigate("/login")} >Talk Now</a>
      </div>
    </div>
  </section>
    </div>
  )
}
