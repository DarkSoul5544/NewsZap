import React from 'react'
import "./home.css"
import news from "./uploads/logo.png"

export default function HomePage() {

  return (
    <div>
      <div  id='home'>
<div class="container_content">
<div class="container_content_inner">
<div class="title">
  <h1>NewsZap</h1>
</div>
<div class="par">
<p>
NewsZap is a top news website that offers the latest news and updates from around the world. We are committed to providing our readers with accurate, timely, and unbiased news coverage.</p>
</div>
<div class="btns">
<a href='/news' class='btn btn-primary' > News </a>
</div>
</div>
</div>
 <div class="container_outer_img">
 <div class="img-inner">
 <img src={news}  alt="" class="container_img"/>
       </div>
     </div>
  </div>
<div class="overlay"></div>
    </div>
  )
}