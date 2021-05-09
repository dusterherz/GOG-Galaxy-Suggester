import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";
import { maxGameMinutes } from "../../src/types/preferences";
import { SliderClicker } from "../../test_utils/sliderClicker";

describe("Preferences on game time", () => {
  before(() => {
    const sqlStatements = createMultipleGameData([
      { title: "Unplayed Game", gameMinutes: 0, },
      { title: "Barely Played Game", gameMinutes: 10, },
      { title: "Game With Lots of Playtime", gameMinutes: maxGameMinutes, },
    ]);
    writeDbFile("preferences_gametime.db", sqlStatements);
  });

  beforeEach(() => {
    openDbFile("preferences_gametime.db");
    cy.findByTitle("Preferences").click();
    cy.findByLabelText("Played games").uncheck();
    cy.findByLabelText("Unplayed games").uncheck();
  });

  it("should filter for unplayed games", () => {
    cy.findByLabelText("Unplayed games").check();

    cy.findByTitle("Next Game").click();
    cy.findByText("Unplayed Game").should("exist");
  });

  it("should filter for barely played games", () => {
    cy.findByLabelText("Played games").check();
    cy.findByTestId('gameMinutesRange').then(($slider) =>
      SliderClicker.change($slider[0], maxGameMinutes - (maxGameMinutes / 4), 0, maxGameMinutes)
    );

    cy.findByTitle("Next Game").click();
    cy.findByText("Barely Played Game").should("exist");
  });

  it("should filter for barely played games with numberic filter", () => {
    cy.findByLabelText("Played games").check();
    cy.findByTestId('maxMinutes').clear().type((maxGameMinutes - (maxGameMinutes / 4)).toString());

    cy.findByTitle("Next Game").click();
    cy.findByText("Barely Played Game").should("exist");
  });

  it("should filter for games with lots of playtime", () => {
    cy.findByLabelText("Played games").check();
    cy.findByTestId('gameMinutesRange').then(($slider) =>
      SliderClicker.change($slider[0], maxGameMinutes / 4, 0, maxGameMinutes)
    );

    cy.findByTitle("Next Game").click();
    cy.findByText("Game With Lots of Playtime").should("exist");
  });

  it("should filter for games with lots of playtime with numeric filter", () => {
    cy.findByLabelText("Played games").check();
    cy.findByTestId('minMinutes').clear().type((maxGameMinutes / 4).toString());

    cy.findByTitle("Next Game").click();
    cy.findByText("Game With Lots of Playtime").should("exist");
  });
});
