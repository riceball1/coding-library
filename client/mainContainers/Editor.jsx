import React, {Component} from 'react'
import ReqAuthHOC from '../auth/requireAuthHOC'

class Editor extends Component {

    render() {
        return <div>
            Editor Place holder
        </div>
    }

}

export default ReqAuthHOC(Editor)