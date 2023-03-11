import Image from 'next/image'
import useRedirectTo from '@/hooks/useRedirectTo'
import ProfileImage from '@Image/profile.jpg'

export default function Chat() {
  const redirectTo = useRedirectTo();

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="flex items-center border-b border-gray-300 px-4 py-3">
          <button className="mr-2" onClick={() => redirectTo('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="font-courgette text-sm">Chatpy</h1>
        </div>
        <div className='h-full overflow-y-scroll bg-teal-400 px-4 pt-6 pb-4'>
          <div className='flex'>
            <p className='mr-4'>
              <Image
                src={ProfileImage}
                alt="SignIn Icon"
                className="h-8 w-8 rounded-full object-cover"
                priority
              />      
            </p>
            <p className='mr-2 rounded bg-white py-1 px-4'>Test</p>
            <p className='mt-auto text-xs text-teal-50'>17:02</p>
          </div>
          <div className='flex justify-end'>
            <p className='mt-auto text-xs text-teal-50'>17:02</p>
            <p className='ml-2 rounded bg-white py-1 px-4'>Test</p>
          </div>
        </div>
        <form className="mt-auto flex items-center justify-between border-t border-gray-400 p-2">
          <input type="text" name="message" id="message" className=" mr-3 w-full rounded-sm border border-gray-500 px-3 py-1 text-sm focus:outline-none"/>
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}