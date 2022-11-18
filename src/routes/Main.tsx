import React from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Selection from "../components/Selection"

export function Main (): JSX.Element
{
    return (
        <>
            <NavBar />
            <Hero />
            <Footer />
        </>
    )
}
