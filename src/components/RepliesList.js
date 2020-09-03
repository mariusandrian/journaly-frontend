import React, { Component } from 'react'

export class RepliesList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="replies-container">
                {this.props.item.replies === undefined ? 'none' :
                    this.props.item.replies.map((reply, index) => {
                        return(
                            <div className="reply-item">
                                <p><span className="reply-item-username">{reply.username}</span> {reply.content}</p>
                            </div>
                        )
                    }
                    )}
            </div>
        )
    }
}

export default RepliesList
