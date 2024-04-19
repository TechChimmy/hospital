import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Embark on a journey through the heart of healthcare innovation.
            Explore the story behind our hospital, from its humble beginnings to
            becoming a beacon of hope in the community. Learn about our
            commitment to compassionate care, cutting-edge technology, and
            medical excellence. Discover the passionate individuals who drive
            our mission forward every day. Join us as we continue to redefine
            healthcare, one patient at a time. Welcome to a place where healing
            meets humanity, where every story matters.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
            Embark on a journey through the heart of healthcare innovation.
            Explore the story behind our hospital, from its humble beginnings to
            becoming a beacon of hope in the community. Learn about our
            commitment to compassionate care, cutting-edge technology, and
            medical excellence. Discover the passionate individuals who drive
            our mission forward every day. Join us as we continue to redefine
            healthcare, one patient at a time. Welcome to a place where healing
            meets humanity, where every story matters.
          </p>

          <p>Coding is fun!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
