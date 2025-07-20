import React from 'react';
import GreenpitviperImg from "../../../assets/images/GreenPitviper.jpg"
import "./SD.css"
const GreenPitVipers = () => {
    return (
        <div className='backish'>
            {/* <h1>Krait Snakes: A Fascinating Journey into Their Traits and Perils</h1> */}
            <img className='container' src={GreenpitviperImg} alt="" />
            <div>
                <br />
                <h2>Characteristics</h2>
                <br />
                <p>
                    <h4>Physical Appearance</h4>
                    <p>Dominant Color:As their name suggests, Green Pit Vipers predominantly exhibit a bright green coloration, which aids in camouflage within their arboreal habitats.</p>
                    <p>Distinct Patterns:Some species may display additional markings. For instance, Trimeresurus salazar males have a reddish-orange and yellow stripe along the head and body. 
                    </p>
                    <p>Head Shape: These vipers possess a distinct triangular or arrow-shaped head, characteristic of many venomous snakes.</p>
                    <p>Pupil Type: They have vertical, elliptical pupils, an adaptation common among nocturnal predators.</p>
                    <p>Approximate Size:Green Pit Vipers are generally medium-sized snakes, with lengths varying among species, typically ranging from 60 cm to over 1 meter.</p>
                </p>
                <p>
                    <h4>Behavior and Posture</h4>
                    <p>Defensive Posture:  When threatened, they may exhibit defensive behaviors such as coiling and striking. However, many species are known to be relatively sluggish and may prefer to remain motionless, relying on their camouflage
                    </p>
                    <p>Movement:  Primarily arboreal, they navigate through trees and shrubs with ease but can also descend to the ground in search of prey.</p>
                </p>
                <p>
                    <h4>Location and Habitat</h4>
                    <p>Habitat:  Green Pit Vipers inhabit tropical and subtropical regions, often found in forests, grasslands, and near water sources. They are arboreal, frequently residing in trees and shrubs.</p>
                    <p>Activity Time: These snakes are primarily nocturnal, hunting and being most active during the night. </p>
                    <p>
                    Geographical Region:Their range includes parts of South and Southeast Asia, with different species distributed across various countries in the region.
                    
                    </p>
                </p>
                <p>
                    <h4>Additional Features</h4>
                    <p>Visible Fangs: As venomous vipers, they possess prominent fangs; however, these are typically folded against the roof of the mouth and not visible unless the snake is striking.</p>
                    <p>Rattle at Tail End:  Green Pit Vipers do not have a rattle at the end of their tails </p>
                    <p>Hood or Neck Expansion: they do not exhibit hooding or neck expansion; this trait is more characteristic of cobras.</p>
                </p>
            </div>
        </div>
    );
};

export default  GreenPitVipers ;