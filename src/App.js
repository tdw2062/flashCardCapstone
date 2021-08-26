import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "./Layout/Routes";
import { readDeck, listDecks } from "./utils/api/index.js";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  const [deckList, setDeckList] = useState([]);

  //Grab all cards from the JSON data to use as props to send to Layout Component
  useEffect(() => {
    setDeckList([]);
    const abortController = new AbortController();

    //Use listDecks() api call to get all decks and abort if there is an error
    async function getDecks() {
      try {
        const response = await listDecks();
        setDeckList(response);
      } catch (error) {
        if (error.name === "AbortError") {
          //Ignore 'AbortError'
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getDecks();

    return () => {
      console.log("cleanup");
      document.title = "";
      abortController.abort();
    };
  }, []);

  //Set Layout as the homepage (which will go to DeckList)
  return (
    <div>
      <div className="app-routes">
        <Switch>
          <Route path="/">
            <Routes decks={deckList} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
