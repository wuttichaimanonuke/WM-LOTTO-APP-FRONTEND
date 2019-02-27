import React from 'react'
import { isNullOrUndefined } from 'util'
// import { isNullOrUndefined, isNull } from 'util'
import ConfigurationApi from '../../../script/config/ConfigurationApi'

class LoginApp extends React.Component {

    constructor(props) {
        super(props)
        var configurationApi = new ConfigurationApi()
        this.state = {
            username : props.username
            ,password : props.password
            ,statusCheck : false 
            ,urlApi : configurationApi.getApiFullByApiName('login_app_login_func')
            ,options : {
                method: 'post'
                , headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    , 'Accept': 'application/json;charset=UTF-8'
                    , 'Access-Control-Allow-Origin': '*'
                    , 'username': props.username
                    , 'password': props.password
                }
            }
            // ,urlApi : 'http://localhost:8888/login_app/login'
            /*
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
            */
        }
    }

    callLoginApp = async (urlApi, headerOptions) => {
        const response = await ( await ( fetch(urlApi, headerOptions)
                                            .then(res => {
                                                return res.json()
                                            })
                                            .catch(err => {
                                                console.log('error : ',err)
                                                return JSON.stringify(
                                                    {
                                                        'resultCode' : 'LOGI204'
                                                    })
                                            })
                                        )
                                )
        return await response
    }

    setSessionStorageData = async (loginJsonData) => {
        if ( loginJsonData.resultCode === 'LOGI200' ) {
            document.cookie = 'appToken='+loginJsonData.token+';'
            document.cookie = 'appUser='+loginJsonData.uId+';'
            sessionStorage.setItem('appToken', loginJsonData.token)
            sessionStorage.setItem('appUser', loginJsonData.uId)
            return true
          } else {
            document.cookie = ''
            document.cookie = ''
            sessionStorage.setItem('appToken', null)
            sessionStorage.setItem('appUser', null)
            return false
          }
    }

    loginApp = async () => {
        const loginJsonData = await this.callLoginApp(this.state.urlApi, this.state.options)
        const result = await this.setSessionStorageData(loginJsonData)
        return result
        // return loginAppliction(this.state.urlApi, this.state.options)
    }
}

export default LoginApp