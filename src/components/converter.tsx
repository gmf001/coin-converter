'use client';

import { useEffect, useState } from 'react';

interface Props {
	coins: { value: string; rate: number }[];
}

export const Converter = ({ coins }: Props) => {
	const defaultFirst = 'Bitcoin';
	const defaultSecond = 'Australian Dollar';

	const [amount, setAmount] = useState('1');
	const [first, setFirst] = useState(defaultFirst);
	const [second, setSecond] = useState(defaultSecond);
	const [result, setResult] = useState('0.000000');

	useEffect(() => {
		if (coins.length === 0) return;
		const firstRate = coins.find((coin) => {
			return coin.value === first;
		})?.rate;

		const secondRate = coins.find((coin) => {
			return coin.value === second;
		})?.rate;

		if (firstRate === undefined || secondRate === undefined) return;
		const resultRate = (Number(amount) * secondRate) / firstRate;
		setResult(resultRate.toFixed(6));
	}, [amount, first, second, coins]);

	return (
		<>
			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col gap-1 w-full'>
					<label htmlFor='amount'>Amount:</label>
					<input
						defaultValue={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Enter amount to convert'
						type='number'
						id='amount'
						name='amount'
						className='p-3 bg-neutral-800 border border-neutral-600 text-white placeholder:text-gray-400  rounded-md ring-0 focus:ring-0 outline-none focus:border-neutral-600 focus:outline-none'
					/>
				</div>

				<div className='flex flex-col gap-1 w-full'>
					<label htmlFor='from'>From:</label>
					<select
						id='from'
						name='from'
						className='p-3 bg-neutral-800 border border-neutral-600 text-white placeholder:text-white  rounded-md ring-0 focus:ring-0 cursor-pointer outline-none focus:border-neutral-600 focus:outline-none'
						defaultValue={defaultFirst}
						onChange={(e) => setFirst(e.target.value)}>
						{coins.map((coin: any) => (
							<option key={coin.value} value={coin.value}>
								{coin.value}
							</option>
						))}
					</select>
				</div>

				<div className='flex flex-col gap-1 w-full'>
					<label htmlFor='to'>To:</label>
					<select
						id='to'
						name='to'
						className='p-3 bg-neutral-800 border border-neutral-600 text-white placeholder:text-white  rounded-md ring-0 focus:ring-0 cursor-pointer outline-none focus:border-neutral-600 focus:outline-none'
						defaultValue={defaultSecond}
						onChange={(e) => setSecond(e.target.value)}>
						{coins.map((coin: any) => (
							<option key={coin.value} value={coin.value}>
								{coin.value}
							</option>
						))}
					</select>
				</div>
			</div>

			{result !== null && (
				<div>
					<p className='text-lg text-center'>
						{amount}&nbsp;{first}&nbsp;=&nbsp;{result}&nbsp;
						{second}
					</p>
				</div>
			)}

			<div>
				<p className='text-lg text-center'>
					<small>
						<strong>Note:</strong> Conversion rates are based on the latest
						exchange rates.
					</small>
				</p>
			</div>
		</>
	);
};
