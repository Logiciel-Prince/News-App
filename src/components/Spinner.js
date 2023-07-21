import React, { Component } from 'react'
import Loading from './3WyW.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={Loading} alt="Loading" sizes="" srcset="" />
            </div>
        )
    }
}

export default Spinner
