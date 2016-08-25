/*global Trello*/

export default {
  authorize() {
    Trello.authorize({
      name: 'vesper-trello',
      scope: {
        read: true,
        write: true,
      },
      expiration: '1day',
    });
  },
  authorized() {
    Trello.authorize({ interactive: false });
    return Trello.authorized();
  }
}
