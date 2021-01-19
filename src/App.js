import React, { useEffect } from 'react';
import './App.css';
import useWebAnimations from "@wellyshen/use-web-animations";

function App() {
  const sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  const sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };

  const sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };

  const { ref: b1, getAnimation: ba1 } = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  });

  const { ref: b2, getAnimation: ba2 } = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  const { ref: f1, getAnimation: fa1 } = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  });

  const { ref: f2, getAnimation: fa2 } = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })

  const spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }
  ];


  const { ref: rq, getAnimation: rqa } = useWebAnimations({
    keyframes: spriteFrames,
    timing: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      iterations: Infinity
    },
  });

  /* Alice tires so easily!
    Every so many seconds, reduce their playback rate so they slow a little. 
  */
  useEffect(() => {
    
    document.addEventListener("click", () => goFaster());
    document.addEventListener("touchstart", () => goFaster);

    const ba1Animation = ba1();
    const ba2Animation = ba2();
    const fa1Animation = fa1();
    const fa2Animation = fa2();
    const rqaAnimation = rqa();

    fa1Animation.currentTime = fa1Animation.effect.getTiming().duration / 2;
    ba1Animation.currentTime = ba1Animation.effect.getTiming().duration / 2;
    const sceneries = [fa2Animation, ba2Animation, ba1Animation, fa1Animation];

    const adjustBackgroundPlayback = () => {

      if (rqa().playbackRate < .8)
      {
        sceneries.forEach(function (anim) {anim.updatePlaybackRate(rqa().playbackRate / 2 * -1)});
      }
      
      else if (rqa().playbackRate > 1.2)
      {

        sceneries.forEach(function (anim) {

          anim.updatePlaybackRate(rqa().playbackRate / 2);

        });

      }
      
      else
      {
        sceneries.forEach(function (anim) {
          anim.updatePlaybackRate(0);
        });

      }

    }


    adjustBackgroundPlayback();

    /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    /* But if they fall under 1, the background slides backwards */
    setInterval(function () {

      /* Set decay */
      if (rqa().playbackRate > .4) {
        rqa().updatePlaybackRate(rqa().playbackRate * .9);
      }

      adjustBackgroundPlayback();

    }, 900);
    const goFaster = () => {

      ba1Animation.updatePlaybackRate(ba1Animation.playbackRate * 1.1);
      fa1Animation.updatePlaybackRate(fa1Animation.playbackRate * 1.1);
      ba2Animation.updatePlaybackRate(ba2Animation.playbackRate * 1.1);
      fa2Animation.updatePlaybackRate(fa2Animation.playbackRate * 1.1);
      rqaAnimation.updatePlaybackRate(rqaAnimation.playbackRate * 1.1);

    }

  }, [ba1, ba2, fa1, fa2, rqa])

  return (

    <div>

      <div class="wrapper">

        <div class="sky"></div>

        <div class="earth">

          <div id="red-queen_and_alice">

            <img ref={rq}
              id="red-queen_and_alice_sprite"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
              srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x"
              alt="Alice and the Red Queen running to stay in place." />

          </div>

        </div>

        <div ref={f1} class="scenery" id="foreground1">

          <img id="palm3"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x"
            alt=" " />

        </div>

        <div ref={f2} class="scenery" id="foreground2">

          <img id="bush"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x"
            alt=" " />

          <img id="w_rook_upright"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x"
            alt=" " />

        </div>

        <div ref={b1} class="scenery" id="background1">

          <img id="r_pawn_upright"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x"
            alt=" " />

          <img id="w_rook"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x"
            alt=" " />
          <img id="palm1"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x"
            alt=" " />

        </div>

        <div ref={b2} class="scenery" id="background2">

          <img id="r_pawn"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x"
            alt=" " />

          <img id="r_knight"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x"
            alt=" " />

          <img id="palm2"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x"
            alt=" " />

        </div>

      </div>

    </div>

  );
}

export default App;