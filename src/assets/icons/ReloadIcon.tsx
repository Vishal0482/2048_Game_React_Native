import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"
import { COLORS } from "../../utils/constants"
const ReloadIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke={COLORS.white}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.957 10.792a8 8 0 0 1-11.75 8.986"
        />
        <Path
            stroke={COLORS.white}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m16.93 12.888 2.027-2.096 2.095 2.026m-16.414 1.21a8 8 0 0 1 11.75-8.986"
        />
        <Path
            stroke={COLORS.white}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6.665 11.932-2.027 2.096L2.542 12"
        />
    </Svg>
)

export default memo(ReloadIcon)
