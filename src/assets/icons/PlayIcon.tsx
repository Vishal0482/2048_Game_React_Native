import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"
import { COLORS } from "../../utils/constants"
const PlayIcon = (props: SvgProps) => (
    <Svg width={24} height={24} {...props}>
        <Path fill={COLORS.white} d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
    </Svg>
)
export default memo(PlayIcon)
