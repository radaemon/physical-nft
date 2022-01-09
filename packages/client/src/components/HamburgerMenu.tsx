import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import { IoMenu } from 'react-icons/io5'
import DivLink from './DivLink'

export default function HamburgerMenu() {
  return (
    <Menu as='div' className='md:hidden'>
      <Menu.Button as='button' className='p-6'>
        <IoMenu />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute text-center ml-auto mr-auto right-0 mt-1 rounded-md shadow-md ring-opacity-5 w-56'>
          <div className='px-1 py-1 '>
            <Menu.Item>
              <DivLink title='Explore' to='/explore' />
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              <DivLink title='Account' to='/account' />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}