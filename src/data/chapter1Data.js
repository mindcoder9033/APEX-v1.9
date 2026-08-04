export const CHAPTER_1_DATA = {
  id: 1,
  slug: 'a-plan-of-attack',
  title: 'Chapter 1: A Plan of Attack',
  subtitle: 'Demystifying racetrack chaos through a systematic, 3-tiered methodology',
  quote: {
    text: "To have any chance of doing well at the task of driving a racecar, you have to take it out of the realm of mystery and bring it down to earth.",
    author: "Skip Barber Curriculum"
  },

  threeBasicProblems: [
    {
      id: 1,
      name: "1. Driving on the Best Path",
      tagline: "Finding 'The Line' for Maximum Radius",
      description: "Confronted with a turn, you must find the path through the corner with the biggest possible radius. A larger radius allows higher cornering speed without losing tire traction.",
      icon: "TrendingUp",
      roi: "Highest Potential Reward"
    },
    {
      id: 2,
      name: "2. Carrying Exit Speed",
      tagline: "Unwinding Wheel & Throttle Squeeze",
      description: "Carrying optimum speed off the corner exit onto the straightaway. Exit speed dictates average speed down the entire straight, multiplying lap time gains.",
      icon: "Zap",
      roi: "High Potential Reward"
    },
    {
      id: 3,
      name: "3. Efficiently Slowing the Car",
      tagline: "Threshold Braking & Trail Entry",
      description: "Slowing the car from straightaway speed to corner entry speed in the minimum distance, then transitioning smoothly into the turn.",
      icon: "ShieldAlert",
      roi: "Refinement & Final Tenths"
    }
  ],

  priorityPyramid: [
    {
      level: "Priority 1",
      title: "The Line (Maximum Radius Arc)",
      impact: "Profound impact on cornering speed AND straightaway speed.",
      advice: "Start arc before corner, touch inside edge halfway through (apex), touch outside edge at exit.",
      color: "var(--apex-green)"
    },
    {
      level: "Priority 2",
      title: "Corner Exit Speed & Car Control",
      impact: "Gaining +2 to +4 mph exit speed saves tenths of a second on every straight.",
      advice: "Squeeze throttle while gradually unwinding the steering wheel to expand exit radius.",
      color: "var(--telemetry-cyan)"
    },
    {
      level: "Priority 3",
      title: "Braking & Entry Efficiency",
      impact: "Final tenths of a second. High risk of spinning if done prematurely.",
      advice: "Focus on early throttle application first before attempting late braking.",
      color: "var(--racing-red)"
    }
  ],

  quotesGallery: [
    {
      quote: "I think that experimenting with your braking is very important, but after you get your line and after you get comfortable with the car coming off the corner. The last area is braking where you're going for that last little bit.",
      author: "Danny Sullivan",
      role: "IndyCar Champion & Indy 500 Winner"
    },
    {
      quote: "I think having good reaction times can get you out of trouble in certain situations, but thinking ahead, having enough foresight to know what you and the car are going to do, allows you to avoid getting yourself in situations where you need quick reactions.",
      author: "Bryan Herta",
      role: "IndyCar Driver & Team Owner"
    },
    {
      quote: "I consider myself the world's biggest chicken... Sure, you can win some races on bravado, but bravery, later on, is knowing what you can and can't get away with. I would take one ounce of brains over two pounds of bravado.",
      author: "David Loring",
      role: "SCCA National Champion & Skip Barber Chief Instructor"
    }
  ],

  commonMistakes: [
    {
      id: 1,
      title: "1) Running Off the Road Exiting Corners",
      cause: "Holding the steering wheel at a fixed angle on exit instead of unwinding it while accelerating.",
      solution: "As speed increases on exit, gradually unwind steering pressure to let the car track out to the road edge."
    },
    {
      id: 2,
      title: "2) Going Hopelessly Late Before Braking",
      cause: "Jumping to late braking without a repeatable brake reference marker.",
      solution: "Use recognizable reference pylons/markers. Start with conservative brake points and move inward by small increments."
    },
    {
      id: 3,
      title: "3) Bad Downshifts",
      cause: "Chirping rear tires by releasing the clutch rapidly without blipping the throttle.",
      solution: "Perform a smooth throttle 'blip' while clutch is depressed to match engine revs before clutch release."
    },
    {
      id: 4,
      title: "4) Carelessly Lifting Off the Throttle",
      cause: "Abruptly lifting off gas mid-corner, shifting weight forward and causing sudden rear snap oversteer.",
      solution: "Maintain gentle throttle balance; make subtle control changes rather than abrupt lifts."
    }
  ],

  sebringSteps: [
    {
      step: 1,
      turnName: "Turn 8 to Turn 9 Setup",
      speed: "105 mph",
      gear: "4th Gear",
      throttle: 100,
      brake: 0,
      steering: 0,
      sightline: "Looking 400 ft ahead past the pedestrian bridge towards Turn 9 entry curb.",
      description: "Exiting Turn 8 at full throttle. Car is positioned on the far right edge of the Sebring test circuit."
    },
    {
      step: 2,
      turnName: "Turn 9 (The Carousel Entry)",
      speed: "80 mph",
      gear: "3rd Gear",
      throttle: 35,
      brake: 30,
      steering: -25,
      sightline: "Eyes locked on the apex curb of Turn 9 Carousel.",
      description: "Initial turn-in for Turn 9 long left-hander. Easing off brake, squeezing throttle to 35% to balance Viper weight."
    },
    {
      step: 3,
      turnName: "Carousel Exit Acceleration",
      speed: "110 mph",
      gear: "4th Gear",
      throttle: 100,
      brake: 0,
      steering: 10,
      sightline: "Scanning left side straightaway reflectors leading to Turn 10 Hairpin.",
      description: "Squeezing throttle from 50% to 100% floor as steering unwinds to the right edge. Speed climbs rapidly to 110 mph."
    },
    {
      step: 4,
      turnName: "Hairpin Braking Zone (300 ft Marker)",
      speed: "125 mph",
      gear: "4th Gear",
      throttle: 0,
      brake: 100,
      steering: 0,
      sightline: "Spotting the 1st of 4 brake pylons on track verge.",
      description: "Lifting off throttle, squeezing brake pedal firmly into 100% threshold braking in a straight line. Eyes focused on turn-in reflectors."
    },
    {
      step: 5,
      turnName: "Downshift & Rev Matching",
      speed: "70 mph",
      gear: "2nd Gear",
      throttle: 20, // Blip
      brake: 60,
      steering: 0,
      sightline: "Maintain forward focus on braking target, not speedometer.",
      description: "Downshifting 4th -> 3rd -> 2nd. Right heel/foot blips throttle while toe stays on brake pedal to smooth clutch engagement."
    },
    {
      step: 6,
      turnName: "Turn-In & Trail Braking",
      speed: "45 mph",
      gear: "2nd Gear",
      throttle: 10,
      brake: 25,
      steering: 40,
      sightline: "Looking directly at inside apex curb of Hairpin.",
      description: "Initiating steering turn right. Easing brake pressure from 60% down to 25% (trail braking) to keep front tires loaded."
    },
    {
      step: 7,
      turnName: "Clipping the Hairpin Apex",
      speed: "35 mph",
      gear: "2nd Gear",
      throttle: 40,
      brake: 0,
      steering: 50,
      sightline: "Looking far down exit straight towards start/finish line.",
      description: "Tires touch inside apex edge. Transitioning cleanly from brake to throttle. Squeezing gas smoothly to accelerate."
    },
    {
      step: 8,
      turnName: "Unwinding onto Main Straight",
      speed: "75 mph",
      gear: "3rd Gear",
      throttle: 100,
      brake: 0,
      steering: 10,
      sightline: "Tracked out to left edge, scanning straightaway limit.",
      description: "Gradually unwinding steering angle as Viper accelerates hard onto main straight. Engine revs climbing to 5800 RPM redline."
    }
  ]
};
