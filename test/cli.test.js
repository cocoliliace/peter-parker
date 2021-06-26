const fs = require("fs");
const cli = require("../bin/index.js");
const { outputDirectory, executablePath } = require("../config.json");
const testFile = fs.readFileSync("./test/files/[Mameojitan] Knospenmädchen.pdf");

const log = console.log;
beforeEach(() => console.log = jest.fn());
afterAll(() => console.log = log);

test("no sauce given", async () => {
	await cli([null, null]);
	expect(console.log).toHaveBeenCalledWith("No sauce given!");
});

test("invalid input", async () => {
	await cli([null, null, "abc"]);
	expect(console.log).toHaveBeenCalledWith("Invalid input");
});

test("config path", () => {
	cli([null, null, "config"]);
	expect(console.log).toHaveBeenCalledWith(__dirname.split("/").slice(0, -1).join("/"));
});

test("invalid key", () => {
	const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
	cli([null, null, "config", "d"]);
	expect(console.log).toHaveBeenCalledWith("Invalid key");
	expect(mockExit).toHaveBeenCalledWith(1);
});

test("output directory", () => {
	cli([null, null, "config", "--outputDirectory"]);
	expect(console.log).toHaveBeenCalledWith(outputDirectory);
});

test("output directory alias", () => {
	cli([null, null, "config", "-o"]);
	expect(console.log).toHaveBeenCalledWith(outputDirectory);
});

test("change output directory", async () => {
	await cli([null, null, "config", "-o=abcd"]);
	cli([null, null, "config", "-o"]);
	expect(console.log).toHaveBeenCalledWith("abcd");
	await cli([null, null, "config", `-o=${ outputDirectory }`]);
});

test("directory doesn't exist", async () => {
	await cli([null, null, "config", "-o=abcd"]);
	await cli([null, null, "290487"]);
	expect(console.log).toHaveBeenCalledWith("The output directory doesn't exist");
	await cli([null, null, "config", `-o=${ outputDirectory }`]);
});

test("executable path", () => {
	cli([null, null, "config", "--executablePath"]);
	expect(console.log).toHaveBeenCalledWith(executablePath);
});

test("executable path alias", () => {
	cli([null, null, "config", "-e"]);
	expect(console.log).toHaveBeenCalledWith(executablePath);
});

test("change executable path", async () => {
	await cli([null, null, "config", "-e=abcd"]);
	cli([null, null, "config", "-e"]);
	expect(console.log).toHaveBeenCalledWith("abcd");
	await cli([null, null, "config", `-e=${ executablePath }`]);
});

test("download in temp", async () => {
	await cli([null, null, "config", `-o=${ process.cwd() }/temp`]);
	await cli([null, null, "290487"]);
	const outputRegex = new RegExp(`Saved "${ process.cwd() }/temp/\\[Mameojitan\\] Knospenmädchen\\.pdf" in \\d+s!`);
	expect(console.log.mock.calls[0][0]).toMatch(outputRegex);
	fs.readFileSync(`${ process.cwd() }/temp/[Mameojitan] Knospenmädchen.pdf`).equals(testFile);
	fs.unlink(`${ process.cwd() }/temp/[Mameojitan] Knospenmädchen.pdf`, error => {
		if (error) throw error;
	});
});

test("download here", async () => {
	await cli([null, null, "config", "-o="]);
	await cli([null, null, "290487"]);
	const outputRegex = new RegExp(`Saved "${ process.cwd() }/\\[Mameojitan\\] Knospenmädchen\\.pdf" in \\d+s!`);
	expect(console.log.mock.calls[0][0]).toMatch(outputRegex);
	fs.readFileSync(`${ process.cwd() }/[Mameojitan] Knospenmädchen.pdf`).equals(testFile);
	fs.unlink(`${ process.cwd() }/[Mameojitan] Knospenmädchen.pdf`, error => {
		if (error) throw error;
	});
	await cli([null, null, "config", `-o=${ outputDirectory }`]);
});
