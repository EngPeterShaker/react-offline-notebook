import checkLevDistance from "../utils/checkLevDistance.ts";
describe("Lev Distance", () => {
	test("it should check Lev Distance", () => {
		// actual test
		const textValue = "Word Words Wor word";
		const refWord = "Word";
		const expectedOutput = ["Words", "Wor", "word"];
		const mapped = textValue.split(" ").map((str) => {
			return checkLevDistance(refWord, str);
		});
		expect(mapped.filter(Boolean)).toEqual(expectedOutput);
	});

	test("it should check Lev Distance refWord to be string", () => {
		// actual test
		const textValue = "Word Words Wor word";
		const refWord = 2;
		const expectedOutput = [];
		const mapped = textValue.split(" ").map((str) => {
			return checkLevDistance(refWord, str);
		});
		expect(mapped.filter(Boolean)).toEqual(expectedOutput);
	});

	test("it should check Lev Distance text to be string", () => {
		// actual test
		const textValue = 10;
		const refWord = "Word";
		const expectedOutput2 = [];
		const mapped =
			typeof textValue === "string"
				? textValue.split(" ").map((str) => {
						return checkLevDistance(refWord, str);
				  })
				: [""];
		expect(mapped.filter(Boolean)).toEqual(expectedOutput2);
	});
});
