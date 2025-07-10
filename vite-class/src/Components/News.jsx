import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from '../Spinner';
import PropTypes from "prop-types";
export class News extends Component {

static defaultProps = {
  pagesize: 8,
  category: "sports"
};

static propTypes = {
  category: PropTypes.string,
  pagesize: PropTypes.number
};






next=async()=>{
  this.props.setProgress(0);
 let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=fdce84e149f34c77ac57b682efd25052&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
 this.setState({loader:true})
let data=await fetch(url);
let parsedData=await data.json()
console.log(parsedData);
this.setState({
  page:this.state.page+1,
  articles:parsedData.articles,
loader:false,
})
this.props.setProgress(100);
}


prev=async()=>{
  this.props.setProgress(0);
  let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=fdce84e149f34c77ac57b682efd25052&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
  this.setState({loader:true})
let data=await fetch(url);
let parsedData=await data.json()
console.log(parsedData);
this.setState({
  page:this.state.page-1,
  articles:parsedData.articles,
  loader:false,
  })
  this.props.setProgress(100);
}

constructor(){
  super();
  this.state={
 articles:[],
 loader:false,
 page:1
  }
}

async componentDidMount(){
  this.props.setProgress(0);
let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=fdce84e149f34c77ac57b682efd25052&page=1&pagesize=${this.props.pagesize}`;
this.setState({loader:true})
let data=await fetch(url);
let parsedData=await data.json()
console.log(parsedData);
this.setState({articles:parsedData.articles,
loader:false,
})
this.props.setProgress(100);
}
async componentDidUpdate(prevProps) {
  if (prevProps.category !== this.props.category) {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=fdce84e149f34c77ac57b682efd25052&page=1&pagesize=${this.props.pagesize}`;
    this.setState({ loader: true, page: 1 });  
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loader: false
    });
    this.props.setProgress(100);
  }
}

  render() {
    return (
        <div className="container my-3">
          <h1 className="text-center">Newshunt-Top Headlines</h1>
         {this.state.loader&&<Spinner/>}
         <div className="row my-3">
          {!this.state.loader&& this.state.articles.map((element)=>{
           return  <div className="col md-4" key={element.url}>
         <Newsitem  title={element.title} description={element.description?element.description:""} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
       })}
         </div>
         <div className="container d-flex justify-content-between">
         <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.prev}>&larr;Previuos</button>
         <button type="button" className="btn btn-primary" onClick={this.next}>Next&rarr;</button>
         </div>
        </div>
   
    )
  }
}

export default News
