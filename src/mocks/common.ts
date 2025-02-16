export const getRandomDate = () => {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).toISOString();
};

const users = [
  'admin.tester',
  'john.doe',
  'jane.smith',
  'bob.wilson',
  'alice.cooper',
  'james.bond',
  'michael.jackson',
  'elvis.presley',
  'freddie.mercury',
];
export const getRandomUser = () =>
  users[Math.floor(Math.random() * users.length)];
