import axios from "axios";

export const searchTrack = async (q: string) => {
	try {
		const { data } = await axios.get(
			`https://deezerdevs-deezer.p.rapidapi.com/search?q=${q}`,
			{
				headers: {
					"x-rapidapi-key":
						"301d563991mshcba08c5887bb699p133d49jsn17b3a08f4535",
					"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
				},
			}
		);

		// console.log(JSON.stringify(data.data[0]));
		return data.data;
	} catch (error) {
		console.error("SEARCH TRACKS ERROR", error);
		return [];
	}
};

export const playTrack = async (id: number) => {
	try {
		const { data } = await axios.get(
			`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
			{
				headers: {
					"x-rapidapi-key":
						"9589718cd7msh6de34e28c2baf44p18d1aajsn1e8c93e28629",
					"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
				},
			}
		);

		// console.log(JSON.stringify(data));
		return data;
	} catch (error) {
		console.error("PLAY TRACKS ERROR", error);
		return [];
	}
};
