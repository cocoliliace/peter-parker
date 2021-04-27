module.exports = (arg1, arg2) => {
	if (!arg1 || arg1[0] === "-" && !arg2) {
		return [];
	} else if (arg1[0] === "-") {
		return [arg2, arg1];
	} else {
		return [arg1, arg2 || ""];
	}
};