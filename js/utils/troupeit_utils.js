// TIUtils

'use strict';

class TIUtils {
    static pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }
    
    static formatDuration(n, addPlus) {
        let h = Math.floor(n / 3600);
        let m = Math.floor((n - (h * 3600)) / 60);
        let s = n - h * 3600 - m * 60;
        let plus_s = "";        

        if (addPlus) {
            plus_s = "+";
        }

        return(plus_s + this.pad(h) + ":" + this.pad(m) + ":" + this.pad(s));
    }
}

module.exports = TIUtils;
