/**
 * Skip Barber Racing Physics Utility
 * Based on Chapter 1: A Plan of Attack
 */

// Gravity constant in ft/s^2
const G_FT_S2 = 32.174;
// Convert mph to ft/s multiplier
const MPH_TO_FTS = 1.46667;

/**
 * Calculates theoretical maximum cornering speed given turn radius and tire grip.
 * Formula: v = sqrt(R * g * mu) in ft/s -> converted to mph
 * @param {number} radiusFeet Corner radius in feet (e.g. 100 ft vs 105 ft)
 * @param {number} tireGripMu Friction coefficient mu (default 1.0 for race slick tires)
 * @returns {number} Max cornering speed in mph (rounded to 1 decimal)
 */
export const calculateMaxCornerSpeed = (radiusFeet, tireGripMu = 1.0) => {
  if (radiusFeet <= 0) return 0;
  const maxVelFtS = Math.sqrt(radiusFeet * G_FT_S2 * tireGripMu);
  const maxVelMph = maxVelFtS / MPH_TO_FTS;
  return Math.round(maxVelMph * 10) / 10;
};

/**
 * Calculates radius required for a given cornering speed and grip.
 * Formula: R = v^2 / (g * mu)
 */
export const calculateRadiusForSpeed = (speedMph, tireGripMu = 1.0) => {
  const velFtS = speedMph * MPH_TO_FTS;
  const radiusFt = (velFtS * velFtS) / (G_FT_S2 * tireGripMu);
  return Math.round(radiusFt * 10) / 10;
};

/**
 * Calculates straightaway time saved by increasing corner exit speed.
 * Skip Barber Chapter 1 scenario:
 * 1/4 mile straight (1320 feet)
 * @param {number} exitSpeedBase Baseline exit speed in mph (e.g. 53 mph)
 * @param {number} exitSpeedImproved Improved exit speed in mph (e.g. 57 mph)
 * @param {number} straightLengthFeet Length of straight in feet (default 1320 ft = 1/4 mile)
 * @param {number} accelerationMph Speed added along straight (e.g. +100 mph)
 * @returns {object} { timeBaseline, timeImproved, timeSavedSeconds, raceSaved20Laps }
 */
export const calculateStraightawayGain = (
  exitSpeedBase = 53,
  exitSpeedImproved = 57,
  straightLengthFeet = 1320,
  accelerationMph = 100
) => {
  const entry1 = exitSpeedBase;
  const top1 = exitSpeedBase + accelerationMph;
  const avg1Mph = (entry1 + top1) / 2;
  const avg1FtS = avg1Mph * MPH_TO_FTS;
  const time1 = straightLengthFeet / avg1FtS;

  const entry2 = exitSpeedImproved;
  const top2 = exitSpeedImproved + accelerationMph;
  const avg2Mph = (entry2 + top2) / 2;
  const avg2FtS = avg2Mph * MPH_TO_FTS;
  const time2 = straightLengthFeet / avg2FtS;

  const timeSaved = Math.max(0, time1 - time2);
  // Assume 4 key straights per lap, 20 lap race
  const raceSaved = timeSaved * 4 * 20;

  return {
    avgSpeedBase: Math.round(avg1Mph * 10) / 10,
    avgSpeedImproved: Math.round(avg2Mph * 10) / 10,
    timeBaseSec: Math.round(time1 * 100) / 100,
    timeImprovedSec: Math.round(time2 * 100) / 100,
    timeSavedSec: Math.round(timeSaved * 100) / 100,
    raceSavedSec: Math.round(raceSaved * 10) / 10
  };
};

/**
 * Calculates overall mastery level based on rubric stars & common mistake checks.
 */
export const calculateMasteryScore = (rubricRatings) => {
  const {
    priority1_line = 0,
    priority2_exitSpeed = 0,
    priority3_brakingEntry = 0,
    mistake1_exitRunoff = false,
    mistake2_lateBraking = false,
    mistake3_badDownshifts = false,
    mistake4_liftingThrottle = false
  } = rubricRatings || {};

  // Star scores (max 15 stars)
  const starTotal = priority1_line + priority2_exitSpeed + priority3_brakingEntry;
  const starPercentage = (starTotal / 15) * 70; // 70% weight

  // Checkbox bonuses for recognizing/avoiding mistakes (4 checks * 7.5% = 30%)
  let mistakePoints = 0;
  if (mistake1_exitRunoff) mistakePoints += 7.5;
  if (mistake2_lateBraking) mistakePoints += 7.5;
  if (mistake3_badDownshifts) mistakePoints += 7.5;
  if (mistake4_liftingThrottle) mistakePoints += 7.5;

  const totalPercentage = Math.min(100, Math.round(starPercentage + mistakePoints));

  let badge = 'Novice Racer';
  let badgeClass = 'badge-red';
  if (totalPercentage >= 90) {
    badge = 'Apex Master';
    badgeClass = 'badge-green';
  } else if (totalPercentage >= 70) {
    badge = 'Skip Barber Scholar';
    badgeClass = 'badge-cyan';
  } else if (totalPercentage >= 40) {
    badge = 'Developing Racer';
    badgeClass = 'badge-amber';
  }

  return {
    score: totalPercentage,
    starTotal,
    badge,
    badgeClass
  };
};
