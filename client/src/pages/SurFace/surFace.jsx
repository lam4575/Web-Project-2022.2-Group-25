import React, { Component, useEffect, useState } from "react";
import "./surFace.css";
import Header from "../../components/layout/Header/header";
import BoardContentScreen from "../../components/boardcanvas/BoardContent/BoardContent";


const SurFaceScreen = () => {
  return (
    <div className="surface">
      <Header />
      <div className="surface_main">
        <BoardContentScreen/>
      </div>
    </div>
  );
};

export default SurFaceScreen;
