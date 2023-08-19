import React from 'react'
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts'
import { colourList } from '../../../public/helpers/frontend'

const NetherTree = ({ netherTreeData }) => {
    const renderContent = ({ root, depth, x, y, width, height, index, payload, rank, name, colors }) => {
        const color = colors[name]
        return (
            <g>
                <rect x={x + depth * 3} y={y + depth * 3} width={Math.max(width - depth * 6, 0)} height={Math.max(height - depth * 6, 0)} fill={color} strokeWidth={0} />
                <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#000000"
                >
                    {((depth === 2 || name === "No Structures") && width > 0 && height > 0 ? name : "")}
                </text>
            </g>
        )
    }

    const colors = {
        "No Structures": colourList[0],
        "Bastion First": colourList[1],
        "Fortress First": colourList[2],
        "1 Str": colourList[3],
        "2 Str": colourList[4],
        "Blind": colourList[5]
    }


    return (
        <ResponsiveContainer>
            <Treemap
                style={{ fontFamily: "Roboto" }}
                data={netherTreeData}
                nameKey="name"
                dataKey="value"
                ratio={4 / 3}
                isAnimationActive={false}
                stroke="#fff"
                fill={'#8889DD'}
                content={props => renderContent({ ...props, colors })}
            >
                <Tooltip />
            </Treemap>
        </ResponsiveContainer>
    )
}

export default NetherTree