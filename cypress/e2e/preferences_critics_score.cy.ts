import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";
import { SliderClicker } from "../../test_utils/sliderClicker";

describe("Preferences on critics score", () => {
  before(() => {
    const sqlStatements = createMultipleGameData([
      { title: "No Critics Score Game", criticsScore: null, },
      { id: 2, releaseKey: "test_2", title: "Super Good Game", criticsScore: 100, },
      { id: 3, releaseKey: "test_3", title: "Bad Game", criticsScore: 0 },
    ]);
    writeDbFile("preferences_criticsscore.db", sqlStatements);
  });

  beforeEach(() => {
    openDbFile("preferences_criticsscore.db");
    cy.findByTitle("Preferences").click();
    cy.findByLabelText("No critics score").uncheck();
    cy.findByLabelText("Critics score").uncheck();
  });

  it("should filter for games without critics score", () => {
    cy.findByLabelText("No critics score").check();

    cy.findByTitle("Next Game").click();
    cy.findByText("No Critics Score Game").should("exist");
  });

  it("should filter for games with critics score", () => {
    cy.findByLabelText("Critics score").check();

    cy.findByTitle("Next Game").click();
    cy.findByText(/^(Super Good Game|Bad Game)$/).should("exist");
  });

  it("should filter for games with critics score above 25", () => {
    cy.findByLabelText("Critics score").check();
    cy.findByTestId("criticsScoreRange").then(($slider) =>
      SliderClicker.change($slider[0], 25)
    );

    cy.findByTitle("Next Game").click();
    cy.findByText("Super Good Game").should("exist");
  });

  it("should filter for games with critics score below 75", () => {
    cy.findByLabelText("Critics score").check();
    cy.findByTestId("criticsScoreRange").then(($slider) =>
      SliderClicker.change($slider[0], 75)
    );

    cy.findByTitle("Next Game").click();
    cy.findByText("Bad Game").should("exist");
  });
});
