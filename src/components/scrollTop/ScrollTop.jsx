import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom"

const ScrollTop = () => {
    const { pathname } = useLocation();
    useLayoutEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 0)
    }, [pathname])
    return null
}

export default ScrollTop