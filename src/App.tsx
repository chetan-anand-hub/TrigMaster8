import React, { useState } from "react";
import "./styles.css";

const radians = (deg: number) => (deg * Math.PI) / 180;
const toFixed = (num: number, dec = 2) => parseFloat(num.toFixed(dec));

export default function App() {
  const [angle, setAngle] = useState<number>(0);
  const rad = radians(angle);

  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.abs(cos) < 0.0001 ? Infinity : Math.tan(rad);
  const cot = Math.abs(sin) < 0.0001 ? Infinity : cos / sin;
  const sec = Math.abs(cos) < 0.0001 ? Infinity : 1 / cos;
  const csc = Math.abs(sin) < 0.0001 ? Infinity : 1 / sin;

  const quadrant = angle < 90 ? 1 : angle < 180 ? 2 : angle < 270 ? 3 : 4;

  return (
    <div className="App">
      <h1>TrigMaster Visualizer v3</h1>
      <input
        type="range"
        min="0"
        max="360"
        value={angle}
        onChange={(e) => setAngle(Number(e.target.value))}
      />
      <p>
        <strong>Angle: {angle}°</strong>
      </p>
      <p>
        sin: {toFixed(sin)}, cos: {toFixed(cos)}, tan:{" "}
        {tan === Infinity ? "∞" : toFixed(tan)}
      </p>
      <p>
        cosec: {csc === Infinity ? "∞" : toFixed(csc)}, sec:{" "}
        {sec === Infinity ? "∞" : toFixed(sec)}, cot:{" "}
        {cot === Infinity ? "∞" : toFixed(cot)}
      </p>

      <h3>Quadrant: {quadrant}</h3>

      <div className="graph-section">
        {["sin", "cos", "tan", "sec", "cosec", "cot"].map((fn) => {
          const values = Array.from({ length: 361 }, (_, deg) => {
            const r = radians(deg);
            switch (fn) {
              case "sin":
                return 50 - Math.sin(r) * 40;
              case "cos":
                return 50 - Math.cos(r) * 40;
              case "tan":
                const t = Math.tan(r);
                return Math.abs(Math.cos(r)) < 0.0001
                  ? null
                  : 50 - Math.max(-2, Math.min(2, t)) * 20;
              case "sec":
                const sec = 1 / Math.cos(r);
                return Math.abs(Math.cos(r)) < 0.0001
                  ? null
                  : 50 - Math.max(-2, Math.min(2, sec)) * 20;
              case "cosec":
                const csc = 1 / Math.sin(r);
                return Math.abs(Math.sin(r)) < 0.0001
                  ? null
                  : 50 - Math.max(-2, Math.min(2, csc)) * 20;
              case "cot":
                const cot = Math.cos(r) / Math.sin(r);
                return Math.abs(Math.sin(r)) < 0.0001
                  ? null
                  : 50 - Math.max(-2, Math.min(2, cot)) * 20;
              default:
                return null;
            }
          });

          const strokeColors: any = {
            sin: "blue",
            cos: "green",
            tan: "orange",
            sec: "purple",
            cosec: "teal",
            cot: "red",
          };

          const markerY =
            fn === "sin"
              ? 50 - sin * 40
              : fn === "cos"
              ? 50 - cos * 40
              : fn === "tan"
              ? 50 - Math.max(-2, Math.min(2, tan)) * 20
              : fn === "sec"
              ? 50 - Math.max(-2, Math.min(2, sec)) * 20
              : fn === "cosec"
              ? 50 - Math.max(-2, Math.min(2, csc)) * 20
              : 50 - Math.max(-2, Math.min(2, cot)) * 20;

          return (
            <svg key={fn} width="360" height="100">
              <path
                d={values
                  .map((y, deg) =>
                    y !== null ? `${deg === 0 ? "M" : "L"} ${deg} ${y}` : ""
                  )
                  .join(" ")}
                stroke={strokeColors[fn]}
                strokeWidth="2"
                fill="none"
              />
              {markerY !== null && (
                <circle cx={angle} cy={markerY} r="3" fill={strokeColors[fn]} />
              )}
              <text x="5" y="15" fontSize="12" fill={strokeColors[fn]}>
                {fn}
              </text>
            </svg>
          );
        })}
      </div>

      <hr />
      <h2>🧠 Quick Quiz: Signs of Trig Functions</h2>
      <p>
        At angle <strong>{angle}°</strong>, which of these is positive?
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {["sin", "cos", "tan", "sec", "cosec", "cot"].map((fn) => {
          const isCorrect =
            (quadrant === 1 &&
              ["sin", "cos", "tan", "sec", "cosec", "cot"].includes(fn)) ||
            (quadrant === 2 && ["sin", "cosec"].includes(fn)) ||
            (quadrant === 3 && ["tan", "cot"].includes(fn)) ||
            (quadrant === 4 && ["cos", "sec"].includes(fn));

          return (
            <button
              key={fn}
              onClick={() =>
                alert(
                  isCorrect
                    ? `✅ Yes! ${fn} is positive in Quadrant ${quadrant}.`
                    : `❌ Nope! ${fn} is not positive in Quadrant ${quadrant}.`
                )
              }
              style={{ padding: "8px 12px", fontSize: "14px" }}
            >
              {fn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
