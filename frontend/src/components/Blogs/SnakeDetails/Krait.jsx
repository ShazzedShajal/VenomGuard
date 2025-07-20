import React from 'react';
import krait from "../../../assets/images/krait.jpg";
import "./SD.css"
const Krait = () => {
    return (
        <div className='backish'>
            {/* <h1>Krait Snakes: A Fascinating Journey into Their Traits and Perils</h1> */}
            <img className='container' src={krait} alt="" />
            <div>
                <br />
                <h2>Characteristics</h2>
                <br />
                <p>
                    <h4>Physical Appearance</h4>
                    <p>Dominant Color:The Lesser Black Krait typically exhibits a glossy bluish-black, dark chocolate brown, or dark grey coloration. </p>
                    <p>Distinct Patterns: This species has a patternless body, presenting a uniform coloration without stripes, bands, or blotches.</p>
                    <p>Head Shape:The head is slightly distinct from the neck, with a flattened appearance. </p>
                    <p>Pupil Type:The eyes are small with round pupils.</p>
                    <p>Approximate Size:The Lesser Black Krait is a medium-sized snake, growing up to 102 cm (approximately 1 meter) in length.</p>
                </p>
                <p>
                    <h4>Behavior and Posture</h4>
                    <p>Defensive Posture: When threatened, kraits, including the Lesser Black Krait, may exhibit defensive behaviors such as coiling their bodies and hiding their heads beneath their coils. However, specific defensive postures for this species are not well-documented.
                    </p>
                    <p>Movement:  Kraits generally exhibit straight slithering movement. They are nocturnal and are more active during the night.</p>
                </p>
                <p>
                    <h4>Location and Habitat</h4>
                    <p>Habitat: 
                    The Lesser Black Krait inhabits regions in India, Bangladesh, and Nepal. It is often found in forested areas and grasslands.                     </p>
                    <p>Activity Time:  This species is nocturnal, being primarily active during the night.</p>
                    <p>
                    Geographical Region:
                    The Lesser Black Krait is distributed across parts of India, Bangladesh, and Nepal.
                    </p>
                </p>
                <p>
                    <h4>Additional Features</h4>
                    <p>Visible Fangs: As a venomous elapid, the Lesser Black Krait possesses fangs; however, due to their small size and the snake's general behavior, the fangs are not typically visible.</p>
                    <p>Rattle at Tail End:  the Lesser Black Krait does not have a rattle at the end of its tail.</p>
                    <p>Hood or Neck Expansion: this species does not exhibit hooding or neck expansion.</p>
                </p>
            </div>
        </div>
    );
};

export default Krait;