import Scene, { SceneItem } from "scenejs";

function typing({ property, text, duration, quote = "" }) {
  const item = new SceneItem();
  const length = text.length;

  for (let i = 0; i <= length; ++i) {
    item.set(duration * i / length, property, `${quote}${text.substring(0, i)}${quote}`);
  }
  return item;
}

const characters = {
  f: ["a", "b", "c", "d", "F"],
  r: ["a", "p", "g", "1", "r"],
  o: ["b", "q", "h", "u", "o"],
  n: ["c", "n", "o", "y", "n"],
  t: ["d", "m", "3", "j", "t"],
  dash: ["*", "+", "!", "@", "-"],
  e: ["f", "z", "a", "1", "e"],
  n2: ["g", "x", "7", "v", "n"],
  d: ["h", "c", "6", "b", "d"],
};

export const aboutScene = new Scene({
  ".page.about .description .span1": {
    1: typing({ property: ["attribute", "data-character"], text: "with main focus on", duration: 1 }),
  },
  ".page.about .description .span2": {
    2: typing({ property: ["attribute", "data-character"], text: "Develope and Design.", duration: 1 }),
  },
}, {
  selector: true,
});

Object.keys(characters).forEach((name, index) => {
  const item = aboutScene.newItem(`.page.about h3 .character.${name}`, { selector: true });
  const character = characters[name];

  item.set(index * 0.1, "attribute", "data-character", ``);
  character.forEach((chr, i) => {
    item.set((index + i + 1) * 0.1, "attribute", "data-character", `${chr}`);
  });
});

// aboutScene.play();
