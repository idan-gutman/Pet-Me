
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
export function Footer() {

    return (
        <footer className="main-footer main-layout flex column align-center justify-center">
            <small>&copy; PetMe - All Rights Reserved.</small>
            <ul className="nav-social flex align-center justify-center clean-list">
                <li>
                    <FacebookIcon  className="fa"/>
                </li>
                <li>
                    <InstagramIcon className="in" />
                </li>
                <li>
                    <TwitterIcon className="tw" />
                </li>
            </ul>
        </footer>
    )

}
