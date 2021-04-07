import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.unsplash.com',
	headers: {
		Authorization: 'Client-ID i9M272JlCCpggTaV2wyWmUGG_U0AoBUQYJ9oBWlOHaU'
	}
});