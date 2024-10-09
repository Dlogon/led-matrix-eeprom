const generateLocationString = (location) => {

    const base16Location = parseInt(location).toString(16).toUpperCase();
    const locationZeros = base16Location + '000';
    const leftZerosToAdd = 7 - locationZeros.length;
    const resultString = ':2'.padEnd(leftZerosToAdd + 2, '0') + locationZeros;

    return resultString;
}

const printResult = () => {

    const divResult = document.getElementById('generatedString');
    divResult.innerText = result;
    console.log(result);
};