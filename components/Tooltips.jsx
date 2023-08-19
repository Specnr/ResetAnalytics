import ReactTooltip from "react-tooltip"

export const SplitInfoTooltips = () => (
  <>
    <ReactTooltip id="cumulative">Cumulative/Standard</ReactTooltip>
    <ReactTooltip id="relative">Relative to previous split</ReactTooltip>
  </>
)

export const GeneralExtraStatsTooltips = () => (
  <>
    <ReactTooltip id="RNPH">real nethers per hour; yes wall time; no nether time</ReactTooltip>
    <ReactTooltip id="FNPH">fake nethers per hour; no wall time; no nether time</ReactTooltip>
    <ReactTooltip id="Blinds/Hr">blinds per hour, excluding time spent post-blind</ReactTooltip>
    <ReactTooltip id="Resets">total reset count</ReactTooltip>
    <ReactTooltip id="Playtime">amount of playtime; does not count wall time</ReactTooltip>
    <ReactTooltip id="Time Per Played">average RTA, excluding wall/instant resets</ReactTooltip>
    <ReactTooltip id="Resets Per Enter">resets per nether enter</ReactTooltip>
    <ReactTooltip id="Seeds Played">percent of resets with non-zero RTA</ReactTooltip>
  </>
)