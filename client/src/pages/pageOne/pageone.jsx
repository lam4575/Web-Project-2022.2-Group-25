import React from "react";
import "./pageOne.css";

import Header from "../../components/layout/Header/header";

const PageOne = () => {
  const handleClick = (e) => {
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        for (let i = 0; i < items.length; i++) {
          if (items[i].classList.contains("default-chart")) {
            items[i].classList.remove("default-chart");
            itemdetails[i].classList.remove("active");
          }
        }
        items[i].classList.add("default-chart");
        itemdetails[i].classList.add("active");
      });
    }
  };

  const items = document.getElementsByClassName("default");
  const itemdetails = document.getElementsByClassName("default-img");

  return (
    <div className="main">
      <Header className="header-page" />
      <div className="skip-target">
        <section className="ui-section">
          <div className="container">
            <div className="container-content">
              <h3 className="text-content-header">
                Trello brings all your tasks, teammates, and tools together
              </h3>
              <p className="text-content">
                Keep everything in the same place—even if your team isn’t.
              </p>
              <form action="" className="form-skip">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="input-skip-container"
                />
                <button className="button-skip" type="submit">
                  Sign up - It's free!
                </button>
              </form>
            </div>
            <div className="container-content">
              <div className="container-content-img">
                <img
                  src={require("../../assets/img/TrelloUICollage_4x.webp")}
                  alt="ảnh minh họa"
                  className="img-content"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="skip-target-one">
        <div className="ui-section">
          <div className="main-content">
            <h6 className="main-content-header">TRELLO 101</h6>
            <h2>A productivity powerhouse</h2>
            <p>
              Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.
            </p>
          </div>
        </div>
      </div>

      <div className="skip-target-two">
        <section className="ui-section">
          <div className="content-info">
            <div className="content-default">
              <button className="default default-chart" onClick={handleClick}>
                <h6>Boards</h6>
                <p>
                  Trello boards keep tasks organized and work moving forward.
                  In a glance, see everything from “things to do” to “aww yeah, we did it!”
                </p>
              </button>

              <button className="default" onClick={handleClick}>
                <h6>Lists</h6>
                <p>
                  The different stages of a task.
                  Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs.
                  There’s no wrong way to Trello.
                </p>
              </button>

              <button className="default" onClick={handleClick}>
                <h6>Cards</h6>
                <p>
                  Cards represent tasks and ideas and hold all the information to get the job done.
                  As you make progress, move cards across lists to show their status.
                </p>
              </button>
            </div>

            <div className="content-default-img">
              <div className="default-img active">
                <img
                  src={require("../../assets/img/Carousel_Image_Boards_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>

              <div className="default-img">
                <img
                  src={require("../../assets/img/Carousel_Image_Lists_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>

              <div className="default-img ">
                <img
                  src={require("../../assets/img/Carousel_Image_Cards_2x.webp")}
                  alt="Ảnh minh họa"
                  className="img-content"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="skip-target-three">
        <div className="ui-section">
          <div className="content-start">
            <h3>Get started with Trello today</h3>
            <form action="" className="form-skip">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="input-skip-container"
              />
              <button className="button-skip" type="submit">
                Register - Totally free!
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="skip-target-end">
        <div className="ui-section">
          <div className="footer-skip">
            <div className="logo">
              <img src={require("../../assets/img/logo.png")} alt="" />
            </div>

            <div className="text-content">
              <h4 className="text-title">About Us</h4>
              <p>What is behind the board</p>
            </div>

            <div className="text-content">
              <h4 className="text-title">Jobs</h4>
              <p>
                Learn about open roles on our team
              </p>
            </div>

            <div className="text-content">
              <h4 className="text-title">Application</h4>
              <p>
                Download the app for Android and iOS
              </p>
            </div>

            <div className="text-content">
              <h4 className="text-title">Contact</h4>
              <p>Need anything? Get in touch and we can help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOne;
