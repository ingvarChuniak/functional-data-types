const { composeAsync } = require("../monoid");

describe("Async Compose", () => {
  const promiseFirst = number => Promise.resolve(number);
  const promiseSecond = number => Promise.resolve(number).then(value => value + 2);
  const promiseThird = number => Promise.resolve(number).then(value => value + 2);

  it("Should be able to compine two promises - Magma", async () => {
    const composed = composeAsync(promiseFirst, promiseSecond);
    const result = await composed(1);
    expect(result).toBe(3);
  });

  it("Should be associative", async () => {
    const composedFirst = await composeAsync(composeAsync(promiseFirst, promiseSecond), promiseThird)(1);
    const composedSecond = await composeAsync(promiseFirst, composeAsync(promiseSecond, promiseThird))(1);
    expect(composedFirst).toEqual(composedSecond);
  });

  it("Sould work with neutral element", async () => {
    const promiseNeutral = () => Promise.resolve(0);
    expect(await composeAsync(promiseFirst, promiseNeutral)(1)).toEqual(
      await composeAsync(promiseNeutral, promiseFirst)(1)
    );
  });
});
