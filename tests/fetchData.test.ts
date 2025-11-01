// tests/fetchData.test.ts
import { jest, describe, it, expect } from '@jest/globals';

// Keep it concrete & non-generic for the mock's signature:
type Headers = Record<string, string>;
type GetJsonLike = (url: string, headers?: Headers, timeoutMs?: number) => Promise<any>;

// ✅ Type the variable, not jest.fn generics
const mockGetJson = jest.fn() as jest.MockedFunction<GetJsonLike>;

jest.unstable_mockModule('../src/utils/http.js', () => ({
    getJson: mockGetJson
}));

// Import SUT after the mock is set up
const { default: fetchData } = await import('../src/utils/fetchData.js');

describe('fetchData (ESM)', () => {
    it('returns city weather from mocked APIs', async () => {
        // 1st call: Nominatim
        mockGetJson.mockResolvedValueOnce([{ lat: '43.65', lon: '-79.38', display_name: 'Toronto' }]);
        // 2nd call: Open-Meteo
        mockGetJson.mockResolvedValueOnce({ current_weather: { temperature: 23, windspeed: 12, weathercode: 1 } });

        const out = await fetchData('Toronto');

        expect(out).toEqual({
            city: 'Toronto',
            temperature: '23°C',
            windSpeed: '12 km/h',
            condition: 'Mainly clear'
        });
        expect(mockGetJson).toHaveBeenCalledTimes(2);
    });
});
