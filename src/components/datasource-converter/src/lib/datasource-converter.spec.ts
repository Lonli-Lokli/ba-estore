import { readFile, writeFile } from 'fs/promises';

import { calculateMaxAvios, datasourceConverter } from './datasource-converter';

describe('datasourceConverter', () => {

  // Enable only when original datasource must me migrated
  it.skip('should convert whole datasource', async () => {
    const retailers = JSON.parse(
      await readFile('./datasource/original.json', 'utf8')
    );

    const datasource = datasourceConverter(retailers);
    await writeFile(
      "./datasource/db.json",
      JSON.stringify(datasource, null, 2)
    );
  });

  it('should parse whole datasource', async () => {
    const retailers = JSON.parse(
      await readFile('./datasource/original.json', 'utf8')
    );

    datasourceConverter(retailers); // expect no throw
  });



  it('should convert rate 1', async () => {
    const maxAviosPerPound = calculateMaxAvios('test', 'Up to 8 Avios / £1', [
      {
        condition: 'Existing customers',
        value: '3 Avios / £1',
      },
      {
        condition: 'Guest checkout',
        value: '',
      },
      {
        condition: 'New customers',
        value: '6 Avios / £1',
      },
    ]);

    expect(maxAviosPerPound).toBe(6);
  });

  it('should convert rate 2', async () => {
    const maxAviosPerPound = calculateMaxAvios('test', 'Up to 11 Avios / £1', [
      {
        condition: 'First Time Subscription',
        value: '1,000 Avios',
      },
      {
        condition: 'First Time Subscription',
        value: '1,300 Avios',
      },
      {
        condition: 'All Other Purchases',
        value: '11 Avios / £1',
      },
    ]);

    expect(maxAviosPerPound).toBe(1300);
  });
});
