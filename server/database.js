import mongoose from 'mongoose';
import config from './config';

const connection = async () => {
	try {
		await mongoose.connect(
			config.database,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			},
			() => {
				console.log('hakeado');
			}
		);
	} catch (error) {
		console.log(error);
	}
};

export default connection;
