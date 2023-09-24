import gsap from "gsap";


export const createShakeAnimation = (target) => {
  return gsap.to(target, {
    duration: 0.1,
    x: -10,
    repeat: 5,
    yoyo: true,
    clearProps: 'x',
    paused: true
  });
}