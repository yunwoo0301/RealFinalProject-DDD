import React from "react";
import ExhibitionDetails from './ExhibitionDetails';
import ExhibitionLocation from './ExhibitionLocation';
import ExhibitionReview from './ExhibitionReview';
const menuSelect = (name,data) => {
    switch(name){
        case "menu1" : 
        return <ExhibitionDetails data={data}/>;
       
        case "menu2" : 
        return <ExhibitionLocation data={data}/>;
       
        case "menu3" : 
        return <ExhibitionReview data={data}/>;
        default: return'';
    }
}

const Section= ({category,data}) => {
    return(
        <div>
        {menuSelect(category,data)}
        </div>
    );
}

export default Section;