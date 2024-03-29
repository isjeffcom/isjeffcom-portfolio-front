var qs = require('qs')
var axios = require('axios')
var utils = require('./utils.js')

// General get data
export function genGet (api, param, callback) {
    
    axios.get(contParam(api, param)).then((response) => {

        callback(response.data);

    }).catch((err) => {

        callback({status: false, msg: err, data: null});

    })
}

export function genUpdate (api, data, callback) {


    var postData = qs.stringify(data)

    axios.post(api, postData)
    .then(function (response) {

        callback(response.data);

    }).catch(function(err){

        callback({status: false, msg: err, data: null});

    })
}


export function logVisit (api, expDay) {

    
    if(utils.getCookie('isjeffcom')){
        return
    } else {
        const tmpUid = parseInt(Math.ceil(Math.random()*1000) * Date.parse( new Date()) / 10000000);
        utils.setCookie('isjeffcom', tmpUid, expDay, false)
    }

    const postData = {
        userAgent: navigator.userAgent,
        userLanguage: navigator.language,
        appName: navigator.appName,
        platform: navigator.platform
    }

    genUpdate(api, postData, (res)=>{
        // console.log(res)
        if(res.status){
            const result = res.data;
            // var result = res.data.split(",");
            if(result.region.indexOf("CN") != -1){
                utils.setCookie('v_region', 'CN', expDay, false)
            }
        }
    })
}

export function logView (api, pid) {
    const postData = {
        pid: pid
    }

    genUpdate(api, postData, (res)=>{
        if(res.status){
            // Do nothing...
        }
    })
}

// Construct url with paramaters
function contParam (api, param) {
    
    // Assumble get url paramaters
    if(param.length > 0){
        api = api + "?"
        
        
        for(var i=0;i<param.length;i++){

            if(i == param.length - 1){
                
                api = api + param[i].name + "=" + param[i].val
            } else {
                api = api + param[i].name + "=" + param[i].val + "&"
            } 
        }    
    }

    return api
}