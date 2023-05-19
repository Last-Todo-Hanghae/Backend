module.exports = async (req, res, next) => {
	try {
		const currentDate = new Date().toLocaleString("ko-KR");
		const method = req.method;
		const url = req.originalUrl;
		console.log(`[${currentDate}] ${method} ${url}`);
		next();
	} catch (err) {
		console.error(err);
	}
};