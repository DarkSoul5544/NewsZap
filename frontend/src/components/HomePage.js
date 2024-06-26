import React from 'react'
import news from "./uploads/logo.png"

export default function HomePage() {

  return (
    <div>
      <div  id='home'>
<div className="container_content">
<div className="container_content_inner">
<div className="title">
  <h1>𝓝𝓮𝔀𝓼𝓩𝓪𝓹</h1>
</div>
<div className="par">
<p>
NewsZap is a top news website that offers the latest news and updates from around the world. We are committed to providing our readers with accurate, timely, and unbiased news coverage.</p>
</div>
<div className="btns">
<a href='/news' className='btn btn-primary' > Explore Now </a>
</div>
<div className="btns">
{/* <a href='/headlines' className='btn btn-primary my-4' > HeadLines </a> */}
</div>
</div>
</div>
 <div className="container_outer_img">
 <div className="img-inner">
 <img src={news}  alt="" className="container_img"/>
       </div>
     </div>
  </div>
<div className="overlay"></div>
    </div>
  )
}