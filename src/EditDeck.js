import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateDeck, readDeck } from "./utils/api/index.js";

//The EditDeck component allows the user to edit the name or description of a given deck
export const EditDeck = ({}) => {
  //Create name and description state variables as well as functions to handle changes to these variables
  const [name, setName] = useState("");
  const handleNameChange = (event) => setName(event.target.value);

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  //Get DeckId from url
  const { deckId } = useParams();

  //Make an API Call to get the deck and the cards based on the deckID
  useEffect(() => {
    async function getDeck(deckId) {
      const response = await readDeck(deckId);
      setName(response.name);
      setDescription(response.description);
    }
    getDeck(deckId);
  }, [deckId]);

  //Create the handleSubmit function to update the deck
  //This function creates a deck based on the user input and then uses updateDeck() api call
  const handleSubmit = (event) => {
    event.preventDefault();
    let deck = {};
    deck.name = name;
    deck.description = description;
    deck.id = deckId;
    console.log(deck);

    async function changeDeck(deck) {
      const response = await updateDeck(deck);
      console.log(response);
    }
    changeDeck(deck);

    setName("");
    setDescription("");

    document.location.href = "/";
  };

  //Create the handleCancel function to return the user to the deck page
  const handleCancel = (event) => {
    document.location.href = `/decks/${deckId}`;
  };

  //Return the form the enter deck name and description
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
            Edit Deck
          </li>
        </ol>
      </nav>

      <h3>Edit Deck</h3>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="name">Name </label>
          <input
            placeholder="Deck Name"
            id="name"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        <div class="form-group">
          <label for="back">Description </label>
          <textarea
            type="textarea"
            rows="3"
            placeholder="Brief description of the deck"
            id="description"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>
        <button class="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>{" "}
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditDeck;
