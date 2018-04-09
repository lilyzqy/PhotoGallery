import React from 'react';

class Gallery extends React.Component{
  constructor(){
    super();
    this.state= {
      currentIndex: 0
    };
  }

  // getDimensions(){
  //   return({target:img})=>{
  //     this.setState({slideImageHeight:img.offsetHeight,
  //                    slideImageWidth: img.offsetWidth});
  //   };
  // }
  onClick(index){
    return() => {
      this.setState({currentIndex:index});
    };
  }

  swipeLeft(){
    let nextIndex = this.state.currentIndex - 1;
    if(nextIndex < 0){
      nextIndex = this.props.items.length - 1;
    }
    return() => {
      this.setState({currentIndex: nextIndex},()=>{console.log(this.state);});
    };
  }

  swipeRight(){
    let nextIndex = this.state.currentIndex + 1;
    if(nextIndex > this.props.items.length - 1){
      nextIndex = 0;
    }
    return() => {
      this.setState({currentIndex: nextIndex},()=>{console.log(this.state);});
    };
  }


  render(){
    const { items }= this.props;
    let slides= [];
    let thumbnails= [];
    items.forEach((item,index)=>{
      const slide = (this.state.currentIndex === index ?
                    <li className="slide">
                      <img className="slide-image" src={item.url} ></img>
                      <h2 className="slide-caption">{item.caption}</h2>
                    </li>
                     : <li className="slide"></li>);
      slides.push(slide);
      const thumbnail = (<li
                        key={index}
                        className="thumbnail"
                        onClick={this.onClick(index)}>
                          <img className="thumbnail-image" src={item.url}></img>
                        </li>);
      thumbnails.push(thumbnail);
    });
    return(
      <div className="gallery-wrapper">
        <section className="gallery-upper-slide-warpper">
          <div className="swipe-arrows">
            <div className="left-arrow" onClick={this.swipeLeft()}>
            <i className="fas fa-chevron-left"></i>
            </div>
            <div className="right-arrow" onClick={this.swipeRight()}>
            <i className="fas fa-chevron-right"></i>
            </div>
          </div>
          <ul className="slides-ul">
          {slides}
          </ul>
        </section>
        <section className="gallery-lower-thumbnails-wrapper">
          <ul className="thumbnails-ul">
          {thumbnails}
          </ul>
        </section>
      </div>
    );
  }
}

export default Gallery;
