/**
 * Created by dennis on 2/12/16.
 */


function validateIdentification(identification){
    identification = identification.toString();
    if(identification.length !== 10){
        return false;
    }
    var regionNumber = identification.substring(0,2);
    if( !(regionNumber >= 1 && regionNumber <=24) ){
        return false;
    }
    var thirdDigit = identification.charAt(2);
    if( !(thirdDigit < 6) ){
        return false;
    }

    const sumDigits = identification.substring(0,9).split('')
        .map((digit, index) => (index + 1)%2 == 0?digit*1:digit*2)
        .map(digit => digit>9 ? digit-9 : digit)
        .reduce((acc, digit) => acc + digit,0);
    const modul10 = sumDigits%10;
    const verifier = (modul10 === 0 ? 0 : (10 - modul10));
    return verifier === parseInt(identification.charAt(9));
}

function isEmpty(str){
    return !str || String(str).replace(/ /g,'').length === 0
}

function isGreaterThanDigit(str, digits){
    var minNumber = '1';
    for(var i=0; i< (digits)-1; i++){
        minNumber = minNumber+'0'
    }
    return parseInt(minNumber) <= parseInt(str);
}

function hasMinimumChars(str, length) {
    var noSpace = String(str).replace(/ /g,'');
    return noSpace.length > (length)-1

}
function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
module.exports = {
    isValidIdentification: validateIdentification,
    isEmpty: isEmpty,
    isGreaterThanDigit: isGreaterThanDigit,
    hasMinimumChars: hasMinimumChars,
    isValidEmail: isValidEmail
};