import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const SignIn = () => {

    const navi = useNavigate();
    const [teacher, setTeacher] = useState(false);
    const [id, setId] = useState('');
    const password = 'Changeme@123';
    const [response, setResponse] = useState(null);

  const handleLogin = async (event) => {
    const url = 'http://localhost:8000/api/user/login/';
    const body = {
      id: id,
      user_type: teacher? "staff" :"student",
      password: password
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.token);
    } catch (error) {
      console.error('There was an error with the request:', error);
    }
    
  };

  useEffect( () => {
      if(response){
      localStorage.setItem("jwt",JSON.stringify(response));
      localStorage.setItem("teacher",JSON.stringify(teacher));
      navi("home");
    }}, [response,teacher,navi] )

  

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                <p className="dark:text-slate-100 font-medium text-lg inline-flex items-center">Read more about our app 
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </p>
            </div>
            <div>
                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Sign in to Flowbite
                    </h2>
                    <form className="mt-8 space-y-6" action="/">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your id</label>
                            <input onChange={(e) => setId(e.target.value)} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="231801031 or CS123" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" name="remember" onChange={() => setTeacher(!teacher)} type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="ms-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-500 dark:text-gray-400">Are you a Teacher ?</label>
                            </div>
                        </div>
                        <p onClick={(e) => handleLogin(e)} className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
    }
