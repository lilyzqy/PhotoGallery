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

  changeSlide(index){
    const imgWid=this.thumbnailsWrapper.offsetWidth;
    const mid= Math.ceil(imgWid/this.img.offsetWidth/2);
    let { currentIndex, offset }= this.state;
    if(index> mid && index< (this.props.items.length- mid+ 4)){
      if(offset === 0){
        offset= (mid - index);
      }else{
        offset= (offset+ currentIndex- index);
      }
    }else if(index < mid){
      offset= 0;
    }
    this.setState({style:{transform: `translate(${offset* imgWid/10}px,0)`},
                   currentIndex:index,
                   offset:offset});
  }

  handleClick(index){
    return() => {
      this.changeSlide(index);
    };
  }

  handleSwipe(e,dir){
    if(e && !dir){
      dir= e.currentTarget.className=== "left-arrow" ? "left" : "right";
    }
    const delta= dir=== "left"? -1:1;
    let nextIndex= this.state.currentIndex+ delta;
    if(nextIndex< 0){
      nextIndex= this.props.items.length- 1;
    }else if(nextIndex> this.props.items.length- 1){
      nextIndex= 0;
    }
    this.changeSlide(nextIndex);
  }

  handleSwipeStart(){
    return(event)=>{
      this.setState({startX:event.clientX,
                     beingTouched:true});
    };
  }

  handleSwipeEnd(){
    return(event)=>{
      const endX= event.clientX;
      const { startX }= this.state;
      const deltaX= startX- endX;
      const swipeDir= (this.state.beingTouched && deltaX> 0) ? "left" : "right";
      this.handleSwipe(undefined,swipeDir);
      this.setState({beingTouched:false});
    };
  }


  render(){
    const { items }= this.props;
    let slides= [];
    let thumbnails= [];
    items.forEach((item,index)=>{
      const isCurrent = this.state.currentIndex === index;
      const slide= ( isCurrent?
                    <li className="slide"
                        key={index}
                        onMouseDown={this.handleSwipeStart()}
                        onMouseUp={this.handleSwipeEnd()}
                        onTouchStart={this.handleSwipeStart()}
                        onTouchEnd={this.handleSwipeEnd()}>
                      <img className="slide-image" src={item.url} ></img>
                      <h2 className="slide-caption">{item.caption}</h2>
                    </li>
                     : <li className="slide"></li>);
      slides.push(slide);
      const selectedClass= isCurrent ? "selected" : "";
      const thumbnail= (<li
                        key={index}
                        className={"thumbnail "+ selectedClass}
                        onClick={this.handleClick(index)}>
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
            <div className="left-arrow" onClick={this.handleSwipe.bind(this)}>
            <i className="fas fa-chevron-left"></i>
            </div>
            <div className="right-arrow" onClick={this.handleSwipe.bind(this)}>
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
