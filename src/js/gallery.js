import React from 'react';

class Gallery extends React.Component{
  constructor(){
    super();
    this.state= {
      currentIndex: 0,
    };
  }

  render(){
    const { items }= this.props;
    let slides= [];
    let thumbnails= [];
    items.forEach((item,index)=>{
      const selectedClass= this.state.currentIndex === index ? "selected" : "";
      const photo = this.state.currentIndex === index ? <img src={item.url}></img> : <div></div>;
      const slide = (<div className={"slide "+ selectedClass}>
                       {photo}
                     </div>);
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
