import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";

describe("Preferences on game time", () => {
  before(() => {
    const sqlStatements = createMultipleGameData([
      { title: "Unplayed Game", gameMinutes: 0, },
      { title: "Played Game", gameMinutes: 10, },
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

  it("should filter for played games", () => {
    cy.findByLabelText("Played games").check();

    cy.findByTitle("Next Game").click();
    cy.findByText("Played Game").should("exist");
  });
});
