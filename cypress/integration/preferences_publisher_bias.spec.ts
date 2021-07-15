import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";

describe("Preferences on publisher bias", () => {
  before(() => {
    const sqlStatements = createMultipleGameData([
      { id: 1, releaseKey: "test_1", title: "Lots of time with publisher", publishers: ["Played publisher"], gameMinutes: 60 * 1000000 },
      { id: 2, releaseKey: "test_2", title: "No time, but popular publisher", publishers: ["Played publisher"], gameMinutes: 0 },
      { id: 3, releaseKey: "test_3", title: "Different Game", summary: "Different game (different publisher).", publishers: ["Unplayed publisher"], gameMinutes: 0 },
      { id: 4, releaseKey: "test_4", title: "Different Game", summary: "Different game (no publisher).", publishers: [], gameMinutes: 0 },
    ]);
    writeDbFile("preferences_publisher_bias.db", sqlStatements);
  });

  beforeEach(() => {
    openDbFile("preferences_publisher_bias.db");
    cy.findByTitle("Preferences").click();
    cy.findByRole("radio", { name: "Ignore publisher" }).click();
  });

  it("should bias for games with played publisher", () => {
    cy.findByRole("radio", { name: "Same publisher" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Played publisher").should("exist");
  });

  it("should bias for games with unplayed publisher", () => {
    cy.findByRole("radio", { name: "Different publisher" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Different Game").should("exist");
  });
});
