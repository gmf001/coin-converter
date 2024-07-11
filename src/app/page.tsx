import { Converter } from '@/components/converter';
import { ApiResponse } from '@/types';

const apiurl = 'https://api.coingecko.com/api/v3/exchange_rates';

const getCoins = async () => {
	const response = await fetch(apiurl);
	const json = (await response.json()) as ApiResponse;
	const data = json.rates;
	return Object.entries(data).map((item) => {
		return {
			value: item[1].name,
			rate: item[1].value
		};
	});
};

export default async function Home() {
	const coins = await getCoins();

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='gap-6 flex flex-col w-full max-w-lg'>
				<div>
					<h1 className='text-4xl font-bold text-center'>Coin Converter</h1>
					<p className='text-lg text-center'>
						Convert cryptocurrency values with ease
					</p>
				</div>

				<Converter coins={coins} />
			</div>
		</main>
	);
}
