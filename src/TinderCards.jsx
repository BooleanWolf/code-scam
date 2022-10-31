/* eslint-disable no-unused-vars */
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useState } from "react";
import { createUseGesture, dragAction } from "@use-gesture/react";
import useSWR from "swr";

import "./TinderCards.css";

async function fetchCards(path) {
  const url = new URL(path, "https://tinder-backend12112.herokuapp.com");
  const res = await fetch(url);
  return res.json();
}

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 10,
  delay: i * 100,
});
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(2000px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const useGesture = createUseGesture([dragAction]);

export default function TinderCards() {
  const { data: people } = useSWR("/tinder/cards", fetchCards);
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(people?.length ?? 0, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    {
      onDrag: ({
        args: [index],
        down,
        movement: [mx],
        direction: [xDir],
        velocity: [vx],
      }) => {
        const trigger = vx > 0.15;
        const dir = xDir < 0 ? -1 : 1;
        console.log({ down, vx, trigger });
        if (!down && trigger) {
          console.log("gone", index);
          gone.add(index);
        }
        api.start((i) => {
          if (index !== i) return;
          const isGone = gone.has(index);
          const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
          const rot = mx / 100 + (isGone ? dir * 10 * vx : 0);
          const scale = down ? 1.1 : 1;
          return {
            x,
            rot,
            scale,
            delay: undefined,
            config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
          };
        });
        if (!down && gone.size === people.length)
          setTimeout(() => {
            gone.clear();
            api.start((i) => to(i));
          }, 600);
      },
      onDragEnd: ({ direction: [xDir], args: [index] }) => {
        if (xDir > 0) {
          window.open(
            people?.[index]?.contact,
            "_blank",
            "noopener,noreferrer"
          );
        }
      },
    },
    { drag: { axis: "x" } }
  );

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardCointainer">
        {props.map(({ x, y, rot, scale }, i) => {
          const person = people[i];
          return (
            <animated.div className="swipe" key={i} style={{ x, y }}>
              <animated.div
                {...bind(i)}
                className="card"
                style={{
                  transform: interpolate([rot, scale], trans),
                  backgroundImage: `url('${person.imgUrl}')`,
                  touchAction: "pan-y",
                }}
              >
                <a href={person.contact}>
                  {" "}
                  <h3>{person.name}</h3>{" "}
                </a>
                <h2>{person.project}</h2>
                <p className="favlang">Favourite language/Stack:</p>
                <p className="lang">{person.language}</p>
              </animated.div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}
