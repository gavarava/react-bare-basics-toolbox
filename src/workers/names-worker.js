// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // TODO Decide later
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = (message) => {
    const nbr = message.data;
    var n1 = 0;
    var n2 = 1;
    var somme = 0;


    for (let i = 2; i <= nbr; i++) {
      somme = n1 + n2;


      n1 = n2;


      n2 = somme;
    }


    const result = nbr ? n2 : n1;


    postMessage(result);
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
// eslint-disable-next-line no-restricted-globals
