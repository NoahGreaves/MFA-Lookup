'use client'

export default function SearchBar({ style }) {
    return (
        <>
            <textarea id="searchField" style={style} placeholder="Search..."></textarea>
        </>
    )
}