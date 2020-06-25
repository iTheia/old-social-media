import React from 'react'

export default function Post(props) {
    return (
        <div>
            {props.match.params.id}
        </div>
    )
}
