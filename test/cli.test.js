const fs = require("fs");
const { outputDirectory, executablePath } = require("../config.json");
const cli = require("../bin/cli.js");

const log = console.log;
beforeEach(() => console.log = jest.fn());
afterAll(() => console.log = log);

test("no sauce given", async () => {
	await cli(["node", "file"]);
	expect(console.log).toHaveBeenCalledWith("No sauce given!");
});

test("invalid input", async () => {
	await cli(["node", "file", "abc"]);
	expect(console.log).toHaveBeenCalledWith("Invalid input");
});

test("config path", () => {
	cli(["node", "file", "config"]);
	expect(console.log).toHaveBeenCalledWith(__dirname.split("/").slice(0, -1).join("/"));
});

test("invalid key", () => {
	const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
	cli(["node", "file", "config", "d"]);
	expect(console.log).toHaveBeenCalledWith("Invalid key");
	expect(mockExit).toHaveBeenCalledWith(1);
});

test("output directory", () => {
	cli(["node", "file", "config", "--outputDirectory"]);
	expect(console.log).toHaveBeenCalledWith(outputDirectory);
});

test("output directory alias", () => {
	cli(["node", "file", "config", "-o"]);
	expect(console.log).toHaveBeenCalledWith(outputDirectory);
});

test("change output directory", async () => {
	await cli(["node", "file", "config", "-o=abcd"]);
	cli(["node", "file", "config", "-o"]);
	expect(console.log).toHaveBeenCalledWith("abcd");
	await cli(["node", "file", "config", `-o=${ outputDirectory }`]);
});

test("directory doesn't exist", async () => {
	await cli(["node", "file", "config", "-o=abcd"]);
	await cli(["node", "file", "290487"]);
	expect(console.log).toHaveBeenCalledWith("The output directory doesn't exist");
	await cli(["node", "file", "config", `-o=${ outputDirectory }`]);
});

test("executable path", () => {
	cli(["node", "file", "config", "--executablePath"]);
	expect(console.log).toHaveBeenCalledWith(executablePath);
});

test("executable path alias", () => {
	cli(["node", "file", "config", "-e"]);
	expect(console.log).toHaveBeenCalledWith(executablePath);
});

test("change executable path", async () => {
	await cli(["node", "file", "config", "-e=abcd"]);
	cli(["node", "file", "config", "-e"]);
	expect(console.log).toHaveBeenCalledWith("abcd");
	await cli(["node", "file", "config", `-e=${ executablePath }`]);
});

test("download", async () => {
	await cli(["node", "file", "290487"]);
	const outputRegex = new RegExp(`Saved "${ outputDirectory }/\\[Mameojitan\\] Knospenmädchen\\.pdf" in \\d+s!`);
	expect(console.log.mock.calls[0][0]).toMatch(outputRegex);
	fs.readFileSync(`${ outputDirectory }/[Mameojitan] Knospenmädchen.pdf`).equals(fs.readFileSync("./test/files/[Mameojitan] Knospenmädchen.pdf"));
	fs.unlink(`${ outputDirectory }/[Mameojitan] Knospenmädchen.pdf`, error => {
		if (error) throw error;
	});
});
