
import React from 'react'
import { ReactComponent as Male } from '../assets/img/svg/mars.svg'
import { ReactComponent as Female } from '../assets/img/svg/venus.svg'
import { Link } from 'react-router-dom'
import { HeartLike } from './HeartLike'
import userIcon from '../assets/img/loaders/loader_2.svg' // relative path to image
import Slider from "react-slick";

export class PetPreview extends React.Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { pet } = this.props
        if (!pet) <img src={userIcon} alt="loading" />
        const gender = pet?.gender === 'female' ? <Female className="gender" /> : <Male className="gender" />
        return (
            <section className="pet-card-container">
                <Link key={pet._id} to={`/${pet._id}`}>
                    <Slider {...settings}>
                        {pet.imgUrls.map(imgUrl => <img className="img-preview" src={imgUrl} alt="" key={pet._id} />)}
                    </Slider>
                </Link>
                <div className="card-info">
                    <div className="pet-name-gender flex">
                        <p>{pet.name}</p>
                        {gender}
                    </div>
                    <p className="pet-title">{pet.title}</p>
                    <div className="pet-preview-host flex">
                        <p>{pet.owner.name}</p>
                        <div className="pet-preview-likes flex">
                            <HeartLike pet={pet} />
                            <span>{pet.likes}</span>
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}

