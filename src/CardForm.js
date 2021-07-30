import React, { useEffect, useState } from "react";

//The CardForm component displays the form where the user can edit/add a card
export const CardForm = ({
  handleSubmit,
  handleFrontChange,
  front,
  handleBackChange,
  back,
  handleDone,
}) => {
  //Return a message saying there are not enough cards in the deck along with a button
  //that enables the user to add cards if they choose
  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="front">Front </label>
        <textarea
          type="textarea"
          rows="3"
          id="front"
          name="front"
          onChange={handleFrontChange}
          value={front}
        />
      </div>
      <div class="form-group">
        <label for="back">Back </label>
        <textarea
          type="textarea"
          rows="3"
          id="back"
          name="back"
          onChange={handleBackChange}
          value={back}
        />
      </div>
      <button class="btn btn-secondary" onClick={handleDone}>
        Done
      </button>{" "}
      <button class="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CardForm;
