import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "./utils/api/index.js";
import NotEnoughCards from "./NotEnoughCards.js";

//The Study component allows the user to go through the flashcards for a given deck
export const Study = () => {
  //Create deckView and cardView states which essentially represent the deck and cards
  const [deckView, setDeckView] = useState({});
  const [cardView, setCardView] = useState([]);
  //Create variables to manage the view of the cards, index, sideUp, and length
  const [index, setIndex] = useState(0);
  const [sideUp, setSideUp] = useState("front");
  const [length, setLength] = useState(0);

  //Use the params to get the deckID
  const { deckId } = useParams();
  console.log(deckId);

  //Make an API Call to get the deck and the cards based on the deckID
  useEffect(() => {
    setDeckView({});
    const abortController = new AbortController();

    async function getDeck(deckId) {
      try {
        if (!deckId) return;
        const response = await readDeck(deckId);
        //Set the deck and cards based on the api call
        setDeckView(response);
        setCardView(response.cards);
        setLength(response.cards.length);
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

  //If there are less than 3 cards, return 'not enough cards' (NotEnoughCards component)
  if (length < 3) {
    return (
      <div>
        <NotEnoughCards deckId={deckId} deckView={deckView} length={length} />
      </div>
    );
  }

  //If the flip button is pushed then flip card
  function handleFlip() {
    console.log(sideUp);
    if (sideUp === "front") {
      setSideUp("back");
    } else {
      setSideUp("front");
    }
  }

  //If the next button is pushed then go to next card, if on last card, give alert
  function handleNext() {
    setIndex((current) => current + 1);
    setSideUp("front");

    if (index > cardView.length - 2) {
      sendAlert();
    }
  }

  //If they click ok then restart deck, if they click cancel, take to homepage
  function sendAlert() {
    if (window.confirm("Do you want to restart this deck?")) {
      setIndex(0);
      setSideUp("front");
    } else {
      document.location.href = "/";
    }
  }

  //Return the card starting front side up, also include buttons to flip and move to next card
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

      <h2>Study: {deckView.name}</h2>
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            Card {index + 1} of {cardView.length}
          </div>
          {/*Show one side of card based on sideUp state*/}
          <p class="card-text">
            {sideUp === "front"
              ? deckView.cards[index].front
              : deckView.cards[index].back}
          </p>
          {/*Buttons to handle flip and next*/}
          <button class="btn btn-primary" onClick={handleFlip}>
            Flip
          </button>{" "}
          {sideUp === "back" ? (
            <button class="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Study;
