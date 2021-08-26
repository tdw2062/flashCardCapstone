import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "../Deck.js";
import DeckList from "../DeckList.js";
import Study from "../Study.js";
import AddCard from "../AddCard.js";
import CreateDeck from "../CreateDeck";
import EditDeck from "../EditDeck";
import EditCard from "../EditCard";

function Layout({ decks }) {
  return (
    <div>
      <Header />
      <div className="container">
        {/*Create routes for the website*/}
        <Switch>
          <Route exact={true} path="/">
            <DeckList decks={decks} />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
