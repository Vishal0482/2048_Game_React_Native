import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

const SizeBox = (Props: ViewStyle) => {
    return (
        <View style={{
            height: Props.height,
            width: Props.width
        }} {...Props} />
    )
}

export default SizeBox