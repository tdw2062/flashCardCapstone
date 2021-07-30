import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateCard, readDeck } from "./utils/api/index.js";
import CardForm from "./CardForm.js";

//The EditCard component allows you to edit card (change front or back)
export const EditCard = ({}) => {
  //Create state variables for the front and back value of the card
  const [front, setFront] = useState("");
  const handleFrontChange = (event) => setFront(event.target.value);

  const [back, setBack] = useState("");
  const handleBackChange = (event) => setBack(event.target.value);

  const [name, setName] = useState("");

  //Get DeckId from url
  const { deckId, cardId } = useParams();

  //Make an API Call to get the deck and the cards based on the deckID
  useEffect(() => {
    async function getDeck(deckId) {
      const response = await readDeck(deckId);
      let cardArray = response.cards;
      let chosenCard = cardArray.find((card) => card.id == cardId);
      setFront(chosenCard.front);
      setBack(chosenCard.back);
      setName(response.name);
    }
    getDeck(deckId);
  }, [deckId]);

  //Create handleSubmit function to update the card based on the front band back given in the form
  //This function will capture the values entered and run the updateCard() api call
  const handleSubmit = (event) => {
    event.preventDefault();
    let card = {};
    card.front = front;
    card.back = back;
    card.deckId = Number(deckId);
    card.id = Number(cardId);

    async function cardEdit(card) {
      const response = await updateCard(card);
    }
    cardEdit(card);

    setFront("");
    setBack("");

    document.location.href = `/decks/${deckId}`;
  };

  //Create the handleDone function to return to the deck location if the user clicks "Done"
  const handleDone = (event) => {
    document.location.href = `/decks/${deckId}`;
  };

  //Return the form that a user can use to update the card
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{name}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h3>Edit Card</h3>
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

export default EditCard;
