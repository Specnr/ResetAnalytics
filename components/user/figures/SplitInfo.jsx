import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../../public/helpers/frontendConverters"
import { SplitInfoTooltips } from "../../Tooltips"


const SplitInfo = ({ splitName, splitData }) => {
    return (
        <>
            <h1>Split Info for {splitName}</h1>
            <SplitInfoTooltips />
            <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th data-tip data-for="xph">XPH</th>
                        <th>Count</th>
                        <th>Average</th>
                        <th>Stdev</th>
                        <th>Rate</th>
                        <th data-tip data-for="sppx">SPPX</th>
                        <th data-tip data-for="rpx">RPX</th>
                    </tr>
                </thead>
                <tbody style={{ fontFamily: "Roboto", fontSize: "1em" }}>
                    <tr data-tip data-for="cumulative">
                        <td>{roundToPerc(splitData.xph)}</td>
                        <td>{roundToPerc(splitData.total)}</td>
                        <td>{splitData.time > 0 ? msToStr(splitData.time) : "-----"}</td>
                        <td>{splitData.cStdev > 0 ? msToStr(splitData.cStdev) : "-----"}</td>
                        <td>{!isNaN(roundToPerc(splitData.cConv * 100)) ? `${roundToPerc(splitData.cConv * 100)}%` : "-----"}</td>
                        <td>{roundToPerc(splitData.sppx)}</td>
                        <td>{splitData.rpx}</td>
                    </tr>
                    {
                        (
                            (splitName === "Iron") ? (
                                <tr data-tip data-for="relative" style={{ color: "#888" }}>
                                    <td></td>
                                    <td></td>
                                    <td>-----</td>
                                    <td>-----</td>
                                    <td>-----</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ) : (
                                <tr data-tip data-for="relative" style={{ color: "#888" }}>
                                    <td></td>
                                    <td></td>
                                    <td>{splitData.tsp > 0 ? msToStr(splitData.tsp) : "-----"}</td>
                                    <td>{splitData.rStdev > 0 ? msToStr(splitData.rStdev) : "-----"}</td>
                                    <td>{!isNaN(roundToPerc(splitData.rConv * 100)) ? `${roundToPerc(splitData.rConv * 100)}%` : "-----"}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}

export default SplitInfo