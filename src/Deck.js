import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "./utils/api/index.js";

//The Deck component is used to display a given deck along with the cards associated with that deck
export const Deck = () => {
  //Create deckView and cardView variables which essentially are just variables for the deck and cards, respectively
  const [deckView, setDeckView] = useState({});
  const [cardView, setCardView] = useState([]);

  //Use the params to get the deckID so that you can read the deck with readDeck()
  const { deckId } = useParams();

  //Make an API Call to get the deck and the cards based on the deckID
  //Use the readDeck() function
  useEffect(() => {
    setDeckView({});
    const abortController = new AbortController();

    async function getDeck(deckId) {
      try {
        if (!deckId) return;
        const response = await readDeck(deckId);
        //Set the state variables for the deck and cards
        setDeckView(response);
        setCardView(response.cards);
      } catch (error) {
        if (error.name === "AbortError") {
          //Ignore 'AbortError'
        } else {
          throw error;
        }
      }
    }
    getDeck(deckId);

    return () => {
      console.log("cleanup", deckId);
      document.title = "";
      abortController.abort();
    };
  }, [deckId]);

  console.log("deck", deckView);

  //Create function to handle the delete deck button
  function sendAlertDeck(deckId) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      // Make an API Call to delete this deck
      async function destroyDeck(id) {
        const response = await deleteDeck(id);

        //Return home after the deletion
        document.location.href = "/";
      }
      destroyDeck(deckId);
    } else {
    }
  }

  //Create function to handle the delete card button
  function sendAlertCard(cardId) {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      // Make an API Call to delete this card
      async function destroyCard(id) {
        const response = await deleteCard(id);

        //Reload the webpage after the deletion
        window.location.reload();
      }
      destroyCard(cardId);
    } else {
    }
  }

  //Make list of cards to be displayed using Array.map (using card from Bootstrap)
  //This function will display the cards as list items for given deck
  const cardLinks = cardView.map((card) => (
    <li key={card.id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{card.id}</h5>
          <p className="card-text">
            <table>
              <tr>
                <td>{card.front}</td>
                <td>{card.back}</td>
              </tr>
            </table>
          </p>
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button className="btn btn-primary">Edit</button>
          </Link>{" "}
          <button
            className="btn btn-primary"
            onClick={() => sendAlertCard(card.id)}
          >
            {" "}
            Delete
          </button>
        </div>
      </div>
    </li>
  ));

  //Return the deck info (name/description) as well as the list of cards
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deckView.name}
          </li>
        </ol>
      </nav>

      {/*Return deck info as well as buttons to modify the deck*/}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deckView.name}</h5>
          <p className="card-text">{deckView.description}</p>
          <Link to={`/decks/${deckId}/edit`}>
            <button className="btn btn-primary">Edit</button>
          </Link>{" "}
          <Link to={`/decks/${deckId}/study`}>
            <button className="btn btn-primary">Study</button>
          </Link>{" "}
          <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary">Add Cards</button>
          </Link>{" "}
          <button
            className="btn btn-primary"
            onClick={() => sendAlertDeck(deckId)}
          >
            Delete
          </button>
        </div>
      </div>

      {/*Return the list of cards below the deck info*/}
      <ul>{cardLinks}</ul>
    </div>
  );
};

export default Deck;
