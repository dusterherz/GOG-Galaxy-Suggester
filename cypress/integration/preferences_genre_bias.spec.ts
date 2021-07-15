import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";

describe("Preferences on genre bias", () => {
  before(() => {
    const sqlStatements = createMultipleGameData([
      { id: 1, releaseKey: "test_1", title: "Lots of time with genre", genres: ["Played genre"], gameMinutes: 60 * 1000000 },
      { id: 2, releaseKey: "test_2", title: "No time, but popular genre", genres: ["Played genre"], gameMinutes: 0 },
      { id: 3, releaseKey: "test_3", title: "Different Game", summary: "Different game (different genre).", genres: ["Unplayed genre"], gameMinutes: 0 },
      { id: 4, releaseKey: "test_4", title: "Different Game", summary: "Different game (no genre).", genres: [], gameMinutes: 0 },
    ]);
    writeDbFile("preferences_genre_bias.db", sqlStatements);
  });

  beforeEach(() => {
    openDbFile("preferences_genre_bias.db");
    cy.findByTitle("Preferences").click();
    cy.findByRole("radio", { name: "Ignore genre" }).click();
  });

  it("should bias for games with played genre", () => {
    cy.findByRole("radio", { name: "Same genre" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Played genre").should("exist");
  });

  it("should bias for games with unplayed genre", () => {
    cy.findByRole("radio", { name: "Different genre" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Different Game").should("exist");
  });
});
