const URL = 'https://randomuser.me/api/?results=100&seed=fullstackio';

export const fetchContacts = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.results.map(formatUser);
};

export const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const data = await response.json();
  return formatUser(data.results[0]);
};

export const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return formatUser(data.results[0]);
};

const formatUser = (user) => {
  return {
    name: `${user.name.first} ${user.name.last}`,
    avatar: user.picture.large,
    phone: user.phone,
    email: user.email,
    cell: user.cell,
    favorite: Math.random() < 0.2, // Gán ngẫu nhiên favorite
  };
};
