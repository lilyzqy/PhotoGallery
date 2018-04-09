import React from 'react';

class Gallery extends React.Component{
  constructor(){
    super();
    this.state= {
      currentIndex: 0,
      startX:0,
      beingTouched:false
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
    this.setState({currentIndex: nextIndex});
  }

  swipeRight(){
    let nextIndex = this.state.currentIndex + 1;
    if(nextIndex > this.props.items.length - 1){
      nextIndex = 0;
    }
    this.setState({currentIndex: nextIndex});
  }

  handleSwiptStart(){
    return(event)=>{
      this.setState({startX:event.clientX,
                     beingTouched:true});
    };
  }

  handleSwiptEnd(){
    return(event)=>{
      const endX = event.clientX;
      const { startX }= this.state;
      const deltaX = startX - endX;
      const swipeDir = (this.state.beingTouched && deltaX > 0) ? "left" : "right";
      if(swipeDir=== "left"){
        this.swipeLeft();
        this.setState({beingTouched:false});
      }else if (swipeDir=== "right") {
        this.swipeRight();
        this.setState({beingTouched:false});
      }
    };
  }


  render(){
    const { items }= this.props;
    let slides= [];
    let thumbnails= [];
    items.forEach((item,index)=>{
      const isCurrent = this.state.currentIndex === index;
      const slide = ( isCurrent?
                    <li className="slide"
                        onMouseDown={this.handleSwiptStart()}
                        onMouseUp={this.handleSwiptEnd()}
                        onTouchStart={this.handleSwiptStart()}
                        onTouchEnd={this.handleSwiptEnd()}>
                      <img className="slide-image" src={item.url} ></img>
                      <h2 className="slide-caption">{item.caption}</h2>
                    </li>
                     : <li className="slide"></li>);
      slides.push(slide);
      const selectedClass = isCurrent ? "selected" : "";
      const thumbnail = (<li
                        key={index}
                        className={"thumbnail "+ selectedClass}
                        onClick={this.onClick(index)}>
                          <img className="thumbnail-image" src={item.url}></img>
                        </li>);
      thumbnails.push(thumbnail);
    });
    return(
      <div className="gallery-wrapper">
        <section className="gallery-upper-slide-warpper">
          <div className="swipe-arrows">
            <div className="left-arrow" onClick={this.swipeLeft.bind(this)}>
            <i className="fas fa-chevron-left"></i>
            </div>
            <div className="right-arrow" onClick={this.swipeRight.bind(this)}>
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
