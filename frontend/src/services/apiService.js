const API_URL = 'http://localhost:8080';

export const getTestData = async () => {
	try {
		const response = await fetch(`${API_URL}/api/test`);

		if (!response.ok){
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Erreur lors de la recuperation des donnees de l'API: ", error);
		return { message: `Echec de la connexion a l'API: ${error.message}`};
	}
};


export const getDbStatus = async () => {
	try {
		const response = await fetch(`${API_URL}/api/db-test`);
		if (!response.ok){
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		return { message: `Echec de la connexion a la DB: ${error.message}`};
	}
};