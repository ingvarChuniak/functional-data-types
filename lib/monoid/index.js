const composeAsync = (funcOne, funcTwo) => async value => funcOne(await funcTwo(value));

module.exports = { composeAsync };
