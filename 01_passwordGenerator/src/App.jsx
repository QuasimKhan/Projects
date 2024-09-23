import { useCallback, useState , useEffect} from "react";
import "./App.css";

function App() {
  let [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
 const [isCopied, setIsCopied] = useState(false);
  

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

  };


  const generatePassword = useCallback(() => {
    let pass = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (charAllowed) {
      str += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    if (numberAllowed) {
      str += '0123456789';
    }

    for (let i = 0; i < lenght; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [lenght, numberAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [lenght, numberAllowed, charAllowed])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-3xl font-bold mb-2 text-center">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          className="w-full px-3 py-1 outline-none"
          type="text"
          placeholder="password"
          value={password}
          readOnly
        />
        {
          isCopied ? <button
          className="bg-green-400 text-white px-3 py-1"
          onClick={copyPassword}
          >Copied</button> : <button
          className="bg-gray-700 px-3 py-1"
          onClick={copyPassword}
          >Copy</button>
        }
        
      </div>

      <div className="flex items-center gap-x-2">
      <div className="flex text-sm items-center gap-x-1">
          <input 
          type="range" 
          min={8}
          max={100}
          value={lenght}
          className="cursor-pointer"
          onChange={(e) => setLenght(e.target.value)}
          name="" 
          id="" />
          <label htmlFor="length">Lenght : {lenght}</label>
      </div>

      <div className="flex items-center gap-x-1 cursor-pointer">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() =>{
            setNumberAllowed((prev) => !prev)
          }} 
          name="" 
          id="number" />
          <label htmlFor="number" className="cursor-pointer">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1 cursor-pointer">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() =>{
            setCharAllowed((prev) => !prev)
          }} 
          name="char" 
          id="char" />
          <label htmlFor="char" className="cursor-pointer">Character</label>
      </div>

      </div>

      
    </div>
  );
}

export default App;
