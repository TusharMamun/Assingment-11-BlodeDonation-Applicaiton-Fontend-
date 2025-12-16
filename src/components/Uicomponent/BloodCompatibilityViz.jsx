import React, { useMemo, useRef, useState } from "react";

const BLOOD_TYPES = {
  "O−": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A−": ["A−", "A+", "AB−", "AB+"],
  "A+": ["A+", "AB+"],
  "B−": ["B−", "B+", "AB−", "AB+"],
  "B+": ["B+", "AB+"],
  "AB−": ["AB−", "AB+"],
  "AB+": ["AB+"],
};

const ORDER = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function BloodCompatibilityViz() {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [viaWidths, setViaWidths] = useState(() => Array(ORDER.length).fill(0));
  const [highlightText, setHighlightText] = useState(() =>
    Array(ORDER.length).fill(false)
  );
  const [bagHeight, setBagHeight] = useState(100);
  const [centerViaHeight, setCenterViaHeight] = useState(0);

  const runIdRef = useRef(0);

  const keyToIndex = useMemo(() => {
    const m = new Map();
    ORDER.forEach((k, i) => m.set(k, i));
    return m;
  }, []);

  const reset = () => {
    runIdRef.current += 1; // cancel animation
    setSelectedDonor(null);
    setViaWidths(Array(ORDER.length).fill(0));
    setHighlightText(Array(ORDER.length).fill(false));
    setBagHeight(100);
    setCenterViaHeight(0);
  };

  const animateDonor = async (donor) => {
    const myRun = ++runIdRef.current;

    setSelectedDonor(donor);
    setViaWidths(Array(ORDER.length).fill(0));
    setHighlightText(Array(ORDER.length).fill(false));

    const recipients = BLOOD_TYPES[donor] || [];

    for (const r of recipients) {
      if (runIdRef.current !== myRun) return;

      const idx = keyToIndex.get(r);
      const row = Math.floor(idx / 2);

      const newCenter = 50 + 50 * row;
      const newBag = 125 - 25 * row;

      setBagHeight(newBag);
      setCenterViaHeight(newCenter);

      await sleep(100);
      if (runIdRef.current !== myRun) return;

      setViaWidths((prev) => {
        const next = [...prev];
        next[idx] = 100;
        return next;
      });

      setHighlightText((prev) => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    }
  };

  return (
    <div className="w-full bg-[#f7f7f7] font-sans overflow-x-hidden rounded-3xl border shadow-sm">
      <style>{css}</style>

      <div id="content" className="mx-auto">
        <h3 className="text-slate-900 font-bold">Select the donor blood type:</h3>

        <div id="blood_selector" role="list">
          {ORDER.map((bt) => (
            <div
              key={bt}
              role="listitem"
              className={selectedDonor === bt ? "highlight" : ""}
              onClick={() => animateDonor(bt)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") animateDonor(bt);
              }}
              tabIndex={0}
              aria-label={`Select donor blood type ${bt}`}
            >
              {bt}
            </div>
          ))}
        </div>

        <button type="button" className="resetBtn" onClick={reset}>
          Reset
        </button>

        <div id="blood_content" aria-hidden="true">
          <div className="bar" />
          <div className="main_bag">
            <div className="blood" style={{ height: `${bagHeight}px` }} />
          </div>
        </div>

        <div id="center_via_c" aria-hidden="true">
          <div className="center_via">
            <div className="blood_via" style={{ height: `${centerViaHeight}px` }} />
          </div>
        </div>

        <div id="humans">
          {ORDER.map((bt, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <div key={bt} className={`human ${side}`}>
                <div className="scribble">
                  <span className={highlightText[i] ? "blood_type highlightText" : "blood_type"}>
                    {bt}
                  </span>
                  <div className="head" />
                  <div className="body" />
                </div>
                <div className="via" />
                <div className="blood_via" style={{ width: `${viaWidths[i]}%` }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const css = `
  #content { position: relative; margin: 30px auto; width: 600px; height: 600px; }
  h3 { position: absolute; top: 0; left: 0; }

  #blood_selector{
    display:grid; grid-template-columns:repeat(4,1fr);
    grid-template-rows:1fr 1fr; grid-gap:5px;
    width:200px; height:100px; position:absolute; left:10px; top:45px; z-index:2;
  }
  #blood_selector div{
    user-select:none; display:flex; align-items:center; justify-content:center;
    background-color:#f7f7f7; border:1px solid #b51e23; border-radius:25%; outline:none;
  }
  #blood_selector div:hover{ border:1px solid #1da1f2; font-weight:bold; cursor:pointer; }
  .resetBtn{
    position:absolute; left:10px; top:155px; z-index:3; padding:8px 12px;
    border-radius:12px; border:1px solid rgba(0,0,0,0.12); background:white; cursor:pointer;
  }
  #blood_content{ position:absolute; top:50px; width:100%; height:100%; }
  #center_via_c{ position:absolute; z-index:1; width:100%; height:100%; }
  #center_via_c .center_via{
    width:8px; background:#ccc; height:200px; position:absolute; left:304px; top:276px;
  }
  #center_via_c .blood_via{
    height:0; background-color:#b51e23; right:50%; width:8px; transition:height .25s;
  }
  .bar{
    position: fixed; right:0; top:55px; width:55%; height:8px;
    border-radius:2px 0 0 2px; background-color:#ccc;
  }
  .main_bag{
    position:absolute; width:100px; height:140px; top:70px; left:250px;
    border-radius:30px; opacity:.8; background-color:rgba(154,207,234,.9);
    border:8px solid rgba(154,207,234,.9);
  }
  .main_bag .blood{
    position:absolute; left:0; bottom:0; width:100%;
    background-color:#b51e23; border-radius:0 0 35px 35px; transition:height 1s;
  }
  .main_bag .blood::before{
    content:""; position:absolute; top:-6px; width:100%; height:10px;
    background-color:#92191b; border-radius:100%;
  }
  .main_bag::before{
    content:""; position:absolute; top:-118px; left:45%; width:10%; height:110px; background-color:#ccc;
  }
  #humans{
    position:absolute; top:276px; width:400px; height:200px; left:108px;
    display:grid; grid-template-columns:1fr 1fr; grid-template-rows:repeat(4,1fr);
  }
  #humans .human{ position:relative; }
  #humans .human .via{
    position:absolute; width:100%; height:8px; background-color:#ccc; bottom:0;
  }
  #humans .human .blood_via{
    position:absolute; height:8px; background-color:#b51e23; width:0; bottom:0; transition:width 1s;
  }
  #humans .human.left{ display:grid; justify-content:left; align-content:center; }
  #humans .human.left .blood_via{ right:0; }
  #humans .human.left .scribble{ left:-30px; }
  #humans .human.left .scribble span{ left:-40px; text-align:right; }
  #humans .human.right{ display:grid; justify-content:right; align-content:center; }
  #humans .human.right .scribble{ right:-60px; }
  #humans .human.right .scribble span{ right:-10px; }

  #humans .human .scribble{ position:absolute; height:50px; width:50px; top:0; transition:background 1s; }
  #humans .human .scribble span{ position:absolute; display:grid; align-items:end; height:100%; }
  #humans .human .scribble .head{
    width:30%; height:30%; background-color:#666; border-radius:50%;
    margin:2px auto; transition:background 1s; position:absolute; top:30%; left:5%;
  }
  #humans .human .scribble .body{
    position:absolute; bottom:0; width:40%; height:30%; background-color:#666;
    border-radius:50% 50% 0 0; margin:0 auto; transition:background 1s;
  }
  .highlight{ border:2px solid #b51e23 !important; font-weight:bold; }
  .highlightText{ font-weight:bold; }

  @media only screen and (max-width: 700px){
    #content { width: 360px; height: 520px; margin: 20px auto; }
    #blood_selector { width: 170px; height: 85px; font-size: .85em; }
    .main_bag { left: 145px; }
    #center_via_c .center_via { left: 187px; }
    #humans { left: 55px; width: 250px; }
  }

  @media only screen and (max-width: 400px){
    #content { width:300px; height:460px; }
    #blood_selector { width:150px; height:75px; font-size:.75em; }
    .main_bag { width:75px; height:105px; left:125px; }
    .main_bag::before { top:-108px; height:100px; }
    #center_via_c .center_via { left:167px; top:240px; }
    #humans { top:240px; width:180px; left:85px; }
    .resetBtn { top:135px; }
  }
`;
