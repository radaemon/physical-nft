import React from 'react'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: "Hold On, We're Going Home",
    artist: 'Drake',
    href: '#',
    imageSrc:
      'https://www.udiscovermusic.com/wp-content/uploads/2018/09/Drake-Nothing-Was-The-Same-deluxe-album-cover-web-optimised-820.jpg',
    imageAlt: '',
    price: '100 ETH',
  },
]

const BiddingCard = () => {
  return (
    <div className='bg-black rounded-md'>
      {products.map((product) => (
        <div key={product.id} className='group relative'>
          <div className='w-full min-h-80 bg-gray-100 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-50 lg:aspect-none'>
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              className='w-full h-full object-center object-cover lg:w-full lg:h-full'
              width='100%'
              height='100%'
              layout='responsive'
              objectFit='contain'
            />
          </div>
          <div className='mt-4 flex justify-between'>
            <div className='pl-5'>
              <a href={product.href}>
                <span aria-hidden='true' className='absolute inset-0' />
                <p className='text-md font-extrabold text-white'>
                  {product.name}
                </p>
                <p className='text-sm text-white pb-5'>{product.artist}</p>
                <p className='text-md text-gray-500'>Current bid</p>
                <p className='text-sm font-medium text-white pb-5'>
                  {product.price}
                </p>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BiddingCard
