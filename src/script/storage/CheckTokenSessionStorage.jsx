import React from 'react'
import ConfigurationApi from '../config/ConfigurationApi'

class CheckTokenSessionStorage extends React.Component {

    constructor(props) {
        super(props)
        var configurationApi = new ConfigurationApi()
        this.state = {
            tokenApp : sessionStorage.getItem('appToken')
            ,statusCheck : false
            ,urlApi : configurationApi.getApiFullByApiName('tokenlogin_checkTokenIsExpire')
            ,options : {
                method: 'post'
                , headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    , 'Accept': 'application/json;charset=UTF-8'
                    , 'Access-Control-Allow-Origin': '*'
                    , 'appToken': sessionStorage.getItem('appToken')
                }
            }
        }
    }

    asyncFetchCheckToken = async (urlApi, options) => {
        const response = await( await (fetch(urlApi, options)
                                        .then(res => {
                                            // console.log("**********",res.ok)
                                            return res.json()
                                        })
                                        // .then((data) => {
                                        //     console.log("----------",data)
                                        //     return data
                                        // })
                                        .catch(err => {
                                            console.log('error : ',err)
                                            return JSON.stringify(
                                                {
                                                    'resultCode' : 'CTIE204'
                                                })
                                        })
                                    )
                            )
        return await response.resultCode
    }

    checkParametor=()=>{
        if ((this.state.tokenApp === null) || (this.state.tokenApp === '')) {
            return false
        } else {
            return true
        }
    }

    getStatusCheck = async () => {
        if (this.checkParametor()) {
            const jsonData = await ( this.asyncFetchCheckToken(this.state.urlApi, this.state.options) )
            if ( jsonData === 'CTIE200' ) {
                return true
              }
        }
        return false
    }
}

export default CheckTokenSessionStorage