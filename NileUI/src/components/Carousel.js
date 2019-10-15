import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default class CustomCarousel extends Component {
    render() {
        return (
            // <div id="" className="carousel slide custom-carousel" data-ride="carousel">
            //     <div className="carousel-inner">
            //         <div className="carousel-item active">
            //             <img src='../slideshow/amz-1.jpg' className="d-block w-100 custom-carousel-img" alt="a" />
            //         </div>
            //         <div className="carousel-item">
            //             <img src='../slideshow/amz-2.jpg' className="d-block w-100 custom-carousel-img" alt="v" />
            //         </div>
            //         <div className="carousel-item">
            //             <img src='../slideshow/amz-3.jpg' className="d-block w-100 custom-carousel-img" alt="s" />
            //         </div>
            //     </div>
            // </div>
            <Carousel interval='3000' className="carousel slide custom-carousel" >
                <Carousel.Item>
                    <img
                        className="d-block w-100 custom-carousel-img"
                        src="../slideshow/amz-1.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 custom-carousel-img"
                        src="../slideshow/amz-2.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 custom-carousel-img"
                        src="../slideshow/amz-3.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        )
    }
}
