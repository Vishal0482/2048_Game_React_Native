import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
import { memo } from "react"
import { COLORS } from "../../utils/constants"
const UndoIcon = (props: SvgProps) => (
    <Svg width={24} height={24} {...props}>
        <G fill="none" fillRule="evenodd">
            <Path
                fill={COLORS.white}
                d="M2.101 10.5C2.833 5.134 7.434 1 13 1c6.075 0 11 4.925 11 11 0 5.957-4.735 10.808-10.647 10.994v-2A9 9 0 1 0 4.124 10.5H6L3 14l-3-3.5h2.101Z"
            />
        </G>
    </Svg>
)

export default memo(UndoIcon)
