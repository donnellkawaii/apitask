const fetch = require('node-fetch');
const getStores = require('./function');

describe('getStores', () => {
  it('fetches data from the API', async () => {
    const data = await getStores();
    expect(Array.isArray(data)).toBe(true);
  });

  it('throws an error when API call fails', async () => {
    const errorMessage = 'API is down';
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mocking fetch to throw an error
    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

    try {
      await getStores();
    } catch (e) {
      expect(e.message).toMatch(errorMessage);
    }

    expect(console.error).toHaveBeenCalled();
  });
});
