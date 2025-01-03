import { heros } from "../data/heroes";

export const findHeroById = (id: number) => {
  return heros.find((hero) => hero.id === id);
};
