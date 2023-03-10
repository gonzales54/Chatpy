import useRedirectTo from '@/hooks/useRedirectTo'
import ProfileImage from '@Image/profile.jpg'
import Image from 'next/image'

export default function chat() {
  const redirectTo = useRedirectTo();

  return (
    <>
      <div className="h-screen w-full flex flex-col">
        <div className="px-4 py-3 flex items-center border-b border-gray-300">
          <button className="mr-2" onClick={() => redirectTo('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="font-courgette text-xs">Chatpy</h1>
        </div>
        <div className='h-full pt-6 pb-4 px-4 bg-teal-400 overflow-y-scroll'>
          <div className='flex'>
            <p className='mr-4'>
              <Image
                src={ProfileImage}
                alt="SignIn Icon"
                className="w-8 h-8 rounded-full object-cover"
                priority
              />      
            </p>
            <p className='mr-2 py-1 px-4 rounded bg-white'>Test</p>
            <p className='mt-auto text-teal-50 text-xs'>17:02</p>
          </div>
          <div className='flex justify-end'>
            <p className='mt-auto text-teal-50 text-xs'>17:02</p>
            <p className='ml-2 py-1 px-4 rounded bg-white'>Test</p>
          </div>
        </div>
        <form className="mt-auto px-2 py-2 flex justify-between items-center border-t border-gray-400">
          <input type="text" name="message" id="message" className="w-full mr-3 px-3 py-1 border border-1 border-gray-500 rounded-sm text-sm focus:outline-none"/>
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}