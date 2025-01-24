export const generateArray = (size: number) => {
  let array = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    array.push(row);
  }
  return array;
};

export const generateLocationString = (location: Number) => {
  const base16Location = location.toString(16).toUpperCase();
  const locationZeros = base16Location + "000";
  const leftZerosToAdd = 7 - locationZeros.length;
  const resultString = ":2".padEnd(leftZerosToAdd + 2, "0") + locationZeros;

  return resultString;
};
