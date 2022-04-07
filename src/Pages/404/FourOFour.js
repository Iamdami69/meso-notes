import React from "react";
import { useNavigate } from "react-router-dom";
import "./FourOFour.css";
export function FourOFour() {
  const navigate = useNavigate();
  return (
    <section className="wrapper Page">
      <div className="container">
        <div id="scene" className="scene">
          <div className="circle"></div>

          <div className="one">
            h{" "}
            <div className="content">
              <span className="piece"></span>
              <span className="piece"></span>
              <span className="piece"></span>
            </div>
          </div>

          <div className="two">
            <div className="content">
              <span className="piece"></span>
              <span className="piece"></span>
              <span className="piece"></span>
            </div>
          </div>

          <div className="three">
            <div className="content">
              <span className="piece"></span>
              <span className="piece"></span>
              <span className="piece"></span>
            </div>
          </div>

          <p className="p404">404</p>
        </div>

        <div className="text">
          <article>
            <p>
              Uh oh! Looks like you got lost. <br />
              Go back to the homepage if you dare!
            </p>
            <button onClick={() => navigate("/")}>i dare!</button>
          </article>
        </div>
      </div>
    </section>
  );
}
