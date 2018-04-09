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
    return ()=>{
      this.setState({currentIndex:index},()=>{console.log(this.state);});
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
        <ul className="gallery-upper-slide-warpper">
          {slides}
        </ul>
        <ul className="gallery-lower-thumbnails-wrapper">
          {thumbnails}
        </ul>
      </div>
    );
  }
}

export default Gallery;
