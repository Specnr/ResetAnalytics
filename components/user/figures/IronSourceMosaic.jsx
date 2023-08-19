import React from 'react'
import { ResponsiveContainer } from 'recharts'
import { colourList } from '../../../public/helpers/frontend'
import { roundToPerc } from '../../../public/helpers/frontendConverters'
import { Col, Row } from "react-bootstrap"
import ReactTooltip from 'react-tooltip'

const customToolTip = ({ }) => {

}

const IronSourceMosaic = ({ data }) => {
    return (
        <div style={{ height: "100%", width: "100%", display: "flex" }}>
            <ReactTooltip effect="solid" />
            {
                data.map((val1, idx1) => {
                    return (
                        (
                            val1.value == 0 ? null : (
                                <div style={{ height: "100%", width: `${(val1.value * 100)}%`, display: "inline-block" }}>
                                    {
                                        val1.children.map((val2, idx2) => {
                                            return (
                                                (
                                                    val2.value == 0 ? null : (
                                                        <>
                                                            <ReactTooltip id={`tooltip-${idx1}-${idx2}`}>
                                                                {`${val1.name}: ${roundToPerc(val1.value * 100)}%`}
                                                                <br />
                                                                {`${val2.name}: ${roundToPerc(val2.value * 100)}%`}
                                                            </ReactTooltip>
                                                            <div
                                                                key={idx2}
                                                                style={{
                                                                    height: `${val2.value * 80}%`,
                                                                    width: "100%",
                                                                    backgroundColor: colourList[idx2],
                                                                    border: '1px solid #000'
                                                                }}
                                                                data-tip
                                                                data-for={`tooltip-${idx1}-${idx2}`}
                                                            >
                                                            </div>
                                                        </>
                                                    )
                                                )
                                            )
                                        })
                                    }
                                    <div style={{ height: "20%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <img src={`/imgs/irons/${val1.name.replace("/", "")}.png`} width={30} height={30} />
                                    </div>
                                </div>
                            )
                        )
                    )
                })
            }
        </div>
    )
}

export default IronSourceMosaic