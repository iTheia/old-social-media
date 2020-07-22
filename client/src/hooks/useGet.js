import { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = localStorage.getItem('URL');
const token = localStorage.getItem('token');
export default function useGet(
	url,
	state = [],
	useToken = false,
	reRender = [],
	config = { headers: {} },
	reverse = false,
	extraFunction
) {
	const [data, setData] = useState(state);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [hasMore, setHasMore] = useState(false);

	if (useToken) {
		config.headers['x-access-token'] = token;
	}

	const fetchData = async () => {
		const fetchUrl = baseURL + url;
		try {
			const response = await axios.get(fetchUrl, config);
			if (reverse) {
				setData((data) => response.data.concat(data));
			} else {
				setData(response.data);
			}
			setLoading((loading) => (loading = false));
			if (
				Object.prototype.toString.call(response.data) ===
				'[object Array]'
			) {
				if (response.data.length > 0) {
					extraFunction();
					setHasMore(true);
				} else if (response.data.length === 0) {
					setHasMore(false);
				}
			}
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchData();
	}, reRender);

	const cleanUp = () => {
		setData(state);
	};

	return [data, loading, error, cleanUp, setData, hasMore];
}
