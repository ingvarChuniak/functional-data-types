class Functor {
  #value;

  constructor(value) {
    this.#value = value;
  }

  map(fn) {
    return Functor.of(fn(this.#value));
  }
}

const functor = value => ({
  map: fn => functor(fn(value)),
});

module.exports = {
  Functor,
  functor,
};
