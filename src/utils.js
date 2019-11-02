var replaceall = require("replaceall")
export function decodeRichText (val) {
    
    val = replaceall('|*|', '"', val)
    val = replaceall('|**|', "'", val)
    
    return val
}

export function decodeImgSrc (val, base){
    val = replaceall('[%base%]', base, val)
    return val
}

export function getCookie (cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for(var i=0; i<ca.length; i++){
        var c = ca[i].trim()
        if (c.indexOf(name)==0) return c.substring(name.length,c.length)
    }
    return ""
}

export function setCookie (name, value, expDays, remove) {
    // Prevent repeatedly set same cookie
    if(getCookie(name).length > 1){
        return
    }

    var exp, expTime
    
    if(!remove){
        expTime = (((60 * 1000)*60)*24)*expDays
        exp = new Date()
        exp.setTime(exp.getTime() + expTime)
        document.cookie = name + "=" + value + ";" + "expires=" + exp.toGMTString()+";SameSite=Strict;"
    } else {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
}

export function isMobile () {
    return screen.width < 480 ? true : false
}

