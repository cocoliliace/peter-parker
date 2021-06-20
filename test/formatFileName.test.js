const formatFileName = require("../scripts/formatFileName.js");

test("no change", () => {
	expect(formatFileName("[Ching Chang] peter-parker")).toBe("[Ching Chang] peter-parker");
});
