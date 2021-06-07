import currencyFormatter from 'currency-formatter';

const SecurityUtils = {
    hasPermission :(currentUser, permission) => {
        for (var i=0; i < currentUser.roles.length; i++) {
            var permissions = JSON.parse(currentUser.roles[i].permissions);
            if (permissions[permission] == true) {
                return true;
            }
        }
        return false;
    }
}
const FormatterUtils = {
    formatCurrency: (amount) => {
        return currencyFormatter.format(amount, {precision: 0});
    },
    round2Decimals: (num) => {
        return parseFloat(Math.round(num * 100) / 100);
    }
};

// parseFloat(Math.round(num3 * 100) / 100).toFixed(2);

const ObjectUtils = {
    // Add property and clone the entity
    addProperty: (sourceObject, key, value) => {
        sourceObject[key] = value;
        return Object.assign({}, sourceObject);
    },
    clone: (sourceObject) => {
        return Object.assign({}, sourceObject);
    }
};

const ArrayUtils = {
    // Add item and clone the array
    push: (sourceArray, item) => {
        sourceArray.push(item);
        return sourceArray.slice(0);
    },

    clone: (sourceArray) => {
        return sourceArray.slice(0);
        // return sourceArray.filter(function(e) { return true }); // clone all
    },

    // remove item and clone the array
    removeById: (sourceArray, item) => {
        return sourceArray.filter(function(e) { return e.id !== item.id });
    },

    findById: (sourceArray, id) => {
        for (var i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i].id == id) {
                return sourceArray[i];
            }
        }
        return null;
    },

    contains: (sourceArray, item) => {
        for (var i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i] === item) {
                return true;
            }
        }
        return false;
    }
};

const StringUtils = {
    checkBothLetterAndNumber: (s) => {
        var upperLetters = /[A-Z]+/g;
        var lowerLetters = /[a-z]+/g;
        var numbers = /[0-9]+/g;
        return (upperLetters.test(s) || lowerLetters.test(s)) && numbers.test(s);
    },
}

const RandomUtils = {
    generateLetterAndNumber: (length) => {
        var text = "";
        var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    generateNumber: (length) => {
        var text = "";
        var possible = "0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}

const ScriptUtils = {
    // This should be called in componentDidUpdate to ensure library is run after the page has been rendered.
    loadLibrary: (url) => {
        const footer = document.getElementsByTagName('footer')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        footer.appendChild(script);
    },

    loadFootable: () => {
        ScriptUtils.loadLibrary("/assets/js/pages/table_responsive.js");
    },

    loadFormLayout: () => {
        ScriptUtils.loadLibrary("/assets/js/pages/form_layouts.js");
    }
}

export {
    FormatterUtils,
    ObjectUtils,
    ArrayUtils,
    StringUtils,
    ScriptUtils,
    RandomUtils,
    SecurityUtils
};