/**
 * Created by dennis on 2/12/16.
 */

var FormatUtils = {
    fixSite: function(wrongSite) {
        if(!wrongSite) return '';
        return  wrongSite.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\./g, '_');
    },
    fixText: function(string){
        var newString = String(string);
        var str = newString.toLowerCase();

        for (var i=0;i<str.length;i++){
            if (str.charAt(i)=="á") str = str.replace(/á/,"a");
            if (str.charAt(i)=="é") str = str.replace(/é/,"e");
            if (str.charAt(i)=="í") str = str.replace(/í/,"i");
            if (str.charAt(i)=="ó") str = str.replace(/ó/,"o");
            if (str.charAt(i)=="ú") str = str.replace(/ú/,"u");
        }
        return str;
    },
    numberFormat: function(num, decimal){
        var num = Number(num);
        var p = num.toFixed(2).split(".");
        return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
                return  num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + (decimal==false || !decimal ? '' :("." + p[1]));
    },
    stripSlashes: function(text) {
        return text.replace(/\\(.)/mg, "$1");
    },
    getYears: function(since, until){
        var years = [];
        for(var i=since; i<until; i++) {
            years.push({name: i, id: i});
        }
        return years.reverse();
    },
    removeSpecialCharacters: function(text) {
        var regex = /[^0-9a-zA-Z\s.-]/gi;
        return text.replace(regex,'');
    },
    hasHTMLTagsOrUrls: function(description){
        if (/<[a-z][\s\S]*>/i.test(description)) {
            return true;
        }
        if (new RegExp("https?://[a-z\.0-9]+").test(description) || new RegExp("www\.[a-z\.0-9]+").test(description)) {
            return true;
        }
        return false;
    },
    nl2br: function(str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    },
    allowMaxCharacters: function(element, maxCharacters, action) {
        var currentAmountCharacters = element.length;
        var leftCharacters = maxCharacters;
        if(currentAmountCharacters > maxCharacters) {
            leftCharacters = 0
            element = element.slice(0, maxCharacters);
        }else{
            leftCharacters = parseInt(maxCharacters) - currentAmountCharacters;
        }
        return {"element": element, "maxCharacters": maxCharacters, "leftCharacters": leftCharacters}
    },
    capitalizeFirstLetter: function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    capitalizeString: function(string){
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    QueryStringToJSON: function(){
        var pairs = location.search.slice(1).split('&');
        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return JSON.parse(JSON.stringify(result));
    }
};
module.exports = FormatUtils;