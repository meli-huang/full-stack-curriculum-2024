import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  // Used in bugs 1 and 2
  const [counter, setCounter] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);
  const [time, setTime] = useState(0);

  // Used in bug 3
  const [name, setName] = useState({
    fname: "Clark",
    lname: "Kent"
  });


  // 1. We want to increase the counter by one on render, why does it increase by more than one?
  useEffect(() => {
    // setCounter(counter + 1);
    console.log("Counter variable is: ", counter);
  }, [counter]);

  // Answer: this is just an infinite loop again; cannot call setCounter inside of useEffect bc it triggers another call of useEffect, which runs setCounter again, and so on and so forth...
  // Solution: either comment out setCounter entirely OR use a [] so that it only renders on first render


  // 2. We want to log out the value of counterTwo after we increase it, why doesn't it log the new value?
  // How would you log the new value rather than the old one?
  const setCountValue = () => {
    setCounterTwo(counterTwo + 1);
    // console.log("Counter Two Value is ", counterTwo); // Bug 2: It logs the old state value
  };

  useEffect(() => {
    console.log("Counter Two Value is ", counterTwo);
  }, [counterTwo]);

  // Answer: the console log uses the original value of counterTwo since setCounterTwo has only been "queued"
  // Solution: move console.log value into useEffect, make dependency variable counterTwo



  // 3. Here, we have a function to change the "name" state variable, why doesn't it work?
  // 3.1. Bonus: if you click "Change name" then click "Increase Count Two", the name changes magically
  // Answer: this is b/c clicking "Change name" changes the data in the backend but has not 
  // logged these modifications into state for the frontend. 
  const changeName = () => {
    // Bug 3: Directly trying to modify the state object
    // name.fname = "Bruce";
    // name.lname = "Wayne";
    setName({fname: "Bruce", lname: "Wayne"});
  };

  // Answer: cannot modify state variables directly; must use the setting function with a parameter of the new object to replace it entirely


  // 4. We want to increase the counter by one every second, but it displays NaN
  useEffect(() => {
  const interval = setInterval(() => {
      setTime(time + 1);
    }, 1000);

  return () => clearInterval(interval);
  }, [time]);

  // Solutions: can set dependency array to [time] OR can still only call useEffect once at first render but call "setTime((prevTime) => prevTime + 1);"
  // For [time]: less time efficient bc must manually run every second
  // For []: good for smth that has a singular setup and has constant performance in the bg

  return (
    <div className="App">
      <h1>Bug Hunting: React Edition</h1>
      <button onClick={setCountValue}>Increase Count Two</button>
      <button onClick={changeName}>Change Name</button>
      {/* 5. Why does the following code cause an infinite loop ? */}
      <button onClick={() => setCounter(counter + 1)}>
        Stupid Button
      </button>{" "}

      {/* Answer: if just "onClick={setCounter(counter + 1)}, this is NOT a reference to the function but rather triggers a run of setCounter; when code runs, it rerenders the page; then button calls it yet again when HTML read up to this point again. */}
      <h3>Counter One: {counter}</h3>
      <h3>Counter Two: {counterTwo}</h3>
      <h3>Name is : {name.fname + " " + name.lname}</h3>
      <h3>Time is : {time}</h3>
    </div>
  );
}
