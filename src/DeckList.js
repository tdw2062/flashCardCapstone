import React from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";

import "./style.css";
import { deleteDeck } from "./utils/api/index.js";

//The DeckList component returns a list of decks on the homepage
//Decks is passed as a prop
export const DeckList = ({ decks }) => {
  //Create function to handle the delete deck button
  function sendAlert(deckId) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      // Make an API Call to delete this deck
      async function destroyDeck(id) {
        const response = await deleteDeck(id);
        console.log(response);
        console.log(deckId);
        //Reload the webpage after the deletion
        window.location.reload();
      }
      destroyDeck(deckId);
    } else {
    }
  }

  //Make list of decks to be displayed using the decks prop
  const deckLinks = decks.map((deck) => (
    <li key={deck.id}>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <table>
              <tr>
                <td>{deck.name}</td>
                <td>{deck.cards.length} cards</td>
              </tr>
            </table>
          </h5>
          <p class="card-text">{deck.description}</p>
          <Link to={`/decks/${deck.id}`}>
            <button class="btn btn-primary">View</button>
          </Link>{" "}
          <Link to={`/decks/${deck.id}/study`}>
            <button class="btn btn-primary">Study</button>
          </Link>{" "}
          <button class="btn btn-primary" onClick={() => sendAlert(deck.id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  ));

  //Return the list of decks
  return (
    <div>
      <Link to={`/decks/new`}>
        <button class="btn btn-primary">Create Deck</button>
      </Link>

      <ul>{deckLinks}</ul>
    </div>
  );
};

export default DeckList;
