import { getToken } from "./tokens";

export const getMyGoogleFit = async (startTimeMillis, endTimeMillis) => {
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
			startTimeMillis: startTimeMillis,
			endTimeMillis: endTimeMillis
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
		//console.log("fitnessApi.js 24 | got steps data", data); // data.bucket[0].dataset[0].point[0].value[0].intVal

		return data;
	} catch (error) {
		console.log("fitnessApi.js 35 | error getting steps data", error);
		return error.message;
	}
};