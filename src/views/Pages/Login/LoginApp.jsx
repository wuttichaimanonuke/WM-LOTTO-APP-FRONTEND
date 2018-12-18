import React from 'react'
import { isNullOrUndefined, isNull } from 'util'
import ConfigurationApi from '../../../script/config/ConfigurationApi'

async function loginAppliction (urlApi, headerOptions) {
    try {
      const res = await fetch(urlApi, headerOptions)
      const response = await res.json()
      if ( (isNullOrUndefined(response.token)) || (isNullOrUndefined(response.uId)) ) {
        return false
      } else {
        document.cookie = 'appToken='+response.token+';'
        document.cookie = 'appUser='+response.uId+';'
        sessionStorage.setItem('appToken', response.token)
        sessionStorage.setItem('appUser', response.uId)
        return true
      }
    } catch (error) {
      return false
    }
  }

class LoginApp extends React.Component {

    constructor(props) {
        super(props)
        var configurationApi = new ConfigurationApi()
        this.state = {
            username : props.username
            ,password : props.password
            ,statusCheck : false 
            // ,urlApi : 'http://localhost:8888/login_app/login'
            ,urlApi : configurationApi.getApiFullByApiName('login_app_login')
            ,options : {
                method: 'post'
                , headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    , 'Accept': 'application/json;charset=UTF-8'
                    , 'Access-Control-Allow-Origin': '*'
                }
                , body: JSON.stringify(
                    {
                        'token' : ''
                        ,'dataValue' : [
                            { 
                                username : props.username
                                ,password : props.password }
                        ]
                    }
                )
            }
        }
    }

    loginApp=()=>{
        return loginAppliction(this.state.urlApi, this.state.options)
    }
}

export default LoginApp