import { React } from 'react'
import { NavLink } from 'react-router-dom'
import { PetFilter } from './PetFilter'

export class _Header extends React.Component {
    state = {
        isFilterShown: false
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        (window.pageYOffset > 50) ? this.setState({ isFilterShown: true }) : this.setState({ isFilterShown: false })
    }

    render() {
        const { isFilterShown } = this.state
        const className = (this.props.location.pathname !== '/' || isFilterShown) ? 'nav-white' : ''
        return (
            <>
                {isFilterShown && <PetFilter /> }

                <header className={ `main-header ${className} main-container` }>
                    < nav className="header-container" >
                        <NavLink onClick={ () => this.props.loadPets() } to="/">
                            <div className="logo-container flex">
                                <div className="logo"></div>
                                <h1 className={ `logo-title ${className && 'black'}` }>PetMe</h1>
                            </div>
                        </NavLink>
                    </ nav>
                </header>

            </>
        )
    }
}
// ------------------------------------------
//Sass example:

// .main-header {
// 
//     &.nav-white {
//         background-color: white;
//         color: black;
//     }
// }
    