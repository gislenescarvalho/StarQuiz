import React, { Component } from "react";
import Card from "../Cards/Cards";

export default class Grid extends Component {
  render() {
    return (
      <article>
        <div class="cf pa2">
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
          <div class="fl w-50 w-25-m w-20-l pa2">
            <Card />
          </div>
        </div>
      </article>
    );
  }
}
