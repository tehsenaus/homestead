import 'should';
import {getMarketPrice} from './market-state';

describe('Market', function() {
	const food = {
		marketLevels: [
			{minAmount: 0, bid: 7, ask: 10},
			{minAmount: 1, bid: 6, ask: 8},
		],
	};

	describe('getMarketPrice', function() {

		it('returns import price for buying when market is empty', function() {
			const state = {
				food: {
					commodity: food,
					amount: 0,
				},
			};

			getMarketPrice('food', 'buy', 1, state).should.eql(10);
		});

		it('returns first level price for selling one when market is empty', function() {
			const state = {
				food: {
					commodity: food,
					amount: 0,
				},
			};

			getMarketPrice('food', 'sell', 1, state).should.eql(6);
		});

	});

});
