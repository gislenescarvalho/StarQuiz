import React, { Component } from "react";

class Cards extends Component {
  render() {
    return (
      <article class="bg-white br3 center mw5 ba b--black-10 mv4">
        <img
          src="http://tachyons.io/img/cat-720.jpg"
          class="w-100 db"
          alt="Closeup photo of a tabby cat yawning."
        />
        <div class="pa3">
          <a href="#" class="link dim lh-title">
            15 things every cat owner should know
          </a>
          <small class="gray db pv2">
            AMP - <time>6 hours ago</time>
          </small>
        </div>
      </article>
    );
  }
}

export default Cards;
