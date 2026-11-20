import assert from "node:assert/strict";
import { test } from "node:test";
import { retrieve } from "./retrieve.ts";

const top = (q: string) => retrieve(q)[0]?.entry.id;

test("finds the right FAQ entry in German and English", () => {
  assert.equal(top("Was kostet eine Grundreinigung für 70 m²?"), "preis-grundreinigung");
  assert.equal(top("Bringt ihr eigene Putzmittel und Reinigungsmittel mit?"), "reinigungsmittel");
  assert.equal(top("Do you clean windows?"), "fenster");
  assert.equal(top("Can I cancel my appointment?"), "storno");
  assert.equal(top("Kommt ihr auch nach Bremerhaven?"), "einsatzgebiet");
});

test("returns nothing for unrelated questions", () => {
  assert.equal(retrieve("Wer gewinnt die Bundesliga?").length, 0);
});
