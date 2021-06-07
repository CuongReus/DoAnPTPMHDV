import currencyFormatter from 'currency-formatter';
import { User } from '../pages/user/User';
const SecurityUtils = {
    hasPermission :(currentUser: User, permission: string) => {
        if(currentUser){
            for (var i=0; i < currentUser.roles.length; i++) {
                var permissions = JSON.parse(currentUser.roles[i].permissions);
                if (permissions[permission] == true) {
                    return true;
                }
            }
        }
        return false;
    }
}
const FormatterUtils = {
    formatCurrency: (amount: number) => {
        return currencyFormatter.format(amount, {precision: 0});
    },
    round2Decimals: (num : any) => {
      return parseFloat((Math.round(num * 100) / 100).toString())
  },
};

const StringUtils = {
    checkBothLetterAndNumber: (s: string) => {
        var upperLetters = /[A-Z]+/g;
        var lowerLetters = /[a-z]+/g;
        var numbers = /[0-9]+/g;
        return (upperLetters.test(s) || lowerLetters.test(s)) && numbers.test(s);
    },
    isEmptyOrSpaces(str: string){
        return str === null || str.match(/^ *$/) !== null;
    }

}

const RandomUtils = {
    generateLetterAndNumber: (length: number) => {
        var text = "";
        var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    generateNumber: (length: number) => {
        var text = "";
        var possible = "0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}

export {
    FormatterUtils,
    StringUtils,
    RandomUtils,
    SecurityUtils
};
