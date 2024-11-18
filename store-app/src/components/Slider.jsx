import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../assets/screenshots/slider1.jpg";
import img2 from "../assets/screenshots/slider2.jpg";
import img3 from "../assets/screenshots/slider3.png";

const Slider = () => {

	return (
		<div my={{ base: "10px", sm: "10px", md: "20px", lg: "30px" }} className="px-4 py-3 bg-[#FFE1FF]" >
			<Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} showStatus={false} showArrows={true} showIndicators={true} stopOnHover={true} transitionTime={200}>
				<div>
					<img src={img1} />
				</div>
				<div>
					<img src={img2} />
				</div>
				<div>
					<img src={img3} />
				</div>
			</Carousel>
		</div>
	)
}

export default Slider