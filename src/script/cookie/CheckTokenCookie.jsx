import React from 'react'
import ManageCookie from './ManageCookie'
import ConfigurationApi from '../config/ConfigurationApi'

async function asyncFetchCheckTokenAndUid (urlApi, options) {
    var result = false
    const res = await fetch(urlApi, options)
    const response = await res.json()
    result = await response.result
    return result
}

class CheckTokenCookie extends React.Component {

    constructor(props) {
        super(props)
        var manageCookie = new ManageCookie()
        var configurationApi = new ConfigurationApi()
        this.state = {
            tokenApp : manageCookie.getCookie('appToken')
            ,uIdApp : manageCookie.getCookie('appUser')
            ,statusCheck : false 
            // ,urlApi : 'http://localhost:8888/tokenlogin/checkThisTokenByTkUid'
            ,urlApi : configurationApi.getApiFullByApiName('tokenlogin_checkThisTokenByTkUid')
            ,options : {
                method: 'post'
                , headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    , 'Accept': 'application/json;charset=UTF-8'
                    , 'Access-Control-Allow-Origin': '*'
                }
                , body: JSON.stringify(
                    {
                        'token' : manageCookie.getCookie('appToken')
                        ,'dataValue' : [
                            { uId : manageCookie.getCookie('appUser') }
                        ]
                    }
                )
            }
        }
    }

    checkParametor=()=>{
        if ((this.state.tokenApp === null) || (this.state.tokenApp === '') || (this.state.uIdApp === null) || (this.state.uIdApp === '')) {
            return false
        } else {
            return true
        }
    }

    getStatusCheck=()=>{
        if (this.checkParametor()) {
            return asyncFetchCheckTokenAndUid(this.state.urlApi, this.state.options)
        }
        return false
    }
}

export default CheckTokenCookie