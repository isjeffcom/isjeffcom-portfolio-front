export function decodeRichText (val) {
    var replaceall = require("replaceall")
    val = replaceall('|*|', '"', val)
    val = replaceall('|**|', "'", val)
    return val
}