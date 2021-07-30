import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

//The NotEnoughCards component tells the user they must have 3 cards in a deck to study
export const NotEnoughCards = ({ deckId, deckView, length }) => {
  //Return a message saying there are not enough cards in the deck along with a button
  //that enables the user to add cards if they choose
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deckView.name}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {length} cards in this
        deck.{" "}
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button class="btn btn-primary">Add Cards</button>
      </Link>{" "}
    </div>
  );
};

export default NotEnoughCards;
