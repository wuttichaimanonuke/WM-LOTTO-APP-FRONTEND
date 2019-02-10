import React from 'react'
import ConfigurationApi from '../../../script/config/ConfigurationApi'
import ManageCookie from '../../../script/cookie/ManageCookie'
import { isNullOrUndefined, isNull } from 'util';

class LogoutApp extends React.Component {
    constructor(props) {
        super(props)
        var configurationApi = new ConfigurationApi()
        var manageCookie = new ManageCookie()
        this.state = {
            token : manageCookie.getCookie('appToken')  //props.token 
            ,urlApi : configurationApi.getApiFullByApiName('login_app_logout_proc')
            ,options : {
                method: 'post'
                , headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    , 'Accept': 'application/json;charset=UTF-8'
                    , 'Access-Control-Allow-Origin': '*'
                    , 'token': manageCookie.getCookie('appToken') //props.token
                }
            }
        }
    }

    callLogoutApp = async (urlApi, headerOptions) => {
        const response = await ( await ( fetch(urlApi, headerOptions)
                                            .then(res => {
                                                return res.json()
                                            })
                                            .catch(err => {
                                                console.log('error : ',err)
                                            })
                                        )
                                )
        // console.log('response from logout api = {}',response)
    }

    logoutApp = async () => {
        var manageCookie = new ManageCookie()
        if (!((manageCookie.getCookie('appToken') == '') || (isNullOrUndefined(manageCookie.getCookie('appToken'))))) {
            // console.log('befor call api logout check token. token is = ',this.state.token)
            this.callLogoutApp(this.state.urlApi, this.state.options)
            document.cookie = 'appToken=;'
            document.cookie = 'appUser=;'
            sessionStorage.setItem('appToken', null)
            sessionStorage.setItem('appUser', null)
            // console.log('call api logout finish. check cookie appToken = {}',manageCookie.getCookie('appToken'))
        }
    }
}

export default LogoutApp