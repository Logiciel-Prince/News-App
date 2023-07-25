import React, { Component } from 'react'
import Loading from './3WyW.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className='my-3' src={Loading} alt="Loading" height={50} />
            </div>
        )
    }
}

export default Spinner
