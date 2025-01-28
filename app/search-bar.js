'use client'

export default function SearchBar() {

    const containerColumn = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }

    // const searchBarStyle = {
    //     border: '2px solid black',
    //     margin: '1em',
    //     width: '50%',
    //     height: '2em'
    // }

    const inputFieldStyle = {
        width: '50%',
        height: '75px',
        padding: '12px 20px',
        boxSizing: 'border-box',
        border: '2px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f8f8f8',
        fontSize: '16px',
        resize: 'none'
    }

    const buttonStyle = {
        // marginTop: '10%'
    }

    function handleClick() {
        console.log("Seach Button Clicked   ");
    }

    return (
        <div>
            {/* <div style={searchBarStyle}>
                <input style={inputFieldStyle} placeholder="Search..."></input>
            </div>
            <button style={buttonStyle} onClick={handleClick}>Search</button>
         */}
            <div style={containerColumn}>
                <textarea style={inputFieldStyle} id="searchField" placeholder="Search..."></textarea>
                <button style={buttonStyle} onClick={handleClick}>Search</button>
            </div>
        </div>
    )
}