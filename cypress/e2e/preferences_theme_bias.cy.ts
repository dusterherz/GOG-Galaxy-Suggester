import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";

describe("Preferences on theme bias", () => {
  before(() => {
    const sqlStatements = createMultipleGameData([
      { id: 1, releaseKey: "test_1", title: "Lots of time with theme", themes: ["Played theme"], gameMinutes: 60 * 1000000 },
      { id: 2, releaseKey: "test_2", title: "No time, but popular theme", themes: ["Played theme"], gameMinutes: 0 },
      { id: 3, releaseKey: "test_3", title: "Different Game", summary: "Different game (different theme).", themes: ["Unplayed theme"], gameMinutes: 0 },
      { id: 4, releaseKey: "test_4", title: "Different Game", summary: "Different game (no theme).", themes: [], gameMinutes: 0 },
    ]);
    writeDbFile("preferences_theme_bias.db", sqlStatements);
  });

  beforeEach(() => {
    openDbFile("preferences_theme_bias.db");
    cy.findByTitle("Preferences").click();
    cy.findByRole("radio", { name: "Ignore theme" }).click();
  });

  it("should bias for games with played theme", () => {
    cy.findByRole("radio", { name: "Same theme" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Played theme").should("exist");
  });

  it("should bias for games with unplayed theme", () => {
    cy.findByRole("radio", { name: "Different theme" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Different Game").should("exist");
  });
});
