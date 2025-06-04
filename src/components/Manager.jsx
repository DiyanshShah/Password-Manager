import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
uuidv4();

const Manager = () => {

  const ref = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" })

  const [passwordArray, setPasswordArray] = useState([])
  useEffect(() => {
    const passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
    else {
      //code
    }
  }, [])

  // -----------FUNCTIONS-----------------
  const HandleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] })
  }

  const EditPassword = (id) => {
    console.log(id)
    setForm(passwordArray.filter(item => item.id === id)[0])
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }
  const DeletePassword = (id) => {
    console.log(id);
    setPasswordArray(passwordArray.filter(item => item.id !== id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
  }

  const SavePassword = () => {
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    
    setForm({ site: "", username: "", password: "" })
  }



  const TogglePassword = () => {
    if (ref.current.src.includes("/assets/icons/Show.svg")) {
      ref.current.src = "/assets/icons/Hide.svg";
    }
    else if (ref.current.src.includes("/assets/icons/Hide.svg")) {
      ref.current.src = "/assets/icons/Show.svg";
    }


  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log(`Copied to clipboard: ${text}`);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };


  //----------------Functions-------------------
  return (
    <>
      <div>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <div className="flex flex-col items-center justify-center text-slate-300 my-15 gap-5">
        <div className="text">
          <h1 className='font-bold text-lg border-black '>Add your credentials</h1>
        </div>
        <div className="max-w-[90dvw] flex justify-center items-center gap-4 flex-col md:flex-row md:gap-15">
          <input value={form.site} onChange={HandleChange} className='border-2 border-white rounded-lg py-2 px-5 w-full' type="text" placeholder='Website URL Address' name='site' />
          <input value={form.username} onChange={HandleChange} className='border-2 border-white rounded-lg py-2 px-5 w-full' type="text" placeholder='Username' name='username' />
          <div className="relative w-full">
            <input value={form.password} onChange={HandleChange} className='border-2 border-white rounded-lg py-2 px-5 w-full' type="password" placeholder='Password' name='password' />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={TogglePassword}>
              <img ref={ref} className='w-[20px]' src="/assets/icons/Show.svg" alt="Visibility Toggle" />
            </span>
          </div>

        </div>
        <button onClick={SavePassword} className="bg-slate-700 text-slate-300 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-slate-700 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
          Submit
        </button>
      </div>

      <div className="Passwords flex flex-col items-start max-w-[90dvw] mx-auto">
        <div className="text w-full">
          <h1 className="font-bold text-white text-2xl ml-10 mb-2">Your Passwords</h1>
        </div>
        {passwordArray.length === 0 && <div className='text-white text-lg text-center mx-auto'>No Passwords to show</div>}
        {passwordArray.length !== 0 && 
        <div className="hidden md:block w-full overflow-x-auto">
        <table className="table-auto w-full text-sm text-white rounded-xl overflow-hidden">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3">Website URL</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Password</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {passwordArray.map((item, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-4 py-3 text-center break-all">
                  <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {item.site}
                  </a>
                </td>
                <td className="px-4 py-3 text-center break-all">
                  <div className="flex items-center justify-center gap-2">
                    {item.username}
                    <img
                      onClick={() => handleCopy(item.username)}
                      className="w-[20px] cursor-pointer"
                      src="/assets/icons/Copy.svg"
                      alt="copy"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-center break-all">
                  <div className="flex items-center justify-center gap-2">
                    {item.password}
                    <img
                      onClick={() => handleCopy(item.password)}
                      className="w-[20px] cursor-pointer"
                      src="/assets/icons/Copy.svg"
                      alt="copy"
                    />
                    <img
                      onClick={() => console.log("Testing")}
                      className="w-[20px] cursor-pointer"
                      src="/assets/icons/Hide.svg"
                      alt="hide"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <img
                      onClick={() => EditPassword(item.id)}
                      className="w-[25px] cursor-pointer"
                      src="/assets/icons/Edit.svg"
                      alt="edit"
                    />
                    <img
                      onClick={() => DeletePassword(item.id)}
                      className="w-[25px] cursor-pointer"
                      src="/assets/icons/Delete.svg"
                      alt="delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      {passwordArray.length !== 0 && <div className="md:hidden space-y-4 w-full">
        {passwordArray.map((item, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-xl shadow-md text-white">
            <p className="mb-1"><strong>Website:</strong> <a className="text-blue-400 break-all" href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a></p>
            <p className="mb-1 flex items-center gap-2"><strong>Username:</strong> {item.username}
              <img onClick={() => handleCopy(item.username)} className="w-[20px] cursor-pointer" src="/assets/icons/Copy.svg" alt="copy" />
            </p>
            <p className="mb-1 flex items-center gap-2"><strong>Password:</strong> {item.password}
              <img onClick={() => handleCopy(item.password)} className="w-[20px] cursor-pointer" src="/assets/icons/Copy.svg" alt="copy" />
              <img onClick={() => console.log("Testing")} className="w-[20px] cursor-pointer" src="/assets/icons/Hide.svg" alt="Hide" />
            </p>
            <div className="flex justify-end gap-3 mt-2">
              <img onClick={() => EditPassword(item.id)} className="w-[25px] cursor-pointer" src="/assets/icons/Edit.svg" alt="edit" />
              <img onClick={() => DeletePassword(item.id)} className="w-[25px] cursor-pointer" src="/assets/icons/Delete.svg" alt="delete" />
            </div>
          </div>
        ))}
      </div>}

      </div>
    </>


  )
}

export default Manager
