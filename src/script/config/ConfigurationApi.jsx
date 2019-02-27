import React from 'react'

const ConfigApiIp = 'http://localhost'
const ConfigApiPort = '8888'
const ConfigApiList = {
    'tokenlogin_checkThisTokenByTkUid' : '/tokenlogin/checkThisTokenByTkUid'
    , 'tokenlogin_checkTokenIsExpire' : '/tokenlogin/checkTokenIsExpire'
    , 'login_app_login' : '/login_app/login'
    , 'login_app_login_func' : '/login_app/login_func'
    , 'login_app_logout_proc' : '/login_app/logout_proc'
}

class ConfigurationApi extends React.Component {

    getApiIp=()=>{
        return ConfigApiIp
    }

    getApiPort=()=>{
        return ConfigApiPort
    }

    getApiListObj=()=>{
        return ConfigApiList
    }

    getApiListJson=()=>{
        return JSON.parse(JSON.stringify(ConfigApiList))
    }

    getApiNameValue (apiName) {
        return ConfigApiList[apiName]
    }

    getApiFullByApiName=(apiName)=>{
        var fullApi = ConfigApiIp+':'+ConfigApiPort+this.getApiNameValue(apiName)
        return fullApi
    }
}

export default ConfigurationApi