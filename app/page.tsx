
// import BookComponent from '@/components/book/bookComponent'
import CaruselUsage from '@/components/carousel/CaruselUsage'
import ChatComp from '@/components/chat/chatComp'
import Footer from '@/components/footer/page'
// import Footer from '@/components/footer'
import Hero from '@/components/hero/Hero'
import ImgeSlider from '@/components/carousel/ImgeSlider'
import Navbar2 from '@/components/navbar/navbar2'
import Navbar from '@/components/page'
import Section4 from '@/components/section/section4'
import Section5 from '@/components/section/section5'
// import Section6 from '@/components/section/section6'
import React from 'react'

export default function page() {
  return (
    <div className='overflow-hidden'>
      <Hero/>
      <CaruselUsage />
      <ImgeSlider />
      <Section4/>
      <ChatComp/>
      <Footer/> 
     
    </div>
  )
}
