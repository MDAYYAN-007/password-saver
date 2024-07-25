import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 flex items-center text-white h-12 justify-around w-full fixed top-0 z-10'>
        <h1 className='text-xl'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>Keeper/&gt;</span></h1>
        <a href="https://www.instagram.com/mddayyan007/" target='_blank' rel="noopener noreferrer"><button className='p-1 border-white border-2 rounded-full'><i class="fab fa-instagram"></i>Follow</button></a>
    </nav>
  )
}

export default Navbar