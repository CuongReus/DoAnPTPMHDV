import currencyFormatter from 'currency-formatter';
import qs from 'query-string';
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
        return parseFloat(Math.round(num * 100) / 100)
    },
    convertImageToDataUri(url, callback) {
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0);

            // // Get raw image data
            // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

            // ... or get as Data URI
            callback(canvas.toDataURL('image/png'));
        };

        image.src = url;
    },

    downloadImageDataUri(url, component, stateName) {
        this.convertImageToDataUri(url, (dataUri) => {
            component.state[stateName] = dataUri;

        });
    }
    // formatTruc: (num) =>{

    // }
};


const ConvertUtils = {
     convertToNumberingScheme :(number)=> {
        var baseChar = ("A").charCodeAt(0),
            letters  = "";
      
        do {
          number -= 1;
          letters = String.fromCharCode(baseChar + (number % 26)) + letters;
          number = (number / 26) >> 0; // quick `floor`
        } while(number > 0);
      
        return letters;
      }
}

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
    isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }
    
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
        if(footer){
            footer.appendChild(script);
        }
    },

    loadFootable: () => {
        ScriptUtils.loadLibrary("/assets/js/pages/table_responsive.js");
    },

    loadFormLayout: () => {
        ScriptUtils.loadLibrary("/assets/js/pages/form_layouts.js");
    }

}
const UrlUtils = {
    getPathWithAllParams: () => {
        return window.location.pathname + window.location.search;
    },
    getPathWithParamsNotPaging: () => {
        var sParam = "page";
        var url = window.location.pathname + '?';
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var sURLVariables = sPageURL.split('&');
         
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] != sParam) {
                if(sParameterName[1]){
                    url = url + sParameterName[0] + '=' + sParameterName[1] + '&' 
                }else{

                    url = url + sParameterName[0] + '&' 
                }
                // alert(url);
            }
        }
        return url.substring(0, url.length - 1);
    },
    getArrayParamValue: (url, paramName) => {
        var value = qs.parse(url)[paramName];
        if (!value) {
            return "ALL";
        } else if (!Array.isArray(value)) {
            return [value];
        } else {
            return value;
        }
    }
}

export {
    UrlUtils,
    FormatterUtils,
    ObjectUtils,
    ArrayUtils,
    StringUtils,
    ScriptUtils,
    RandomUtils,
    SecurityUtils,
    ConvertUtils
};