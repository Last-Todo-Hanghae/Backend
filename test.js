const getTodo = async () => {
	const accessToken = localStorage.getItem("accessToken")
	const refreshToken = localStorage.getItem("refreshToken")
	// console.log(accessToken, refreshToken)
	
	const { todos } = await axios.get("/api/mytodo", {
			baseURL: process.env.REACT_APP_SERVER_URL,
			headers: {
					withCredentials: true,
					"Content-Type": `application/json`,
					cookies : {
						accessToken: `Bearer ${accessToken}`,
						refreshToken: `Bearer ${refreshToken}`
					}
			}
	})

	return todos
}