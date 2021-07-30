import React, { useEffect, useState } from "react";
import { createDeck } from "./utils/api/index.js";

//The CreatDeck component is used to create a new deck to add to the deck list
export const CreateDeck = ({}) => {
  //Create name and description state variables and add event listeners
  const [name, setName] = useState("");
  const handleNameChange = (event) => setName(event.target.value);

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  //Create the handleSubmit function which creates a deck based on the input and
  //makes an api call to add that deck to the database
  const handleSubmit = (event) => {
    event.preventDefault();
    let deck = {};
    let id = "";
    deck.name = name;
    deck.description = description;
    console.log(deck);

    async function newDeck(deck) {
      const response = await createDeck(deck);

      let id = response.id;
      document.location.href = `/decks/${id}`;
    }
    newDeck(deck);
  };

  //Create the handleCancel function to cancel and return to the homepage1
  const handleCancel = (event) => {
    event.preventDefault();
    document.location.href = "/";
  };

  //Return the form to enter the name and description for the new deck
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h3>Create Deck</h3>
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

export default CreateDeck;
