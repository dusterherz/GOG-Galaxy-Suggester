import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";

describe("Preferences on developer bias", () => {
  before(() => {
    const sqlStatements = createMultipleGameData([
      { id: 1, releaseKey: "test_1", title: "Lots of time with developer", developers: ["Played developer"], gameMinutes: 60 * 1000000 },
      { id: 2, releaseKey: "test_2", title: "No time, but popular developer", developers: ["Played developer"], gameMinutes: 0 },
      { id: 3, releaseKey: "test_3", title: "Different Game", summary: "Different game (different developer).", developers: ["Unplayed developer"], gameMinutes: 0 },
      { id: 4, releaseKey: "test_4", title: "Different Game", summary: "Different game (no developer).", developers: [], gameMinutes: 0 },
    ]);
    writeDbFile("preferences_developer_bias.db", sqlStatements);
  });

  beforeEach(() => {
    openDbFile("preferences_developer_bias.db");
    cy.findByTitle("Preferences").click();
    cy.findByRole("radio", { name: "Ignore developer" }).click();
  });

  it("should bias for games with played developer", () => {
    cy.findByRole("radio", { name: "Similar developer" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Played developer").should("exist");
  });

  it("should bias for games with unplayed developer", () => {
    cy.findByRole("radio", { name: "Different developer" }).click();

    cy.findByRole("button", { name: "Next Game" }).click();
    cy.findByText("Different Game").should("exist");
  });
});
