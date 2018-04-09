import React from 'react';

class Gallery extends React.Component{
  constructor(){
    super();
    this.state= {
      currentIndex: 0,
      slideImageWidth: "",
      slideImageHeight:""
    };
  }

  // getDimensions(){
  //   return({target:img})=>{
  //     this.setState({slideImageHeight:img.offsetHeight,
  //                    slideImageWidth: img.offsetWidth});
  //   };
  // }

  render(){
    const { items }= this.props;
    let slides= [];
    let thumbnails= [];
    items.forEach((item,index)=>{
      const slide = (this.state.currentIndex === index ?
                    <div className="slide">
                      <img className="slide-image" src={item.url} ></img>
                      <h2 className="slide-caption">{item.caption}</h2>
                    </div>
                     : <div className="slide"></div>);
      slides.push(slide);
    });
    return(
      <div className="gallery-wrapper">
        <section className="gallery-upper-slide-warpper">
          {slides}
        </section>
        <section className="gallery-lower-thumbnails-wrapper">
        </section>
      </div>
    );
  }
}

export default Gallery;
