import React from "react"

export default function PermissionDenied({
    title,
    type
}) {

    const empty_page_div = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2% 0',
        flexDirection: 'column',
        height:'100vh'
    }

    return (
        <>
            <div style={empty_page_div}>
                <img src={'https://img.freepik.com/premium-vector/technology-abstract-security-lock-circle-background_34679-781.jpg?semt=ais_hybrid'} style={{ width: 500 }} />
                <h3 className="global-h3" style={{ marginTop:'20px', color: 'black', fontSize: 23, fontWeight: 500 }}>{title}</h3>
            </div>
        </>
    )
}