import { getToken } from "./tokens";

export const getMyGoogleFit = async () => {
	try {
		const token = await getToken();
		console.log(
			"fitnessApi.js 49 | getting steps data with token",
			token
		);
		const dataTypeName = 'com.google.step_count.delta';
		const dataSourceId = 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps';
		const query = {
			aggregateBy: [{ dataTypeName, dataSourceId }],
			bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
			startTimeMillis: Date.now() - (6 * 24 * 60 * 60 * 1000),
			endTimeMillis: Date.now()
		};
		const endpoint = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(query)
		});

		const data = await response.json();
		console.log("fitnessApi.js 24 | got steps data", data);

		return data;
	} catch (error) {
		console.log("fitnessApi.js 35 | error getting steps data", error);
		return error.message;
	}
};