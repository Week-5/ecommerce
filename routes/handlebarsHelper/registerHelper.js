const Handlebars = require("handlebars");

// custom handlebar operator helpers
// pulled from: https://stackoverflow.com/questions/33316562/how-to-compare-a-value-in-handlebars
Handlebars.registerHelper(
  "when",
  function (operand_1, operator, operand_2, options) {
    const operators = {
      eq: function (l, r) {
        return l == r;
      },
      noteq: function (l, r) {
        return l != r;
      },
      gt: function (l, r) {
        return Number(l) > Number(r);
      },
      or: function (l, r) {
        return l || r;
      },
      and: function (l, r) {
        return l && r;
      },
      "%": function (l, r) {
        return l % r === 0;
      },
    };
    const result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
  }
);

Handlebars.registerHelper("for", function (from, to, incr, block) {
  let accum = "";
  for (let i = from; i < to; i += incr) {
    accum += block.fn(i);
  }
  return accum;
});
