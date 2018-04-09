import React from 'react';

class Gallery extends React.Component{
  constructor(){
    super();
    this.state= {
      currentIndex: 0,
      startX:0,
      beingTouched:false,
      thumbnailsWidth:0,
      offset:0
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
      const imgWid=this.thumbnailsWrapper.offsetWidth;
      const mid = imgWid/this.img.offsetWidth/2;
      const { currentIndex } = this.state;
      let transX;
      if(index > mid && currentIndex === 0){
        transX = (index - mid)* imgWid;
      }else if(index !== currentIndex){
        transX = (index - currentIndex)* imgWid;
      }
      this.setState({style:{transform: `translate(-${transX}px,0)`}});
      this.setState({currentIndex:index,thumbnailsWidth:this.thumbnailsWrapper.offsetWidth});
    };
  }

  swipeLeft(){
    let nextIndex = this.state.currentIndex - 1;
    if(nextIndex < 0){
      nextIndex = this.props.items.length - 1;
    }
    this.setState({currentIndex: nextIndex,thumbnailsWidth:this.thumbnailsWrapper.offsetWidth});
  }

  swipeRight(){
    let nextIndex = this.state.currentIndex + 1;
    if(nextIndex > this.props.items.length - 1){
      nextIndex = 0;
    }
    this.setState({currentIndex: nextIndex,thumbnailsWidth:this.thumbnailsWrapper.offsetWidth});
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
                        key={index}
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
                          <img className="thumbnail-image"
                               src={item.url}
                               ref={el=>{this.img=el;}}></img>
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
        <section className="gallery-lower-thumbnails-wrapper"
                 ref={el=>{this.thumbnailsWrapper=el;}}
                 >
          <ul className="thumbnails-ul"
              style={this.state.style}>
            {thumbnails}
          </ul>
        </section>
      </div>
    );
  }
}

export default Gallery;
