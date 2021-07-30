import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "./utils/api/index.js";
import CardForm from "./CardForm.js";

//The AddCard component is used to add a new card to a given deck
export const AddCard = ({}) => {
  //Create state variables for the front and back values of a card and add event handlers
  const [front, setFront] = useState("");
  const handleFrontChange = (event) => setFront(event.target.value);

  const [back, setBack] = useState("");
  const handleBackChange = (event) => setBack(event.target.value);

  const [deckView, setDeckView] = useState({});

  //Get DeckId from url
  const { deckId } = useParams();

  //Make an API Call to get the deck and the cards based on the deckID
  useEffect(() => {
    async function getDeck(deckId) {
      const response = await readDeck(deckId);
      setDeckView(response);
      console.log(deckView.name);
    }
    getDeck(deckId);
  }, [deckId]);

  //Create a handleSubmit function to handle submission of a new card (create new card)
  const handleSubmit = (event) => {
    event.preventDefault();
    let card = {};
    card.front = front;
    card.back = back;

    async function newCard(deckId, card) {
      const response = await createCard(deckId, card);
    }
    newCard(deckId, card);

    setFront("");
    setBack("");
  };

  //Create a handleDone function to return the user to the deck page if they are done adding cards
  const handleDone = (event) => {
    event.preventDefault();
    document.location.href = `/decks/${deckId}`;
  };

  //Return the form to add the card
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
            Add Card
          </li>
        </ol>
      </nav>

      {/*Form to add the card*/}
      <h3>Add Card</h3>
      <CardForm
        front={front}
        back={back}
        handleSubmit={handleSubmit}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        handleDone={handleDone}
      />
    </div>
  );
};

export default AddCard;
