import React from 'react'

export default class ManageCookie extends React.Component {

    getCookie=(name)=>{
        var regexp = new RegExp('(\\s*?'+name+')=(.*?)(?:;|$)','g')
        var result = regexp.exec(document.cookie)
        if (result === null) {
            return null
        } else {
            var strResult = result[0].replace(name+'=','')
            strResult = strResult.trim()
            return strResult.replace(';','')
        }
    }

}