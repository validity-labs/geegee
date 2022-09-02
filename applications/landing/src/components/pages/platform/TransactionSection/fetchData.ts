import { sleep } from "@/libs/helpers"

const REPEAT_N_TIMES = 11;
const records = [
  {
    id: 1,
    direction: 'in',
    date: '2022-08-09T11:57:59Z',
    asset: 'GE',
    from: '0x0000000000000000000000000000000000000001',
    to: '0x0000000000000000000000000000000000000002',
    diff: 0.234,
    value: 200,
    fee: 0.23,
  },
  {
    id: 2,
    direction: 'out',
    date: '2022-01-09T11:57:59Z',
    asset: 'GE',
    from: '0x0000000000000000000000000000000000000001',
    to: '0x0000000000000000000000000000000000000002',
    diff: -9.432,
    value: 600,
    fee: 0.23,
  },
];

const fetchData = async () => {
  await sleep(1);

  const fakeRecords = new Array(REPEAT_N_TIMES).fill(records).flat().map((r, ri) => ({ ...r, id: ri + 1 }));

  return {
    total: fakeRecords.length, records: fakeRecords,
  }
}

export default fetchData;
