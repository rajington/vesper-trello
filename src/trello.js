/*global Trello*/

export const authorize = () => {
  Trello.authorize({
    name: 'vesper-trello',
    scope: {
      read: true,
      write: true,
    },
    expiration: '1day',
  });
};

export const authorized = () => {
  Trello.authorize({ interactive: false });
  return Trello.authorized();
}
