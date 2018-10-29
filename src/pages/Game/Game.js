import React, { Component } from "react";
import { func } from "prop-types";
import Header from "../../components/Header/Header";
import Card from "../../components/Cards/Cards";
import styles from "./Game.module.css";
import ModalDetails from "../../components/Modal/ModalDetails/ModalDetails";

class Game extends Component {
  state = {
    title: "StarQuiz!",
    sizeLogo: {
      lg: 70,
      md: 50,
      sm: 40
    },
    time: 120000,
    showModalDetails: false
  };
  render() {
    const { sizeLogo, title, time, showModalDetails } = this.state;
    return (
      <div className={`${styles.container} Grid-cell`}>
        <Header sizeLogo={sizeLogo} title={title} time={time} />

        <section>
          <div class="cf pa2">
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
            <div class="fl w-50 w-25-m w-20-l pa2">
              <Card
                showDetails={() => {
                  console.log("estamos aqui");
                }}
                showInput={() => {
                  console.log("estamos aqui");
                }}
              />
            </div>
          </div>
        </section>
        <ModalDetails
          modalIsClosed={showModalDetails}
          modalDetailsIsOpen={showModalDetails}
        />
      </div>
    );
  }
}

export default Game;
