import React, { Component } from 'react'

export class LongTxt extends Component {
    state = {
        readMore: false
    }

    getTxt = () => {
        const { txt } = this.props;
        if (this.state.readMore) return txt;
        return txt.slice(0, 200);
    }

    toggleRead = (ev) => {
        // !this.state.readMore && 
        ev.preventDefault()
        this.setState((prev) => ({ ...prev, readMore: !prev.readMore }))
    }

    addReadmoreMsg = () => {
        if (this.props.txt.length > 100) {
            return (this.state.readMore) ? ' Less' : ' Expand...'
        }
    }

    render() {
        return (
            <span onClick={this.toggleRead}>
                <p className="read-more">
                    {this.getTxt()}<span className="expand-txt">{this.addReadmoreMsg()}</span>
                </p>
            </span>
        )
    }
}
